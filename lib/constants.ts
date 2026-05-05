import { CategoriaSlug, Presente, ThemeOption, TimelineItem } from "@/types";

export const WEDDING_DATE = "2027-01-24T00:00:00-03:00";
export const GIFT_COLOR_NOTE =
  "Itens preferencialmente nas cores inox ou preto para manter a harmonia do nosso lar.";

export const LOVE_MESSAGE = `Com muito amor, estamos iniciando um novo capítulo da nossa história e
gostaríamos de compartilhar esse momento especial com você.

Preparamos nossa lista de casamento com itens que irão compor nosso lar.
Caso deseje nos presentear, ficaremos imensamente felizes com sua contribuição.

Pensamos em cada detalhe com carinho e para manter a harmonia do nosso cantinho,
os eletrodomésticos foram escolhidos preferencialmente nas cores preta ou inox.`;

export const CATEGORY_LABELS: Record<CategoriaSlug, string> = {
  cozinha: "Cozinha",
  quarto: "Quarto",
  sala: "Sala",
  banheiro: "Banheiro",
  area_servico: "Área de Serviço",
  gourmet: "Área Gourmet",
  kit: "Kits",
};

export const CATEGORY_TABS = [
  { slug: "todos", label: "Todos" },
  ...Object.entries(CATEGORY_LABELS).map(([slug, label]) => ({ slug, label })),
] as const;

export const HOME_THEMES: ThemeOption[] = [
  {
    id: "noir-foil",
    name: "Noir Foil",
    preview: "linear-gradient(135deg, #0d0b0a, #c9a84c)",
  },
  {
    id: "vinho-dourado",
    name: "Vinho Dourado",
    preview: "linear-gradient(135deg, #1a0d0d, #8b1a1a, #e8c97a)",
  },
  {
    id: "marfim-luxo",
    name: "Marfim Luxo",
    preview: "linear-gradient(135deg, #f5edd6, #c9a84c, #7a6230)",
  },
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    ano: "2019",
    titulo: "O Primeiro Encontro",
    descricao:
      "O começo de uma conversa que logo virou abrigo, cumplicidade e vontade de dividir a vida.",
  },
  {
    ano: "2021",
    titulo: "Planos em Comum",
    descricao:
      "Entre sonhos, trabalho e afeto, descobrimos que o futuro fazia mais sentido lado a lado.",
  },
  {
    ano: "2024",
    titulo: "O Pedido",
    descricao:
      "Com emoção, promessa e brilho nos olhos, escolhemos transformar amor em compromisso eterno.",
  },
  {
    ano: "2027",
    titulo: "O Grande Dia",
    descricao:
      "Agora celebramos o início do nosso lar, cercados por quem fez parte dessa história.",
  },
];

const PLACEHOLDER = "/gift-placeholder.svg";

const presentesPorCategoria: Array<[CategoriaSlug, string[]]> = [
  [
    "cozinha",
    [
      "Geladeira 3 portas",
      "Fogão Cooktop Embutir",
      "Micro-ondas",
      "Airfryer",
      "Panela de arroz",
      "Cafeteira de cápsulas",
      "Pipoqueira Elétrica inox",
      "Espremedor de laranja",
      "Depurador retrátil",
      "Liquidificador portátil",
      "Liquidificador",
      "Batedeira",
      "Panela de pressão elétrica",
      "Bebedouro",
      "Pano de prato",
      "Tábua de carne",
      "Escorredor inox",
      "Escorredor de pia inox",
      "Peneira grande inox",
      "Fruteira",
      "Lixeira",
      "Kit de quebrar caranguejo",
      "Formas de bolo",
      "Copos",
      "Taças",
      "Xícaras",
      "Abridor de vinho",
      "Aparelho de jantar",
      "Mesa de café da manhã na cama",
      "Escada",
      "Escada pequena alumínio",
      "Petisqueira",
      "Pote spray",
      "Garrafa térmica",
      "Tábua de passar",
      "Taça de sobremesa",
      "Cuscuzeiro",
      "Travessas de vidro",
      "Conjunto de vasos herméticos em Bambu (Boleira, Queijeira, Manteigueira e frios)",
      "Jarra de suco",
      "Conjunto de panelas",
    ],
  ],
  [
    "quarto",
    [
      "Televisão",
      "Almofadas",
      "Travesseiros",
      "Jogo de cama",
      "Kit edredom casal Queen",
      "Cortina",
      "Lençol",
      "Fronha",
      "Ar-condicionado 12.000 BTUs",
      "Tapete Passadeira",
      "Ferro de passar",
      "Ferro a vapor",
      "Balança",
      "Cabides",
      "Escova de cabelo rotatória",
      "Prancha de cabelo",
    ],
  ],
  [
    "kit",
    [
      "Kit completo: Tesoura, Alicate, Cortador de unha, Pinça, Agulha, Linhas, Caixa organizadora",
    ],
  ],
  ["sala", ["Tapete grande", "Ar-condicionado 16.000 BTUs", "Tapete para porta"]],
  ["banheiro", ["Tapetes", "Kit Lavabo"]],
  [
    "area_servico",
    [
      "Máquina de lavar lava e seca",
      "Varal retrátil",
      "Aspirador de pó",
      "Jato (lavadora de pressão)",
      "Cesto de roupa suja em Bambu",
      "Mop",
      "Kit Limpeza: Vassoura, Rodo, Pá, Balde, Pano de chão, Pregadores",
    ],
  ],
  [
    "gourmet",
    [
      "Jogo de churrasco em pedra",
      "Caixa de som",
      "Mesa de Jaqueira",
      "Banquetas",
      "Faqueiro de churrasco",
    ],
  ],
];

export const GIFTS_SEED: Presente[] = presentesPorCategoria.flatMap(
  ([categoria, itens], categoryIndex) =>
    itens.map((nome, itemIndex) => ({
      id: `${categoria}-${categoryIndex}-${itemIndex}`,
      nome,
      descricao:
        categoria === "cozinha"
          ? "Selecionado com cuidado para compor um lar elegante, funcional e acolhedor."
          : "Item especial para construir cada ambiente do nosso novo capítulo.",
      imagemUrl: PLACEHOLDER,
      escolhido: false,
      categoria,
      ordem: categoryIndex * 100 + itemIndex,
      escolhidoPor: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
);
