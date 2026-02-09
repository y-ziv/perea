"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, viewportConfig } from "@/lib/animations";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "none";
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const variants = direction === "up" ? fadeUp : fadeIn;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
