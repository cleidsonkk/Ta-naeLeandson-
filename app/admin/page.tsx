import { PresenteTable } from "@/components/admin/PresenteTable";
import { formatPhone } from "@/lib/utils";
import {
  getDashboardStats,
  getLatestChosenGifts,
  getPresentes,
} from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [stats, latest, presentes] = await Promise.all([
    getDashboardStats(),
    getLatestChosenGifts(),
    getPresentes(),
  ]);

  const groupedReservations = Object.values(
    presentes
      .filter((item) => item.escolhido && item.escolhidoPor?.telefone)
      .reduce<
        Record<
          string,
          {
            nome: string;
            telefone: string;
            presentes: string[];
            total: number;
            updatedAt: Date | null;
          }
        >
      >((acc, item) => {
        const telefone = item.escolhidoPor?.telefone;

        if (!telefone) {
          return acc;
        }

        const currentUpdatedAt = item.updatedAt ? new Date(item.updatedAt) : null;
        const existing = acc[telefone];

        if (!existing) {
          acc[telefone] = {
            nome: item.escolhidoPor?.nome ?? "Convidado",
            telefone,
            presentes: [item.nome],
            total: 1,
            updatedAt: currentUpdatedAt,
          };
          return acc;
        }

        existing.presentes.push(item.nome);
        existing.total += 1;

        if (
          currentUpdatedAt &&
          (!existing.updatedAt || currentUpdatedAt > existing.updatedAt)
        ) {
          existing.updatedAt = currentUpdatedAt;
        }

        return acc;
      }, {}),
  ).sort((a, b) => {
    const dateA = a.updatedAt?.getTime() ?? 0;
    const dateB = b.updatedAt?.getTime() ?? 0;
    return dateB - dateA;
  });

  return (
    <div className="page-shell py-10 sm:py-16">
      <div className="mb-8 sm:mb-10">
        <p className="eyebrow">Painel Administrativo</p>
        <h1 className="font-display text-4xl italic sm:text-5xl">
          Visão geral da lista
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="ornate-panel p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-cream-muted)]">
            Total
          </p>
          <p className="mt-3 font-display text-4xl italic sm:text-5xl">
            {stats.total}
          </p>
        </div>
        <div className="ornate-panel p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-cream-muted)]">
            Escolhidos
          </p>
          <p className="mt-3 font-display text-4xl italic text-[var(--color-gold-light)] sm:text-5xl">
            {stats.escolhidos}
          </p>
        </div>
        <div className="ornate-panel p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-cream-muted)]">
            Disponíveis
          </p>
          <p className="mt-3 font-display text-4xl italic sm:text-5xl">
            {stats.disponiveis}
          </p>
        </div>
        <div className="ornate-panel p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-cream-muted)]">
            Conclusão
          </p>
          <p className="mt-3 font-display text-4xl italic sm:text-5xl">
            {stats.percentual}%
          </p>
          <div className="mt-4 h-2 bg-[rgba(255,255,255,0.06)]">
            <div
              className="h-full gold-shimmer"
              style={{ width: `${stats.percentual}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <div className="ornate-panel p-5 sm:p-6">
            <p className="eyebrow">Reservas por convidado</p>
            <div className="space-y-4">
              {groupedReservations.length === 0 ? (
                <p className="text-sm text-[var(--color-cream-muted)]">
                  Ainda não há presentes reservados.
                </p>
              ) : (
                groupedReservations.map((guest) => (
                  <div
                    key={guest.telefone}
                    className="border-b border-[rgba(201,168,76,0.08)] pb-4 last:border-b-0"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="font-medium text-[var(--color-cream)]">
                          {guest.nome}
                        </p>
                        <p className="mt-1 break-all text-sm text-[var(--color-cream-muted)] sm:break-normal">
                          {formatPhone(guest.telefone)}
                        </p>
                      </div>
                      <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
                        {guest.total} presente{guest.total > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {guest.presentes.map((gift) => (
                        <span
                          key={`${guest.telefone}-${gift}`}
                          className="max-w-full border border-[rgba(201,168,76,0.18)] px-3 py-1 text-xs leading-5 text-[var(--color-cream-muted)]"
                        >
                          {gift}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="ornate-panel p-5 sm:p-6">
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
                    className="border-b border-[rgba(201,168,76,0.08)] pb-4 last:border-b-0"
                  >
                    <p className="font-medium text-[var(--color-cream)]">
                      {item.escolhidoPor?.nome ?? "Convidado"}
                    </p>
                    <p className="mt-1 break-all text-sm text-[var(--color-cream-muted)] sm:break-normal">
                      {item.escolhidoPor?.telefone
                        ? formatPhone(item.escolhidoPor.telefone)
                        : "sem celular"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-gold-light)]">
                      Presente escolhido: {item.nome}
                    </p>
                  </div>
                ))
              )}
            </div>
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
