"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Presente } from "@/types";

export function usePresentes(initialPresentes: Presente[]) {
  const [presentes, setPresentes] = useState(initialPresentes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(async () => {
      const response = await fetch("/api/presentes", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as { presentes: Presente[] };
      setPresentes(data.presentes);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  async function escolherPresente(payload: {
    presenteId: string;
    nome: string;
    telefone: string;
  }) {
    setLoading(true);
    const response = await fetch("/api/presentes/escolher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    setLoading(false);

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error ?? "Não foi possível concluir a escolha.");
      return false;
    }

    toast.success("Presente reservado com carinho. Obrigado!");
    setPresentes(data.presentes);
    return true;
  }

  return { presentes, setPresentes, loading, escolherPresente };
}
