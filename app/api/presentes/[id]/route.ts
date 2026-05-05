import { NextResponse } from "next/server";
import { updateGiftById } from "@/db/queries";
import { getAdminSession } from "@/lib/admin-auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  const body = await request.json();
  const { id } = await params;

  try {
    const presente = await updateGiftById({
      id,
      nome: typeof body.nome === "string" ? body.nome.trim() : undefined,
      descricao:
        typeof body.descricao === "string" ? body.descricao.trim() : body.descricao ?? undefined,
      categoria: typeof body.categoria === "string" ? body.categoria : undefined,
      imagemUrl: typeof body.imagemUrl === "string" ? body.imagemUrl : undefined,
    });

    return NextResponse.json({ ok: true, presente });
  } catch (error) {
    if (error instanceof Error && error.message === "GIFT_NOT_FOUND") {
      return NextResponse.json({ error: "Presente não encontrado." }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Não foi possível atualizar este presente." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return NextResponse.json({ message: "Presente removido.", id });
}
