import { CategoriaSlug, Presente } from "@/types";
import { CATEGORY_LABELS } from "@/lib/constants";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getCategoryLabel(slug: CategoriaSlug) {
  return CATEGORY_LABELS[slug];
}

export function formatWeddingDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(date));
}

export function formatWeddingDateHero(date: string) {
  const formatted = formatWeddingDate(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function sortPresentes(presentes: Presente[]) {
  return [...presentes].sort((a, b) => a.ordem - b.ordem);
}

export function filterPresentesByCategory(
  presentes: Presente[],
  categoria?: string,
) {
  if (!categoria || categoria === "todos") return sortPresentes(presentes);
  return sortPresentes(
    presentes.filter((presente) => presente.categoria === categoria),
  );
}

export function toSlug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function formatPhone(phone: string) {
  const digits = normalizePhone(phone);

  if (digits.length === 11) {
    return digits.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
  }

  if (digits.length === 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  return phone;
}
