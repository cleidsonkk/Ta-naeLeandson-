"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-3 py-4 sm:items-center sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-lg flex-col overflow-hidden border border-[rgba(201,168,76,0.25)] bg-[var(--color-surface)] p-4 sm:p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <button
              className="absolute right-4 top-4 text-[var(--color-cream-muted)]"
              onClick={onClose}
            >
              <X size={18} />
            </button>
            <h3 className="pr-8 font-display text-3xl italic">{title}</h3>
            <div className="mt-5 overflow-y-auto pr-1">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
