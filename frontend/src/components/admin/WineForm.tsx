"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./ImageUpload";

interface WineFormData {
  slug: string;
  name: string;
  nameHe: string;
  winery: string;
  region: string;
  country: string;
  type: string;
  grape: string;
  year: string;
  description: string;
  image: string;
  featured: boolean;
  priceAgorot: number;
  stock: number;
}

interface WineFormProps {
  initialData?: Partial<WineFormData>;
  mode: "create" | "edit";
}

export function WineForm({ initialData, mode }: WineFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<WineFormData>({
    slug: initialData?.slug ?? "",
    name: initialData?.name ?? "",
    nameHe: initialData?.nameHe ?? "",
    winery: initialData?.winery ?? "",
    region: initialData?.region ?? "galilee",
    country: initialData?.country ?? "Israel",
    type: initialData?.type ?? "red",
    grape: initialData?.grape ?? "",
    year: initialData?.year ?? "",
    description: initialData?.description ?? "",
    image: initialData?.image ?? "",
    featured: initialData?.featured ?? false,
    priceAgorot: initialData?.priceAgorot ?? 0,
    stock: initialData?.stock ?? 0,
  });

  const priceILS = (form.priceAgorot / 100).toFixed(2);

  function updateField<K extends keyof WineFormData>(
    key: K,
    value: WineFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...form,
        year: form.year ? Number(form.year) : undefined,
      };

      const url =
        mode === "create"
          ? "/api/admin/wines"
          : `/api/admin/wines/${initialData?.slug}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }

      router.push("/admin/wines");
      router.refresh();
    } catch (err) {
      console.error("Save error:", err);
      alert("שגיאה בשמירה");
      setSaving(false);
    }
  }

  const inputClass =
    "w-full border border-warm bg-primary px-3 py-2 text-body text-cream focus:border-copper focus:outline-none";
  const labelClass = "block text-caption font-medium text-cream-muted mb-1";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Slug (מזהה ייחודי)</label>
          <input
            className={inputClass}
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            required
            disabled={mode === "edit"}
          />
        </div>
        <div>
          <label className={labelClass}>שם</label>
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>שם בעברית</label>
          <input
            className={inputClass}
            value={form.nameHe}
            onChange={(e) => updateField("nameHe", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>יקב</label>
          <input
            className={inputClass}
            value={form.winery}
            onChange={(e) => updateField("winery", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>אזור</label>
          <select
            className={inputClass}
            value={form.region}
            onChange={(e) => updateField("region", e.target.value)}
          >
            <option value="galilee">גליל</option>
            <option value="northern-greece">צפון יוון</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>מדינה</label>
          <select
            className={inputClass}
            value={form.country}
            onChange={(e) => updateField("country", e.target.value)}
          >
            <option value="Israel">ישראל</option>
            <option value="Greece">יוון</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>סוג</label>
          <select
            className={inputClass}
            value={form.type}
            onChange={(e) => updateField("type", e.target.value)}
          >
            <option value="red">אדום</option>
            <option value="white">לבן</option>
            <option value="rosé">רוזה</option>
            <option value="orange">כתום</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>זן ענבים</label>
          <input
            className={inputClass}
            value={form.grape}
            onChange={(e) => updateField("grape", e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass}>שנה</label>
          <input
            className={inputClass}
            type="number"
            value={form.year}
            onChange={(e) => updateField("year", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>תיאור</label>
        <textarea
          className={`${inputClass} h-24 resize-none`}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          required
        />
      </div>

      <div>
        <label className={labelClass}>תמונה</label>
        <ImageUpload
          value={form.image}
          onChange={(url) => updateField("image", url)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>מחיר (₪{priceILS})</label>
          <input
            className={inputClass}
            type="number"
            min="0"
            value={form.priceAgorot}
            onChange={(e) =>
              updateField("priceAgorot", Number(e.target.value))
            }
            required
          />
          <p className="mt-1 text-xs text-cream-muted">באגורות (18900 = ₪189.00)</p>
        </div>
        <div>
          <label className={labelClass}>מלאי</label>
          <input
            className={inputClass}
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => updateField("stock", Number(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="border border-copper bg-copper px-6 py-2 text-caption font-medium text-primary transition-colors hover:bg-copper-light disabled:opacity-50"
        >
          {saving ? "שומר..." : mode === "create" ? "יצירה" : "עדכון"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-warm px-6 py-2 text-caption text-cream-muted transition-colors hover:bg-secondary"
        >
          ביטול
        </button>
      </div>
    </form>
  );
}
