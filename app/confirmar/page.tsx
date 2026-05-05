import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ConfirmarPage() {
  return (
    <div className="page-shell py-16">
      <div className="mx-auto max-w-2xl ornate-panel p-8 md:p-10">
        <p className="eyebrow">RSVP</p>
        <h1 className="font-display text-5xl italic">Confirme sua presença</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--color-cream-muted)]">
          Esta etapa está pronta para evoluir com persistência em banco, mas já
          deixa o espaço ideal para um RSVP elegante no mesmo clima do restante do site.
        </p>
        <form className="mt-8 space-y-4">
          <Input placeholder="Nome completo" />
          <Input placeholder="E-mail" type="email" />
          <Input placeholder="Quantidade de acompanhantes" type="number" min={0} />
          <Button className="w-full">Enviar confirmação</Button>
        </form>
      </div>
    </div>
  );
}
