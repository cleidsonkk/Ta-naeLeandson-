import { CategoriaSlug, Presente, ThemeOption, TimelineItem } from "@/types";

export const WEDDING_DATE = "2027-01-24T00:00:00-03:00";
export const MAX_GIFTS_PER_GUEST = 5;
export const GIFT_COLOR_NOTE =
  "Itens preferencialmente nas cores inox ou preto para manter a harmonia do nosso lar.";

export const LOVE_MESSAGE = `Com muito amor, estamos iniciando um novo cap\u00edtulo da nossa hist\u00f3ria e
gostar\u00edamos de compartilhar esse momento especial com voc\u00ea.

Preparamos nossa lista de casamento com itens que ir\u00e3o compor nosso lar.
Caso deseje nos presentear, ficaremos imensamente felizes com sua contribui\u00e7\u00e3o.

Pensamos em cada detalhe com carinho e para manter a harmonia do nosso cantinho,
os eletrodom\u00e9sticos foram escolhidos preferencialmente nas cores preta ou inox.`;

export const CATEGORY_LABELS: Record<CategoriaSlug, string> = {
  cozinha: "Cozinha",
  quarto: "Quarto",
  sala: "Sala",
  banheiro: "Banheiro",
  area_servico: "\u00c1rea de Servi\u00e7o",
  gourmet: "\u00c1rea Gourmet",
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
      "O come\u00e7o de uma conversa que logo virou abrigo, cumplicidade e vontade de dividir a vida.",
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
      "Com emo\u00e7\u00e3o, promessa e brilho nos olhos, escolhemos transformar amor em compromisso eterno.",
  },
  {
    ano: "2027",
    titulo: "O Grande Dia",
    descricao:
      "Agora celebramos o in\u00edcio do nosso lar, cercados por quem fez parte dessa hist\u00f3ria.",
  },
];

const PLACEHOLDER = "/gift-placeholder.svg";

const presentesPorCategoria: Array<[CategoriaSlug, string[]]> = [
  [
    "cozinha",
    [
      "Geladeira 3 portas",
      "Fog\u00e3o Cooktop Embutir",
      "Micro-ondas",
      "Airfryer",
      "Panela de arroz",
      "Cafeteira de c\u00e1psulas",
      "Pipoqueira El\u00e9trica inox",
      "Espremedor de laranja",
      "Depurador retr\u00e1til",
      "Liquidificador port\u00e1til",
      "Liquidificador",
      "Batedeira",
      "Panela de press\u00e3o el\u00e9trica",
      "Bebedouro",
      "Pano de prato",
      "T\u00e1bua de carne",
      "Escorredor inox",
      "Escorredor de pia inox",
      "Peneira grande inox",
      "Fruteira",
      "Lixeira",
      "Kit de quebrar caranguejo",
      "Formas de bolo",
      "Copos",
      "Ta\u00e7as",
      "X\u00edcaras",
      "Abridor de vinho",
      "Aparelho de jantar",
      "Mesa de caf\u00e9 da manh\u00e3 na cama",
      "Escada",
      "Escada pequena alum\u00ednio",
      "Petisqueira",
      "Pote spray",
      "Garrafa t\u00e9rmica",
      "T\u00e1bua de passar",
      "Ta\u00e7a de sobremesa",
      "Cuscuzeiro",
      "Travessas de vidro",
      "Conjunto de vasos herm\u00e9ticos em Bambu (Boleira, Queijeira, Manteigueira e frios)",
      "Jarra de suco",
      "Conjunto de panelas",
    ],
  ],
  [
    "quarto",
    [
      "Televis\u00e3o",
      "Almofadas",
      "Travesseiros",
      "Jogo de cama",
      "Kit edredom casal Queen",
      "Cortina",
      "Len\u00e7ol",
      "Fronha",
      "Ar-condicionado 12.000 BTUs",
      "Tapete Passadeira",
      "Ferro de passar",
      "Ferro a vapor",
      "Balan\u00e7a",
      "Cabides",
      "Escova de cabelo rotat\u00f3ria",
      "Prancha de cabelo",
    ],
  ],
  [
    "kit",
    [
      "Kit completo: Tesoura, Alicate, Cortador de unha, Pin\u00e7a, Agulha, Linhas, Caixa organizadora",
    ],
  ],
  ["sala", ["Tapete grande", "Ar-condicionado 16.000 BTUs", "Tapete para porta"]],
  ["banheiro", ["Tapetes", "Kit Lavabo"]],
  [
    "area_servico",
    [
      "M\u00e1quina de lavar lava e seca",
      "Varal retr\u00e1til",
      "Aspirador de p\u00f3",
      "Jato (lavadora de press\u00e3o)",
      "Cesto de roupa suja em Bambu",
      "Mop",
      "Kit Limpeza: Vassoura, Rodo, P\u00e1, Balde, Pano de ch\u00e3o, Pregadores",
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
          : "Item especial para construir cada ambiente do nosso novo cap\u00edtulo.",
      imagemUrl: PLACEHOLDER,
      escolhido: false,
      categoria,
      ordem: categoryIndex * 100 + itemIndex,
      escolhidoPor: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
);
