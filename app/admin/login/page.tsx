"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="page-shell py-16">
      <div className="mx-auto max-w-lg ornate-panel p-8 md:p-10">
        <p className="eyebrow">Acesso Restrito</p>
        <h1 className="font-display text-5xl italic">Entrar no painel</h1>
        <div className="mt-8 space-y-4">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail admin" />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
          />
          <Button
            className="w-full"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
              });
              setLoading(false);

              if (!response.ok) {
                toast.error("Credenciais inválidas.");
                return;
              }

              router.push("/admin");
              router.refresh();
            }}
          >
            Entrar
          </Button>
        </div>
      </div>
    </div>
  );
}
