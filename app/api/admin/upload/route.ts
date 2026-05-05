import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Selecione uma imagem para enviar." },
      { status: 400 },
    );
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Envie apenas arquivos de imagem." },
      { status: 400 },
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "A imagem deve ter no máximo 5MB." },
      { status: 400 },
    );
  }

  try {
    const upload = await uploadImageToCloudinary(file);
    return NextResponse.json(upload, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "CLOUDINARY_NOT_CONFIGURED") {
      return NextResponse.json(
        { error: "Cloudinary não configurado no ambiente." },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "Não foi possível enviar a imagem agora." },
      { status: 500 },
    );
  }
}
