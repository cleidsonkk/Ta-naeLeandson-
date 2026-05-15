"use client";

import { useState } from "react";
import { Download, LockOpen, Pencil, Plus, Trash2 } from "lucide-react";
import { PresenteForm } from "@/components/admin/PresenteForm";
import { Button } from "@/components/ui/Button";
import { formatPhone, getCategoryLabel } from "@/lib/utils";
import { Presente } from "@/types";

const PAGE_SIZE = 16;

export function PresenteTable({ presentes }: { presentes: Presente[] }) {
  const [editing, setEditing] = useState<Presente | null>(null);
  const [creating, setCreating] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visiblePresentes = presentes.slice(0, visibleCount);
  const hasMore = presentes.length > visibleCount;

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-[var(--color-cream-muted)]">
          {presentes.length} presentes cadastrados. O casal pode editar todos e
          adicionar novos quando quiser.
        </p>
        <Button className="w-full sm:w-auto" onClick={() => setCreating(true)}>
          <Plus size={16} className="mr-2" />
          Novo presente
        </Button>
      </div>

      <div className="overflow-hidden border border-[rgba(201,168,76,0.14)]">
        <div className="hidden grid-cols-[1.1fr_0.9fr_0.9fr_0.8fr_1.1fr] gap-4 border-b border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.03)] px-5 py-4 text-xs uppercase tracking-[0.24em] text-[var(--color-cream-muted)] lg:grid">
          <span>Presente</span>
          <span>Convidado</span>
          <span>Celular</span>
          <span>Categoria</span>
          <span>Ações</span>
        </div>

        <div>
          {visiblePresentes.map((presente) => (
            <div
              key={presente.id}
              className="border-b border-[rgba(201,168,76,0.08)] px-4 py-4 last:border-b-0 sm:px-5 lg:grid lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.8fr_1.1fr] lg:gap-4 lg:text-sm"
            >
              <div className="lg:hidden">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-[var(--color-cream)]">
                      {presente.nome}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-cream-muted)]">
                      {presente.escolhido ? "Escolhido" : "Disponível"}
                    </p>
                  </div>
                  <span className="border border-[rgba(201,168,76,0.18)] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
                    {getCategoryLabel(presente.categoria)}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-[var(--color-cream-muted)] sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
                      Convidado
                    </p>
                    <p className="mt-1">
                      {presente.escolhidoPor?.nome ?? "Aguardando escolha"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
                      Celular
                    </p>
                    <p className="mt-1">
                      {presente.escolhidoPor?.telefone
                        ? formatPhone(presente.escolhidoPor.telefone)
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    className="min-w-0 flex-1 px-3 py-2"
                    onClick={() => setEditing(presente)}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button variant="secondary" className="min-w-0 flex-1 px-3 py-2">
                    <LockOpen size={14} />
                  </Button>
                  <Button variant="danger" className="min-w-0 flex-1 px-3 py-2">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block">
                <p className="font-medium text-[var(--color-cream)]">
                  {presente.nome}
                </p>
                <p className="mt-1 text-xs text-[var(--color-cream-muted)]">
                  {presente.escolhido ? "Escolhido" : "Disponível"}
                </p>
              </div>
              <div className="hidden text-[var(--color-cream-muted)] lg:block">
                {presente.escolhidoPor?.nome ?? "Aguardando escolha"}
              </div>
              <div className="hidden text-[var(--color-cream-muted)] lg:block">
                {presente.escolhidoPor?.telefone
                  ? formatPhone(presente.escolhidoPor.telefone)
                  : "—"}
              </div>
              <div className="hidden text-[var(--color-cream-muted)] lg:block">
                {getCategoryLabel(presente.categoria)}
              </div>
              <div className="hidden gap-2 lg:flex">
                <Button
                  variant="secondary"
                  className="px-3 py-2"
                  onClick={() => setEditing(presente)}
                >
                  <Pencil size={14} />
                </Button>
                <Button variant="secondary" className="px-3 py-2">
                  <LockOpen size={14} />
                </Button>
                <Button variant="danger" className="px-3 py-2">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {hasMore ? (
          <Button
            className="w-full sm:w-auto"
            variant="secondary"
            onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
          >
            Ver mais presentes
          </Button>
        ) : (
          <div className="hidden sm:block" />
        )}

        <Button
          className="w-full sm:w-auto"
          variant="secondary"
          onClick={() => {
            window.location.href = "/api/admin/export";
          }}
        >
          <Download size={16} className="mr-2" />
          Exportar CSV
        </Button>
      </div>

      <PresenteForm
        key={editing?.id ?? "edit-empty"}
        open={Boolean(editing)}
        initialValue={editing}
        onClose={() => setEditing(null)}
      />

      <PresenteForm
        key={creating ? "creating-open" : "creating-closed"}
        open={creating}
        initialValue={null}
        onClose={() => setCreating(false)}
      />
    </>
  );
}
