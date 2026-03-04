"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import type { DeliveryMethod } from "@/types";

export default function CheckoutPage() {
  const { items, totalAgorot } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    deliveryMethod: "pickup" as DeliveryMethod,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function updateField(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validateField(key: string, formState = form): string | null {
    switch (key) {
      case "name": {
        const parts = formState.name.trim().split(/\s+/);
        if (parts.length < 2 || parts.some((p) => p.length < 2))
          return "יש להזין שם פרטי ושם משפחה";
        return null;
      }
      case "phone": {
        const clean = formState.phone.replace(/[\s\-()]/g, "");
        if (!/^0\d{8,9}$/.test(clean))
          return "יש להזין מספר טלפון ישראלי תקין";
        return null;
      }
      case "email": {
        if (!/^\S+@\S+\.\S+$/.test(formState.email))
          return "יש להזין כתובת אימייל תקינה";
        return null;
      }
      case "address": {
        if (formState.deliveryMethod === "shipping" && !formState.address.trim())
          return "יש להזין כתובת למשלוח";
        return null;
      }
      default:
        return null;
    }
  }

  function handleBlur(key: string) {
    const fieldError = validateField(key);
    if (fieldError) {
      setFieldErrors((prev) => ({ ...prev, [key]: fieldError }));
    }
  }

  function validate(): Record<string, string> {
    const errors: Record<string, string> = {};
    for (const key of ["name", "phone", "email", "address"]) {
      const fieldError = validateField(key);
      if (fieldError) errors[key] = fieldError;
    }
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            wineSlug: i.wineSlug,
            quantity: i.quantity,
          })),
          customer: {
            name: form.name,
            phone: form.phone,
            email: form.email,
            address: form.deliveryMethod === "shipping" ? form.address : undefined,
            notes: form.notes || undefined,
          },
          deliveryMethod: form.deliveryMethod,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Checkout failed");
      }

      const { redirectUrl } = await res.json();
      window.location.href = redirectUrl;
      // Fallback: if navigation doesn't happen within 5s, re-enable the button
      setTimeout(() => setLoading(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה בביצוע ההזמנה");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full border border-warm bg-primary px-4 py-3 text-body text-cream focus:border-copper focus:outline-none";

  if (items.length === 0) {
    return (
      <section className="bg-primary pt-32 pb-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="font-heading-secondary text-h3 text-copper">
            העגלה ריקה
          </h1>
          <p className="mt-4 text-body text-cream-muted">
            אין פריטים בעגלה. חזרו לחנות כדי להוסיף יינות.
          </p>
          <Link
            href="/store"
            className="mt-8 inline-block border border-copper px-8 py-3 text-caption font-medium text-copper transition-colors hover:bg-copper hover:text-primary"
          >
            חזרה לחנות
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-primary pt-24 pb-14 sm:pt-32 sm:pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="font-heading-secondary text-h3 text-copper">
          תשלום
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 lg:col-span-3"
          >
            <div>
              <label htmlFor="checkout-name" className="mb-1 block text-caption font-medium text-cream-muted">
                שם מלא *
              </label>
              <input
                id="checkout-name"
                className={`${inputClass} ${fieldErrors.name ? "border-red-500" : ""}`}
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                required
              />
              {fieldErrors.name && (
                <p role="alert" className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkout-phone" className="mb-1 block text-caption font-medium text-cream-muted">
                  טלפון *
                </label>
                <input
                  id="checkout-phone"
                  className={`${inputClass} ${fieldErrors.phone ? "border-red-500" : ""}`}
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  required
                />
                {fieldErrors.phone && (
                  <p role="alert" className="mt-1 text-xs text-red-400">{fieldErrors.phone}</p>
                )}
              </div>
              <div>
                <label htmlFor="checkout-email" className="mb-1 block text-caption font-medium text-cream-muted">
                  אימייל *
                </label>
                <input
                  id="checkout-email"
                  className={`${inputClass} ${fieldErrors.email ? "border-red-500" : ""}`}
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  required
                />
                {fieldErrors.email && (
                  <p role="alert" className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-caption font-medium text-cream-muted">
                אופן קבלה
              </label>
              <div className="flex gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-body text-cream">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={form.deliveryMethod === "pickup"}
                    onChange={() => updateField("deliveryMethod", "pickup")}
                    className="accent-copper"
                  />
                  איסוף עצמי
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-body text-cream">
                  <input
                    type="radio"
                    name="delivery"
                    value="shipping"
                    checked={form.deliveryMethod === "shipping"}
                    onChange={() => updateField("deliveryMethod", "shipping")}
                    className="accent-copper"
                  />
                  משלוח
                </label>
              </div>
            </div>

            {form.deliveryMethod === "shipping" && (
              <div>
                <label htmlFor="checkout-address" className="mb-1 block text-caption font-medium text-cream-muted">
                  כתובת למשלוח *
                </label>
                <input
                  id="checkout-address"
                  className={`${inputClass} ${fieldErrors.address ? "border-red-500" : ""}`}
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  onBlur={() => handleBlur("address")}
                  placeholder="עיר, רחוב ומספר"
                  required
                />
                {fieldErrors.address && (
                  <p role="alert" className="mt-1 text-xs text-red-400">{fieldErrors.address}</p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="checkout-notes" className="mb-1 block text-caption font-medium text-cream-muted">
                הערות
              </label>
              <textarea
                id="checkout-notes"
                className={`${inputClass} h-20 resize-none`}
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />
            </div>

            {error && (
              <p role="alert" className="text-body text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-copper bg-copper py-3 text-caption font-medium tracking-wide text-primary transition-colors hover:bg-copper-light disabled:opacity-50"
            >
              {loading ? "מעבד..." : `לתשלום — ${formatPrice(totalAgorot)}`}
            </button>
          </form>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="rounded border border-warm bg-secondary p-6">
              <h2 className="font-heading-secondary text-h4 text-copper">
                סיכום הזמנה
              </h2>
              <div className="mt-4 space-y-3">
                {items.map((item) => (
                  <div key={item.wineSlug} className="flex gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-warm/30">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-caption font-medium text-cream">
                        {item.name}
                      </p>
                      <p className="text-xs text-cream-muted">
                        {item.quantity} x {formatPrice(item.priceAgorot)}
                      </p>
                    </div>
                    <p className="text-caption text-copper">
                      {formatPrice(item.priceAgorot * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-warm pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-body font-medium text-cream">
                    סה&quot;כ
                  </span>
                  <span className="font-heading-secondary text-h4 text-copper">
                    {formatPrice(totalAgorot)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
