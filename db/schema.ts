import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const presentes = pgTable("presentes", {
  id: uuid("id").primaryKey().defaultRandom(),
  nome: text("nome").notNull(),
  descricao: text("descricao"),
  imagemUrl: text("imagem_url").notNull(),
  escolhido: boolean("escolhido").default(false).notNull(),
  categoria: text("categoria").notNull(),
  ordem: integer("ordem").notNull().default(0),
  escolhidoPor: jsonb("escolhido_por").$type<{
    nome: string;
    telefone: string;
    escolhidoEm?: string | null;
  } | null>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const convidados = pgTable("convidados", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique(),
  telefone: text("telefone").unique(),
  googleName: text("google_name"),
  googlePhoto: text("google_photo"),
  nomeConvidado: text("nome_convidado"),
  presenteId: uuid("presente_id").references(() => presentes.id),
  createdAt: timestamp("created_at").defaultNow(),
});
