"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const links = [
  { href: "/admin", label: "דשבורד" },
  { href: "/admin/wines", label: "יינות" },
  { href: "/admin/orders", label: "הזמנות" },
];

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="border-b border-warm px-6 py-5">
        <Link href="/admin" className="font-heading-secondary text-h4 text-copper" onClick={onNavigate}>
          פריאה ניהול
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`block rounded px-3 py-2 text-body transition-colors ${
                active
                  ? "bg-copper text-primary"
                  : "text-cream hover:bg-secondary"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-warm px-3 py-4">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full rounded px-3 py-2 text-start text-body text-cream-muted hover:bg-secondary"
        >
          התנתקות
        </button>
      </div>
    </>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  useScrollLock(mobileOpen);
  const mobileTrapRef = useFocusTrap(mobileOpen);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded bg-primary border border-warm md:hidden"
        aria-label="פתח תפריט ניהול"
      >
        <svg className="h-5 w-5 text-cream" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Mobile slide-out */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside
            ref={mobileTrapRef}
            aria-label="ניווט ניהול"
            className="fixed right-0 top-0 z-50 flex h-screen w-56 flex-col border-l border-warm bg-primary md:hidden"
          >
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute left-3 top-5 text-cream-muted hover:text-cream"
              aria-label="סגור תפריט"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </>
      )}

      {/* Desktop sidebar */}
      <aside aria-label="ניווט ניהול" className="fixed right-0 top-0 z-40 hidden h-screen w-56 flex-col border-l border-warm bg-primary md:flex">
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  );
}
