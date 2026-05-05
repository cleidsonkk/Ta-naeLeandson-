import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(201,168,76,0.1)] py-8">
      <div className="page-shell flex flex-col items-center justify-between gap-3 text-sm text-[var(--color-cream-muted)] md:flex-row">
        <p>Leandson & Taína — 2025</p>
        <p className="flex items-center gap-2">
          Feito com amor <Heart size={14} className="text-[var(--color-gold)]" />
        </p>
      </div>
    </footer>
  );
}
