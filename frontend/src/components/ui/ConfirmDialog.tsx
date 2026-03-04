"use client";

import { useEffect, useId } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "אישור",
  cancelLabel = "ביטול",
  onConfirm,
  onCancel,
  loading,
}: ConfirmDialogProps) {
  const trapRef = useFocusTrap(open);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div ref={trapRef} className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 mx-4 w-full max-w-sm rounded-lg bg-primary p-6 shadow-xl"
      >
        <h3 id={titleId} className="text-body font-medium text-cream">
          {title}
        </h3>
        <p className="mt-2 text-caption text-cream-muted">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded px-4 py-2 text-caption text-cream-muted transition-colors hover:bg-secondary"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded bg-red-600 px-4 py-2 text-caption text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "מוחק..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
