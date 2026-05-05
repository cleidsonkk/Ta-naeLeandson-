"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        toast.error(data.error ?? "Credenciais invalidas.");
        return;
      }

      window.location.assign("/admin");
    } catch {
      toast.error("Nao foi possivel entrar agora. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell py-16">
      <div className="mx-auto max-w-lg ornate-panel p-8 md:p-10">
        <p className="eyebrow">Acesso Restrito</p>
        <h1 className="font-display text-5xl italic">Entrar no painel</h1>
        <form
          className="mt-8 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            await handleLogin();
          }}
        >
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="E-mail admin"
          />
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Senha"
            type="password"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
