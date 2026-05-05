import { NextResponse } from "next/server";
import { getGuestReservationByPhone, reserveGiftForGuest } from "@/db/queries";
import { formatPhone, normalizePhone } from "@/lib/utils";

export async function POST(request: Request) {
  const { presenteId, nome, telefone } = await request.json();

  if (typeof presenteId !== "string" || !presenteId) {
    return NextResponse.json({ error: "Presente invalido." }, { status: 400 });
  }

  if (typeof nome !== "string" || nome.trim().length < 3) {
    return NextResponse.json(
      { error: "Informe seu nome completo para concluir a escolha." },
      { status: 400 },
    );
  }

  if (typeof telefone !== "string" || normalizePhone(telefone).length < 10) {
    return NextResponse.json(
      { error: "Informe um celular valido para reservar o presente." },
      { status: 400 },
    );
  }

  try {
    const presentes = await reserveGiftForGuest({
      presenteId,
      nome: nome.trim(),
      telefone,
    });

    return NextResponse.json({ ok: true, presentes });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "DATABASE_UNAVAILABLE") {
        return NextResponse.json(
          { error: "Banco de dados indisponivel no momento." },
          { status: 503 },
        );
      }

      if (error.message === "GUEST_ALREADY_HAS_GIFT") {
        const reservation = await getGuestReservationByPhone(telefone);
        const nomeRegistrado = reservation?.nome ?? nome.trim();
        const telefoneRegistrado = formatPhone(
          reservation?.telefone ?? normalizePhone(telefone),
        );
        const presenteRegistrado = reservation?.presenteNome
          ? ` para o presente ${reservation.presenteNome}`
          : "";

        return NextResponse.json(
          {
            error: `Este numero ja escolheu um presente${presenteRegistrado}. Dados registrados: ${nomeRegistrado} - ${telefoneRegistrado}.`,
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
      { error: "Nao foi possivel concluir a reserva agora." },
      { status: 500 },
    );
  }
}
