"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function OrderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set("q", query.trim());
      } else {
        params.delete("q");
      }
      router.push(`/admin/orders?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timerRef.current);
  }, [query, searchParams, router]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="חיפוש לפי שם, טלפון או מזהה..."
      className="w-64 rounded border border-warm bg-primary px-3 py-2 text-body text-cream placeholder:text-cream-muted focus:border-copper focus:outline-none"
    />
  );
}
