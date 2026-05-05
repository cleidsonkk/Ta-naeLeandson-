"use client";

import { motion } from "framer-motion";

const storyTimelineItems = [
  {
    data: "24/11/2025",
    titulo: "Primeiro Encontro",
    descricao:
      "O instante em que tudo começou e uma simples conversa se transformou em conexão, cumplicidade e desejo de construir uma história a dois.",
  },
  {
    data: "04/04/2026",
    titulo: "O Pedido",
    descricao:
      "Com emoção, brilho nos olhos e a certeza do amor, escolhemos transformar sentimento em promessa e compromisso para toda a vida.",
  },
  {
    data: "24/01/2027",
    titulo: "O Grande Dia",
    descricao:
      "O dia em que celebraremos nosso para sempre, cercados por pessoas especiais e por tudo o que tornou essa jornada inesquecível.",
  },
] as const;

export function StoryTimeline() {
  return (
    <section className="page-shell">
      <div className="mb-10">
        <p className="eyebrow">Nossa História</p>
        <h2 className="font-display text-4xl italic md:text-5xl">
          Uma linha do tempo marcada por encontro, promessa e destino
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {storyTimelineItems.map((item, index) => (
          <motion.article
            key={item.data}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: Math.min(index * 0.12, 0.4), duration: 0.5 }}
            className="ornate-panel p-6"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
              {item.data}
            </p>
            <h3 className="mt-4 font-display text-3xl italic">{item.titulo}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-cream-muted)]">
              {item.descricao}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
