import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full border border-[rgba(201,168,76,0.22)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--color-cream)] outline-none transition focus:border-[rgba(232,201,122,0.6)]",
        className,
      )}
      {...props}
    />
  );
}
