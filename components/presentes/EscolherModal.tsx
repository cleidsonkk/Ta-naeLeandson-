"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { formatPhone } from "@/lib/utils";
import { Presente } from "@/types";

export function EscolherModal({
  open,
  presente,
  loading,
  onClose,
  onConfirm,
}: {
  open: boolean;
  presente: Presente | null;
  loading: boolean;
  onClose: () => void;
  onConfirm: (payload: { nome: string; telefone: string }) => Promise<void>;
}) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  return (
    <Modal
      open={open}
      onClose={() => {
        setNome("");
        setTelefone("");
        onClose();
      }}
      title="Confirmar presente"
    >
      <div className="space-y-5">
        <p className="text-sm leading-7 text-[var(--color-cream-muted)]">
          Você está escolhendo <strong>{presente?.nome}</strong>. Informe seu
          nome completo e celular para registrarmos esse carinho na nossa lista.
        </p>
        <Input
          placeholder="Seu nome completo"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <Input
          placeholder="Seu celular com DDD"
          value={telefone}
          onChange={(event) => setTelefone(formatPhone(event.target.value))}
        />
        <Button
          className="w-full"
          disabled={loading || nome.trim().length < 3 || telefone.trim().length < 14}
          onClick={async () => {
            await onConfirm({ nome, telefone });
            setNome("");
            setTelefone("");
          }}
        >
          Confirmar este presente
        </Button>
      </div>
    </Modal>
  );
}
