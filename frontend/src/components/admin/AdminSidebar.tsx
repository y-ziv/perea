"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = [
  { href: "/admin", label: "דשבורד" },
  { href: "/admin/wines", label: "יינות" },
  { href: "/admin/orders", label: "הזמנות" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed right-0 top-0 z-40 flex h-screen w-56 flex-col border-l border-warm bg-primary">
      <div className="border-b border-warm px-6 py-5">
        <Link href="/admin" className="font-heading-secondary text-h4 text-copper">
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
    </aside>
  );
}
