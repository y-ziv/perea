import type { Variants } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const viewportConfig = {
  once: true,
  amount: 0.3,
} as const;
