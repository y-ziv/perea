"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("למחוק את ההזמנה?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      router.refresh();
    } catch (err) {
      console.error("Delete error:", err);
      alert("שגיאה במחיקה");
      setDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="text-caption text-red-400 transition-colors hover:text-red-300 disabled:opacity-50"
    >
      {deleting ? "מוחק..." : "מחיקה"}
    </button>
  );
}
