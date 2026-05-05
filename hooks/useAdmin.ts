"use client";

import { useTransition } from "react";
import { toast } from "sonner";

export function useAdmin() {
  const [pending, startTransition] = useTransition();

  function runAdminAction<T>(
    action: () => Promise<T>,
    message = "Ação concluída com sucesso.",
  ) {
    startTransition(async () => {
      try {
        await action();
        toast.success(message);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Não foi possível concluir a ação.",
        );
      }
    });
  }

  return { pending, runAdminAction };
}
