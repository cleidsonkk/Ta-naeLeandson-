import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getGuestReservationByPhone, reserveGiftForGuest } from "@/db/queries";
import { MAX_GIFTS_PER_GUEST } from "@/lib/constants";
import { formatPhone, normalizePhone } from "@/lib/utils";

export async function POST(request: Request) {
  const { presenteId, nome, telefone } = await request.json();

  if (typeof presenteId !== "string" || !presenteId) {
    return NextResponse.json({ error: "Presente inv\u00e1lido." }, { status: 400 });
  }

  if (typeof nome !== "string" || nome.trim().length < 3) {
    return NextResponse.json(
      { error: "Informe seu nome completo para concluir a escolha." },
      { status: 400 },
    );
  }

  if (typeof telefone !== "string" || normalizePhone(telefone).length < 10) {
    return NextResponse.json(
      { error: "Informe um celular v\u00e1lido para reservar o presente." },
      { status: 400 },
    );
  }

  try {
    const presentes = await reserveGiftForGuest({
      presenteId,
      nome: nome.trim(),
      telefone,
    });

    revalidatePath("/presentes");
    revalidatePath("/admin");

    return NextResponse.json({ ok: true, presentes });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "DATABASE_UNAVAILABLE") {
        return NextResponse.json(
          { error: "Banco de dados indispon\u00edvel no momento." },
          { status: 503 },
        );
      }

      if (error.message === "GUEST_GIFT_LIMIT_REACHED") {
        const reservation = await getGuestReservationByPhone(telefone);
        const nomeRegistrado = reservation?.nome ?? nome.trim();
        const telefoneRegistrado = formatPhone(
          reservation?.telefone ?? normalizePhone(telefone),
        );
        const totalPresentes =
          reservation?.totalPresentes ?? MAX_GIFTS_PER_GUEST;
        const presentesRegistrados =
          reservation?.presenteNomes?.length
            ? ` Presentes j\u00e1 registrados: ${reservation.presenteNomes.join(", ")}.`
            : "";

        return NextResponse.json(
          {
            error: `Este n\u00famero j\u00e1 atingiu o limite de ${totalPresentes} presentes. Dados registrados: ${nomeRegistrado} - ${telefoneRegistrado}.${presentesRegistrados}`,
          },
          { status: 409 },
        );
      }

      if (error.message === "GIFT_UNAVAILABLE") {
        return NextResponse.json(
          { error: "Este presente acabou de ser escolhido por outra pessoa." },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { error: "N\u00e3o foi poss\u00edvel concluir a reserva agora." },
      { status: 500 },
    );
  }
}
