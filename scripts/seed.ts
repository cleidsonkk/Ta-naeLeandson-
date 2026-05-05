import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { presentes } from "../db/schema";
import { GIFTS_SEED } from "../lib/constants";

config({ path: ".env.local" });

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL não configurada.");
  }

  const db = drizzle(neon(databaseUrl));

  await db.delete(presentes);
  await db.insert(presentes).values(
    GIFTS_SEED.map((item) => ({
      nome: item.nome,
      descricao: item.descricao,
      imagemUrl: item.imagemUrl,
      escolhido: item.escolhido,
      categoria: item.categoria,
      ordem: item.ordem,
      escolhidoPor: item.escolhidoPor,
    })),
  );

  console.log(`Seed concluído com ${GIFTS_SEED.length} presentes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
