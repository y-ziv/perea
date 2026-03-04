"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteWineButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("למחוק את היין?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/wines/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/admin/wines");
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
      className="border border-red-500 px-4 py-2 text-caption text-red-500 transition-colors hover:bg-red-500 hover:text-white disabled:opacity-50"
    >
      {deleting ? "מוחק..." : "מחיקה"}
    </button>
  );
}
