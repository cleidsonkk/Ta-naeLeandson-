"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatWeddingDate } from "@/lib/utils";
import { WEDDING_DATE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,201,122,0.18),transparent_38%),linear-gradient(180deg,rgba(13,11,10,0.15),rgba(13,11,10,0.94)),url('/hero-texture.svg')] bg-cover bg-center" />
      <div className="page-shell relative flex min-h-[80vh] items-center py-20">
        <div className="grid w-full gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl space-y-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="eyebrow"
            >
              Um novo capítulo começa aqui
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="font-display text-6xl italic leading-none md:text-8xl"
            >
              Leandson & Taína
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="text-lg text-[var(--color-cream-muted)] md:text-2xl"
            >
              {formatWeddingDate(WEDDING_DATE)}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
              className="font-display text-2xl italic text-[var(--color-cream-muted)]"
            >
              Nos unimos para sempre
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
            >
              <Link href="/presentes">
                <Button className="min-w-64">Ver Lista de Presentes</Button>
              </Link>
            </motion.div>
          </motion.div>
          <div className="relative hidden min-h-[420px] items-center justify-center lg:flex">
            <div
              className="flex h-64 w-64 items-center justify-center border border-[rgba(201,168,76,0.35)] bg-[rgba(255,255,255,0.03)]"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <Sparkles className="h-20 w-20 text-[var(--color-gold-light)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
