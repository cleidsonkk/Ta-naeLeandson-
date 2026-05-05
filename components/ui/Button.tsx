"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center border px-5 py-3 text-sm uppercase tracking-[0.24em] transition duration-300",
        variant === "primary" &&
          "gold-shimmer border-[rgba(201,168,76,0.5)] bg-[rgba(201,168,76,0.12)] text-[var(--color-cream)] hover:-translate-y-0.5",
        variant === "secondary" &&
          "border-[rgba(201,168,76,0.28)] bg-[rgba(255,255,255,0.03)] text-[var(--color-cream)] hover:bg-[rgba(255,255,255,0.06)]",
        variant === "ghost" &&
          "border-transparent bg-transparent text-[var(--color-cream-muted)] hover:text-[var(--color-cream)]",
        variant === "danger" &&
          "border-[rgba(139,26,26,0.6)] bg-[rgba(139,26,26,0.14)] text-[#ffd8d8]",
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
