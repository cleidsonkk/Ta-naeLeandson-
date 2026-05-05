"use client";

import { motion } from "framer-motion";
import { TIMELINE_ITEMS } from "@/lib/constants";

export function StoryTimeline() {
  return (
    <section className="page-shell">
      <div className="mb-10">
        <p className="eyebrow">Nossa História</p>
        <h2 className="font-display text-4xl italic md:text-5xl">
          Uma linha do tempo feita de encontros, planos e promessa
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-4">
        {TIMELINE_ITEMS.map((item, index) => (
          <motion.article
            key={item.ano}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: Math.min(index * 0.1, 0.5), duration: 0.5 }}
            className="ornate-panel p-6"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
              {item.ano}
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
