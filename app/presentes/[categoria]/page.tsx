import { CategoriaFilter } from "@/components/presentes/CategoriaFilter";
import { PresenteGrid } from "@/components/presentes/PresenteGrid";
import { getPresentes } from "@/db/queries";
import { filterPresentesByCategory } from "@/lib/utils";

export default async function PresentesCategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const presentes = filterPresentesByCategory(await getPresentes(), categoria);

  return (
    <div className="page-shell py-16">
      <div className="mb-8">
        <CategoriaFilter active={categoria} />
      </div>
      <PresenteGrid initialPresentes={presentes} />
    </div>
  );
}
