import { CategoriaFilter } from "@/components/presentes/CategoriaFilter";
import { PresenteGrid } from "@/components/presentes/PresenteGrid";
import { getPresentes } from "@/db/queries";
import { GIFT_COLOR_NOTE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function PresentesPage() {
  const presentes = await getPresentes();

  return (
    <div className="page-shell py-16">
      <div className="mb-10 space-y-4">
        <p className="eyebrow">Lista de Presentes</p>
        <h1 className="font-display text-5xl italic">
          Escolha um gesto que fará parte do nosso lar
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-[var(--color-cream-muted)]">
          Cada item permanece visível mesmo após ser escolhido, mantendo a
          transparência da lista e o carinho de quem participou desse momento.
        </p>
        <div className="max-w-3xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.08)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
          {GIFT_COLOR_NOTE}
        </div>
      </div>
      <div className="mb-8">
        <CategoriaFilter active="todos" />
      </div>
      <PresenteGrid initialPresentes={presentes} />
    </div>
  );
}
