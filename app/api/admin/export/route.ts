import { getPresentes } from "@/db/queries";
import { formatPhone } from "@/lib/utils";

export async function GET() {
  const rows = (await getPresentes())
    .filter((item) => item.escolhido)
    .map((item) => ({
      presente: item.nome,
      categoria: item.categoria,
      nome: item.escolhidoPor?.nome ?? "",
      telefone: item.escolhidoPor?.telefone ? formatPhone(item.escolhidoPor.telefone) : "",
      data: item.escolhidoPor?.escolhidoEm ?? "",
    }));

  const csv = [
    "presente,categoria,nome,telefone,data",
    ...rows.map((row) =>
      [row.presente, row.categoria, row.nome, row.telefone, row.data]
        .map((value) => `"${String(value).replaceAll('"', '""')}"`)
        .join(","),
    ),
  ].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="presentes-escolhidos.csv"',
    },
  });
}
