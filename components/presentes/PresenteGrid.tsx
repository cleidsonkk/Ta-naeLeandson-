"use client";

import { useState } from "react";
import { EscolherModal } from "@/components/presentes/EscolherModal";
import { PresenteCard } from "@/components/presentes/PresenteCard";
import { usePresentes } from "@/hooks/usePresentes";
import { Presente } from "@/types";

export function PresenteGrid({
  initialPresentes,
}: {
  initialPresentes: Presente[];
}) {
  const { presentes, loading, escolherPresente } = usePresentes(initialPresentes);
  const [selectedGift, setSelectedGift] = useState<Presente | null>(null);

  function handleChoose(presente: Presente) {
    setSelectedGift(presente);
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {presentes.map((presente, index) => (
          <PresenteCard
            key={presente.id}
            presente={presente}
            index={index}
            onChoose={handleChoose}
          />
        ))}
      </div>
      <EscolherModal
        open={Boolean(selectedGift)}
        presente={selectedGift}
        loading={loading}
        onClose={() => setSelectedGift(null)}
        onConfirm={async ({ nome, telefone }) => {
          if (!selectedGift) return;

          const ok = await escolherPresente({
            presenteId: selectedGift.id,
            nome,
            telefone,
          });

          if (ok) {
            setSelectedGift(null);
          }
        }}
      />
    </>
  );
}
