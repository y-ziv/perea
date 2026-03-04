"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

interface DeleteButtonProps {
  endpoint: string;
  confirmMessage: string;
  redirectTo?: string;
  label?: string;
  className?: string;
}

export function DeleteButton({
  endpoint,
  confirmMessage,
  redirectTo,
  label = "מחיקה",
  className = "text-caption text-red-400 transition-colors hover:text-red-300 disabled:opacity-50",
}: DeleteButtonProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleConfirm() {
    setDeleting(true);
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Delete failed");
      }
      setShowConfirm(false);
      toast.success("נמחק בהצלחה");
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err instanceof Error ? err.message : "שגיאה במחיקה");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        disabled={deleting}
        className={className}
      >
        {deleting ? "מוחק..." : label}
      </button>
      <ConfirmDialog
        open={showConfirm}
        title="אישור מחיקה"
        message={confirmMessage}
        confirmLabel="מחיקה"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
        loading={deleting}
      />
    </>
  );
}
