"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const MENU_PAGES = [
  "/images/menu/page-1.jpg",
  "/images/menu/page-2.jpg",
  "/images/menu/page-3.jpg",
  "/images/menu/page-4.jpg",
];

interface MenuModalProps {
  open: boolean;
  onClose: () => void;
}

export function MenuModal({ open, onClose }: MenuModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-cream/60 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close button — fixed top-left */}
          <button
            onClick={onClose}
            className="absolute left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary/80 text-cream backdrop-blur-sm transition-colors duration-200 hover:bg-warm"
            aria-label="סגור תפריט"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="1" y1="1" x2="17" y2="17" />
              <line x1="17" y1="1" x2="1" y2="17" />
            </svg>
          </button>

          {/* Scrollable menu pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="h-[90vh] w-[90vw] max-w-3xl overflow-y-auto rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              {MENU_PAGES.map((src, i) => (
                <div key={i} className="relative w-full">
                  <Image
                    src={src}
                    alt={`תפריט עמוד ${i + 1}`}
                    width={1600}
                    height={2272}
                    className="w-full h-auto"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
