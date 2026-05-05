"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { status } = useSession();

  return (
    <Modal open={open} onClose={onClose} title="Entrar com Google">
      <p className="mb-6 text-sm leading-7 text-[var(--color-cream-muted)]">
        Para reservar um presente, entre com sua conta Google. Assim garantimos
        uma escolha por convidado e mantemos a lista sempre sincronizada.
      </p>
      <Button
        onClick={() => signIn("google")}
        className="w-full"
        disabled={status === "loading"}
      >
        Continuar com Google
      </Button>
    </Modal>
  );
}
