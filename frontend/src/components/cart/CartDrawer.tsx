"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { CartItemRow } from "./CartItemRow";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, closeCart, totalAgorot } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-cream/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 top-0 z-50 flex w-full max-w-md flex-col bg-primary shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-warm px-6 py-4">
              <h2 className="font-heading-secondary text-h4 text-copper">
                עגלת קניות
              </h2>
              <button
                onClick={closeCart}
                className="text-cream-muted transition-colors hover:text-cream"
                aria-label="סגור עגלה"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="py-12 text-center text-body text-cream-muted">
                  העגלה ריקה
                </p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItemRow key={item.wineSlug} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-warm px-6 py-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-body font-medium text-cream">
                    סה&quot;כ
                  </span>
                  <span className="font-heading-secondary text-h4 text-copper">
                    {formatPrice(totalAgorot)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full border border-copper bg-copper py-3 text-center text-caption font-medium tracking-wide text-primary transition-colors hover:bg-copper-light"
                >
                  לתשלום
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
