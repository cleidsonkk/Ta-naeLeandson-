import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { createGift, getPresentes } from "@/db/queries";

export async function GET() {
  const presentes = await getPresentes();
  return NextResponse.json({ presentes });
}

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  const body = await request.json();

  if (typeof body.nome !== "string" || body.nome.trim().length < 2) {
    return NextResponse.json(
      { error: "Informe um nome válido para o presente." },
      { status: 400 },
    );
  }

  if (typeof body.categoria !== "string" || !body.categoria) {
    return NextResponse.json(
      { error: "Selecione uma categoria válida." },
      { status: 400 },
    );
  }

  if (typeof body.imagemUrl !== "string" || !body.imagemUrl) {
    return NextResponse.json(
      { error: "Envie uma imagem ou informe uma URL válida." },
      { status: 400 },
    );
  }

  try {
    const presente = await createGift({
      nome: body.nome.trim(),
      descricao:
        typeof body.descricao === "string" ? body.descricao.trim() : undefined,
      categoria: body.categoria,
      imagemUrl: body.imagemUrl,
    });

    return NextResponse.json({ ok: true, presente }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível criar este presente." },
      { status: 500 },
    );
  }
}
