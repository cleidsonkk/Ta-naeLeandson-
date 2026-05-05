import { PresenteTable } from "@/components/admin/PresenteTable";
import { formatPhone } from "@/lib/utils";
import {
  getDashboardStats,
  getLatestChosenGifts,
  getPresentes,
} from "@/db/queries";

export default async function AdminPage() {
  const [stats, latest, presentes] = await Promise.all([
    getDashboardStats(),
    getLatestChosenGifts(),
    getPresentes(),
  ]);

  return (
    <div className="page-shell py-16">
      <div className="mb-10">
        <p className="eyebrow">Painel Administrativo</p>
        <h1 className="font-display text-5xl italic">Visão geral da lista</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        <div className="ornate-panel p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-cream-muted)]">
            Total
          </p>
          <p className="mt-3 font-display text-5xl italic">{stats.total}</p>
        </div>
        <div className="ornate-panel p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-cream-muted)]">
            Escolhidos
          </p>
          <p className="mt-3 font-display text-5xl italic text-[var(--color-gold-light)]">
            {stats.escolhidos}
          </p>
        </div>
        <div className="ornate-panel p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-cream-muted)]">
            Disponíveis
          </p>
          <p className="mt-3 font-display text-5xl italic">
            {stats.disponiveis}
          </p>
        </div>
        <div className="ornate-panel p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-cream-muted)]">
            Conclusão
          </p>
          <p className="mt-3 font-display text-5xl italic">{stats.percentual}%</p>
          <div className="mt-4 h-2 bg-[rgba(255,255,255,0.06)]">
            <div
              className="h-full gold-shimmer"
              style={{ width: `${stats.percentual}%` }}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="ornate-panel p-6">
          <p className="eyebrow">Últimas reservas</p>
          <div className="space-y-4">
            {latest.length === 0 ? (
              <p className="text-sm text-[var(--color-cream-muted)]">
                Ainda não há presentes reservados.
              </p>
            ) : (
              latest.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-[rgba(201,168,76,0.08)] pb-4"
                >
                  <p className="font-medium text-[var(--color-cream)]">
                    {item.escolhidoPor?.nome ?? "Convidado"}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-cream-muted)]">
                    {item.escolhidoPor?.telefone
                      ? formatPhone(item.escolhidoPor.telefone)
                      : "sem celular"}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-gold-light)]">
                    Presente escolhido: {item.nome}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="space-y-4">
          <p className="eyebrow">Gerenciamento de presentes</p>
          <PresenteTable presentes={presentes} />
        </div>
      </div>
    </div>
  );
}
