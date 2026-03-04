"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      toast.error("הקובץ גדול מדי. גודל מקסימלי: 5MB");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("שגיאה בהעלאת התמונה");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative h-48 w-48 overflow-hidden rounded border border-warm">
          <Image src={value} alt="תצוגה מקדימה" fill sizes="192px" className="object-cover" />
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleUpload}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="border border-copper px-4 py-2 text-caption text-copper transition-colors hover:bg-copper hover:text-primary disabled:opacity-50"
      >
        {uploading ? "מעלה..." : value ? "החלפת תמונה" : "העלאת תמונה"}
      </button>
    </div>
  );
}
