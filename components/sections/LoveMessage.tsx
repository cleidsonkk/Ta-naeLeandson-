export function LoveMessage({ message }: { message: string }) {
  return (
    <section className="page-shell">
      <div className="ornate-panel p-8 md:p-12">
        <p className="eyebrow">Mensagem do Casal</p>
        <div className="max-w-3xl whitespace-pre-line font-display text-3xl italic leading-relaxed text-[var(--color-cream)] md:text-4xl">
          {message}
        </div>
      </div>
    </section>
  );
}
