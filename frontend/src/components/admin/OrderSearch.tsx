"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useCallback } from "react";

export function OrderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const navigate = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }
      router.push(`/admin/orders?${params.toString()}`);
    },
    [searchParams, router]
  );

  function handleChange(value: string) {
    setQuery(value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => navigate(value), 400);
  }

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="חיפוש לפי שם, טלפון או מזהה..."
      className="w-64 rounded border border-warm bg-primary px-3 py-2 text-body text-cream placeholder:text-cream-muted focus:border-copper focus:outline-none"
    />
  );
}
