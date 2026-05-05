"use client";

import Link from "next/link";
import { CATEGORY_TABS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CategoriaFilter({ active }: { active: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      {CATEGORY_TABS.map((tab) => {
        const href =
          tab.slug === "todos" ? "/presentes" : `/presentes/${tab.slug}`;

        return (
          <Link
            key={tab.slug}
            href={href}
            className={cn(
              "border px-4 py-3 text-xs uppercase tracking-[0.24em] transition",
              active === tab.slug
                ? "border-[rgba(232,201,122,0.55)] bg-[rgba(201,168,76,0.14)] text-[var(--color-cream)]"
                : "border-[rgba(201,168,76,0.18)] text-[var(--color-cream-muted)] hover:border-[rgba(201,168,76,0.35)] hover:text-[var(--color-cream)]",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
