"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "@/data/navigation";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-primary/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Desktop nav — first in DOM so it appears on the right in RTL */}
          <ul className="hidden items-center gap-10 sm:flex">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-caption font-normal tracking-wide text-cream-muted transition-colors duration-300 hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 sm:hidden"
            aria-label={mobileOpen ? "סגור תפריט" : "פתח תפריט"}
          >
            <span
              className={`h-px w-6 bg-cream transition-all duration-300 ${
                mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-cream transition-all duration-300 ${
                mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>

          {/* Logo — last in DOM so it appears on the left in RTL; scaled up visually only, nav height unchanged */}
          <Link href="/" className="relative z-50 flex h-14 shrink-0 items-center justify-center overflow-visible">
            <Image
              src="/images/logo-warm.png"
              alt="פראה בית יין"
              width={160}
              height={160}
              className="h-14 w-auto scale-150 origin-center sm:scale-[1.7]"
              priority
            />
          </Link>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-primary"
          >
            <nav>
              <ul className="flex flex-col items-center gap-8">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-sans text-h2 font-light text-cream"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
