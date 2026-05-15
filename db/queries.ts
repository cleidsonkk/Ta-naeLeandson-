import { desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { convidados, presentes } from "@/db/schema";
import { GIFTS_SEED, MAX_GIFTS_PER_GUEST } from "@/lib/constants";
import { normalizePhone } from "@/lib/utils";
import { DashboardStats, Presente } from "@/types";

export async function getPresentes(): Promise<Presente[]> {
  const db = getDb();

  if (!db) {
    return GIFTS_SEED;
  }

  const rows = await db.select().from(presentes).orderBy(presentes.ordem);
  return rows as Presente[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const items = await getPresentes();
  const escolhidos = items.filter((item) => item.escolhido).length;
  const total = items.length;

  return {
    total,
    escolhidos,
    disponiveis: total - escolhidos,
    percentual: total ? Math.round((escolhidos / total) * 100) : 0,
  };
}

export async function getLatestChosenGifts() {
  const db = getDb();

  if (!db) {
    return GIFTS_SEED.filter((item) => item.escolhido).slice(0, 5);
  }

  return db
    .select()
    .from(presentes)
    .where(eq(presentes.escolhido, true))
    .orderBy(desc(presentes.updatedAt))
    .limit(8);
}

export async function getConvidadoByPhone(telefone: string) {
  const db = getDb();

  if (!db) return null;

  const telefoneNormalizado = normalizePhone(telefone);

  const [convidado] = await db
    .select()
    .from(convidados)
    .where(eq(convidados.telefone, telefoneNormalizado))
    .limit(1);
  return convidado ?? null;
}

export async function getGuestReservationByPhone(telefone: string) {
  const db = getDb();

  if (!db) return null;

  const telefoneNormalizado = normalizePhone(telefone);

  const rows = await db.execute(sql`
    select
      max(coalesce(p.escolhido_por->>'nome', c.nome_convidado)) as nome_convidado,
      max(coalesce(p.escolhido_por->>'telefone', c.telefone)) as telefone,
      count(*)::int as total_presentes,
      array_remove(array_agg(p.nome order by p.updated_at desc), null) as presente_nomes
    from presentes p
    left join convidados c
      on c.telefone = ${telefoneNormalizado}
    where p.escolhido = true
      and p.escolhido_por->>'telefone' = ${telefoneNormalizado}
  `);

  const reservation = rows.rows[0] as
    | {
        nome_convidado: string | null;
        telefone: string | null;
        total_presentes: number;
        presente_nomes: string[] | null;
      }
    | undefined;

  if (!reservation || reservation.total_presentes < 1) {
    return null;
  }

  return {
    nome: reservation.nome_convidado,
    telefone: reservation.telefone,
    totalPresentes: reservation.total_presentes,
    presenteNomes: reservation.presente_nomes ?? [],
  };
}

type ReserveGiftInput = {
  presenteId: string;
  nome: string;
  telefone: string;
};

export async function reserveGiftForGuest({
  presenteId,
  nome,
  telefone,
}: ReserveGiftInput) {
  const db = getDb();

  if (!db) {
    throw new Error("DATABASE_UNAVAILABLE");
  }

  const telefoneNormalizado = normalizePhone(telefone);
  const escolhidoEm = new Date().toISOString();

  const reservationResult = await db.execute(sql`
    with guest_lock as (
      select pg_advisory_xact_lock(hashtext(${telefoneNormalizado}))
    ),
    upsert_guest as (
      insert into convidados (telefone, nome_convidado)
      select ${telefoneNormalizado}, ${nome}
      from guest_lock
      on conflict (telefone) do nothing
      returning telefone, presente_id
    ),
    guest_row as (
      select telefone, presente_id
      from convidados
      where telefone = ${telefoneNormalizado}
    ),
    existing_phone_reservations as (
      select count(*)::int as total
      from presentes
      where escolhido = true
        and escolhido_por->>'telefone' = ${telefoneNormalizado}
    ),
    updated_gift as (
      update presentes
      set
        escolhido = true,
        escolhido_por = ${JSON.stringify({
          nome,
          telefone: telefoneNormalizado,
          escolhidoEm,
        })}::jsonb,
        updated_at = now()
      where
        id = ${presenteId}
        and escolhido = false
        and (
          select total
          from existing_phone_reservations
        ) < ${MAX_GIFTS_PER_GUEST}
      returning id
    )
    select
      (
        select total
        from existing_phone_reservations
      ) as guest_reserved_count,
      exists(select 1 from updated_gift) as gift_reserved
  `);

  const reservation = reservationResult.rows[0] as
    | {
        guest_reserved_count: number;
        gift_reserved: boolean;
      }
    | undefined;

  if (!reservation) {
    throw new Error("RESERVATION_FAILED");
  }

  if (reservation.guest_reserved_count >= MAX_GIFTS_PER_GUEST) {
    throw new Error("GUEST_GIFT_LIMIT_REACHED");
  }

  if (!reservation.gift_reserved) {
    throw new Error("GIFT_UNAVAILABLE");
  }

  await db
    .update(convidados)
    .set({
      nomeConvidado: nome,
      telefone: telefoneNormalizado,
      presenteId,
    })
    .where(eq(convidados.telefone, telefoneNormalizado));

  return getPresentes();
}

type UpdateGiftInput = {
  id: string;
  nome?: string;
  descricao?: string | null;
  categoria?: string;
  imagemUrl?: string;
};

export async function updateGiftById({
  id,
  nome,
  descricao,
  categoria,
  imagemUrl,
}: UpdateGiftInput) {
  const db = getDb();

  if (!db) {
    throw new Error("DATABASE_UNAVAILABLE");
  }

  const [updated] = await db
    .update(presentes)
    .set({
      ...(nome !== undefined ? { nome } : {}),
      ...(descricao !== undefined ? { descricao } : {}),
      ...(categoria !== undefined ? { categoria } : {}),
      ...(imagemUrl !== undefined ? { imagemUrl } : {}),
      updatedAt: new Date(),
    })
    .where(eq(presentes.id, id))
    .returning();

  if (!updated) {
    throw new Error("GIFT_NOT_FOUND");
  }

  return updated as Presente;
}

type CreateGiftInput = {
  nome: string;
  descricao?: string | null;
  categoria: string;
  imagemUrl: string;
};

export async function createGift({
  nome,
  descricao,
  categoria,
  imagemUrl,
}: CreateGiftInput) {
  const db = getDb();

  if (!db) {
    throw new Error("DATABASE_UNAVAILABLE");
  }

  const [maxOrderRow] = await db
    .select({ maxOrder: sql<number>`coalesce(max(${presentes.ordem}), 0)` })
    .from(presentes);

  const [created] = await db
    .insert(presentes)
    .values({
      nome,
      descricao: descricao ?? null,
      categoria,
      imagemUrl,
      ordem: (maxOrderRow?.maxOrder ?? 0) + 1,
      escolhido: false,
      escolhidoPor: null,
      updatedAt: new Date(),
    })
    .returning();

  return created as Presente;
}
