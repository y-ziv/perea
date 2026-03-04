"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "@/data/navigation";
import { MenuModal } from "@/components/ui/MenuModal";
import { CartButton } from "./CartButton";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useScrollLock(mobileOpen);
  const mobileTrapRef = useFocusTrap(mobileOpen);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled ? "bg-primary/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="relative flex min-h-[6rem] w-full items-center justify-between px-6 py-5">
          {/* Desktop nav — centered absolutely */}
          <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-10 rounded-full bg-primary/60 px-8 py-2.5 backdrop-blur-sm sm:flex">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative text-caption tracking-wide text-clay transition-colors duration-300 ${
                      isActive ? "font-medium" : "font-normal"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] w-full bg-clay transition-transform duration-300 ease-out ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle + cart */}
          <div className="relative z-50 flex items-center gap-4 sm:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
              aria-label={mobileOpen ? "סגור תפריט" : "פתח תפריט"}
              aria-expanded={mobileOpen}
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
            <CartButton />
          </div>

          {/* Menu + Cart buttons — desktop only */}
          <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 items-center gap-3 sm:flex">
            <CartButton />
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 rounded-full bg-primary/60 px-5 py-2 text-caption tracking-wide text-copper backdrop-blur-sm transition-all duration-300 hover:bg-copper hover:text-primary"
            >
              תפריט
            </button>
          </div>

          {/* Logo — aligned to the left manually via absolute positioning on desktop */}
          <Link
            href="/"
            className="relative z-50 flex h-14 shrink-0 items-center justify-center overflow-visible sm:absolute sm:left-12 sm:top-1/2 sm:-translate-y-1/2"
          >
            <Image
              src="/images/logo-warm.png"
              alt="פראה בית יין"
              width={160}
              height={160}
              className="h-14 w-auto scale-[2] origin-center sm:scale-[3.5]"
              priority
            />
          </Link>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileTrapRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="תפריט ניווט"
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
                      className={`font-sans text-h2 text-cream ${
                        pathname === item.href ? "font-bold underline" : "font-normal"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + navigation.length * 0.08 }}
                >
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setMenuOpen(true);
                    }}
                    className="mt-4 inline-block border border-copper px-8 py-3 font-sans text-h3 font-light text-copper transition-all duration-300 hover:bg-copper hover:text-primary"
                  >
                    תפריט
                  </button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <MenuModal open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
