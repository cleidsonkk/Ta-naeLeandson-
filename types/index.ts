export type CategoriaSlug =
  | "cozinha"
  | "quarto"
  | "sala"
  | "banheiro"
  | "area_servico"
  | "gourmet"
  | "kit";

export type ThemeOption = {
  id: string;
  name: string;
  preview: string;
};

export type Presente = {
  id: string;
  nome: string;
  descricao: string | null;
  imagemUrl: string;
  escolhido: boolean;
  categoria: CategoriaSlug;
  ordem: number;
  escolhidoPor: {
    nome: string;
    telefone: string;
    escolhidoEm?: string | null;
  } | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export type TimelineItem = {
  ano: string;
  titulo: string;
  descricao: string;
};

export type DashboardStats = {
  total: number;
  escolhidos: number;
  disponiveis: number;
  percentual: number;
};
