"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Gift } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GIFT_COLOR_NOTE } from "@/lib/constants";
import { getCategoryLabel } from "@/lib/utils";
import { Presente } from "@/types";

export function PresenteCard({
  presente,
  index,
  onChoose,
}: {
  presente: Presente;
  index: number;
  onChoose: (presente: Presente) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: "0 20px 60px rgba(201,168,76,0.2)",
        borderColor: "rgba(201,168,76,0.6)",
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: Math.min(index * 0.1, 0.5),
        duration: 0.5,
        ease: "easeOut",
      }}
      className="group relative overflow-hidden border border-[rgba(201,168,76,0.18)] bg-[var(--color-surface)] transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={presente.imagemUrl}
          alt={presente.nome}
          fill
          className={`object-cover transition duration-300 group-hover:scale-[1.08] ${
            presente.escolhido ? "grayscale-[0.8]" : ""
          }`}
        />
        {presente.escolhido ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[rgba(13,11,10,0.85)] text-center">
            <Check className="mb-3 h-8 w-8 text-[var(--color-gold-light)]" />
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
              Escolhido
            </p>
            <p className="mt-2 text-sm text-[var(--color-cream)]">
              por {presente.escolhidoPor?.nome ?? "um convidado"}
            </p>
          </div>
        ) : null}
      </div>
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em]">
          <span className="border border-[rgba(201,168,76,0.24)] px-2 py-1 text-[var(--color-gold-light)]">
            {getCategoryLabel(presente.categoria)}
          </span>
          <span className="border border-[rgba(201,168,76,0.18)] px-2 py-1 text-[var(--color-cream-muted)]">
            {presente.escolhido ? "Escolhido" : "Disponivel"}
          </span>
        </div>
        <div>
          <h3 className="font-display text-3xl italic">{presente.nome}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--color-cream-muted)]">
            {presente.descricao}
          </p>
          <p className="mt-3 border-l border-[rgba(201,168,76,0.28)] pl-3 text-xs uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
            {GIFT_COLOR_NOTE}
          </p>
        </div>
        <Button
          className="w-full"
          variant={presente.escolhido ? "secondary" : "primary"}
          disabled={presente.escolhido}
          onClick={() => onChoose(presente)}
        >
          {presente.escolhido ? (
            "Presente ja reservado"
          ) : (
            <>
              <Gift size={16} className="mr-2" />
              Escolher este presente
            </>
          )}
        </Button>
      </div>
    </motion.article>
  );
}
