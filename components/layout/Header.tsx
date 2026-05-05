import Link from "next/link";

const links = [
  { href: "/", label: "Início" },
  { href: "/presentes", label: "Presentes" },
  { href: "/confirmar", label: "RSVP" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(201,168,76,0.12)] bg-[rgba(13,11,10,0.75)] backdrop-blur">
      <div className="page-shell flex items-center justify-between py-4">
        <Link href="/" className="font-display text-2xl italic tracking-wide">
          Leandson & Taína
        </Link>
        <nav className="flex items-center gap-5 text-sm text-[var(--color-cream-muted)]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--color-cream)]">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
