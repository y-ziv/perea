"use client";

import { useEffect } from "react";

// Store lock count on the DOM element itself to avoid module-level state
// that can desync across hot-reloads or multiple bundles.
const LOCK_ATTR = "data-scroll-lock-count";

function getLockCount(): number {
  return Number(document.body.getAttribute(LOCK_ATTR) || "0");
}

function setLockCount(count: number) {
  document.body.setAttribute(LOCK_ATTR, String(count));
  document.body.style.overflow = count > 0 ? "hidden" : "";
}

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    setLockCount(getLockCount() + 1);
    return () => setLockCount(Math.max(0, getLockCount() - 1));
  }, [locked]);
}
