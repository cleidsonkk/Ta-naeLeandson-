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
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[var(--color-cream-muted)]">
          {presentes.length} presentes cadastrados. O casal pode editar todos e
          adicionar novos quando quiser.
        </p>
        <Button onClick={() => setCreating(true)}>
          <Plus size={16} className="mr-2" />
          Novo presente
        </Button>
      </div>

      <div className="overflow-hidden border border-[rgba(201,168,76,0.14)]">
        <div className="grid grid-cols-[1.1fr_0.9fr_0.9fr_0.8fr_1.1fr] gap-4 border-b border-[rgba(201,168,76,0.1)] bg-[rgba(255,255,255,0.03)] px-5 py-4 text-xs uppercase tracking-[0.24em] text-[var(--color-cream-muted)]">
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
              className="grid grid-cols-[1.1fr_0.9fr_0.9fr_0.8fr_1.1fr] gap-4 border-b border-[rgba(201,168,76,0.08)] px-5 py-4 text-sm"
            >
              <div>
                <p className="font-medium text-[var(--color-cream)]">
                  {presente.nome}
                </p>
                <p className="mt-1 text-xs text-[var(--color-cream-muted)]">
                  {presente.escolhido ? "Escolhido" : "Disponível"}
                </p>
              </div>
              <div className="text-[var(--color-cream-muted)]">
                {presente.escolhidoPor?.nome ?? "Aguardando escolha"}
              </div>
              <div className="text-[var(--color-cream-muted)]">
                {presente.escolhidoPor?.telefone
                  ? formatPhone(presente.escolhidoPor.telefone)
                  : "—"}
              </div>
              <div className="text-[var(--color-cream-muted)]">
                {getCategoryLabel(presente.categoria)}
              </div>
              <div className="flex gap-2">
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

      <div className="mt-4 flex items-center justify-between gap-4">
        {hasMore ? (
          <Button
            variant="secondary"
            onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
          >
            Ver mais presentes
          </Button>
        ) : (
          <div />
        )}

        <Button
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
