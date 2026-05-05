"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CategoriaSlug, Presente } from "@/types";
import { CATEGORY_LABELS, GIFT_COLOR_NOTE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { ImageUpload } from "@/components/admin/ImageUpload";

export function PresenteForm({
  open,
  onClose,
  initialValue,
}: {
  open: boolean;
  onClose: () => void;
  initialValue?: Presente | null;
}) {
  const router = useRouter();
  const [nome, setNome] = useState(initialValue?.nome ?? "");
  const [descricao, setDescricao] = useState(initialValue?.descricao ?? "");
  const [categoria, setCategoria] = useState<CategoriaSlug>(
    initialValue?.categoria ?? "cozinha",
  );
  const [imagemUrl, setImagemUrl] = useState(
    initialValue?.imagemUrl ?? "/gift-placeholder.svg",
  );
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (nome.trim().length < 2) {
      toast.error("Informe um nome valido para o presente.");
      return;
    }

    if (!imagemUrl.trim()) {
      toast.error("Envie uma imagem ou informe uma URL valida.");
      return;
    }

    setSaving(true);

    const isEditing = Boolean(initialValue?.id);
    const response = await fetch(
      isEditing ? `/api/presentes/${initialValue?.id}` : "/api/presentes",
      {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome.trim(),
          descricao: descricao.trim(),
          categoria,
          imagemUrl,
        }),
      },
    );

    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      toast.error(data.error ?? "Nao foi possivel salvar este presente.");
      return;
    }

    toast.success(
      isEditing
        ? "Presente atualizado com sucesso."
        : "Novo presente criado com sucesso.",
    );
    router.refresh();
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialValue ? "Editar presente" : "Novo presente"}
    >
      <div className="space-y-4 pb-1">
        <Input
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          placeholder="Nome do presente"
        />
        <Input
          value={descricao ?? ""}
          onChange={(event) => setDescricao(event.target.value)}
          placeholder="Descricao breve"
        />
        <select
          value={categoria}
          onChange={(event) => setCategoria(event.target.value as CategoriaSlug)}
          className="w-full border border-[rgba(201,168,76,0.22)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm outline-none"
        >
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <ImageUpload value={imagemUrl} onChange={setImagemUrl} />
        <div className="border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.08)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
          {GIFT_COLOR_NOTE}
        </div>
        <div className="sticky bottom-0 bg-[var(--color-surface)] pb-1 pt-2">
          <Button className="w-full" onClick={handleSave} disabled={saving}>
            {saving
              ? initialValue
                ? "Salvando alteracoes..."
                : "Criando presente..."
              : initialValue
                ? "Salvar alteracoes"
                : "Criar presente"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
