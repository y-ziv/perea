"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

type OrderStatus = "PENDING" | "PAID" | "FAILED" | "NOT_FOUND" | "LOADING";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="bg-primary pt-32 pb-20">
          <div className="mx-auto max-w-lg px-4 text-center">
            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-warm border-t-copper" />
            <h1 className="font-heading-secondary text-h3 text-copper">
              טוען...
            </h1>
          </div>
        </section>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { clearCart } = useCart();
  const [status, setStatus] = useState<OrderStatus>("LOADING");
  const clearedRef = useRef(false);

  // Build query string with Cardcom redirect params for server-side verification
  const verifyParams = new URLSearchParams();
  for (const key of ["lowprofilecode", "ResponseCode", "internalDealNumber"]) {
    const val = searchParams.get(key);
    if (val) verifyParams.set(key, val);
  }
  const qs = verifyParams.toString() ? `?${verifyParams.toString()}` : "";

  useEffect(() => {
    if (!orderId) {
      setStatus("NOT_FOUND");
      return;
    }

    let attempts = 0;
    const maxAttempts = 15; // 30 seconds at 2s intervals
    let timer: ReturnType<typeof setInterval>;

    async function poll() {
      try {
        const res = await fetch(`/api/orders/${orderId}${qs}`);
        if (!res.ok) {
          setStatus("NOT_FOUND");
          clearInterval(timer);
          return;
        }

        const data = await res.json();

        if (data.status === "PAID") {
          setStatus("PAID");
          if (!clearedRef.current) {
            clearedRef.current = true;
            clearCart();
          }
          clearInterval(timer);
          return;
        }

        if (data.status === "FAILED") {
          setStatus("FAILED");
          clearInterval(timer);
          return;
        }

        // Still PENDING
        setStatus("PENDING");
        attempts++;
        if (attempts >= maxAttempts) {
          clearInterval(timer);
        }
      } catch {
        attempts++;
        if (attempts >= maxAttempts) {
          clearInterval(timer);
        }
      }
    }

    poll();
    timer = setInterval(poll, 2000);

    return () => clearInterval(timer);
  }, [orderId, clearCart]);

  if (status === "LOADING" || status === "PENDING") {
    return (
      <section className="bg-primary pt-32 pb-20">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-warm border-t-copper" />
          <h1 className="font-heading-secondary text-h3 text-copper">
            מאמתים את התשלום...
          </h1>
          <p className="mt-4 text-body text-cream-muted">
            אנא המתינו, אנחנו מאשרים את התשלום שלכם.
          </p>
        </div>
      </section>
    );
  }

  if (status === "PAID") {
    return (
      <section className="bg-primary pt-32 pb-20">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h1 className="font-heading-secondary text-h3 text-copper">
            ההזמנה התקבלה!
          </h1>
          <p className="mt-4 text-body text-cream-muted">
            תודה על ההזמנה. נשלח לכם עדכון בקרוב.
          </p>
          <p className="mt-2 text-caption text-cream-muted">
            מזהה הזמנה: {orderId?.slice(0, 8)}...
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

  if (status === "FAILED") {
    return (
      <section className="bg-primary pt-32 pb-20">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="font-heading-secondary text-h3 text-copper">
            התשלום נכשל
          </h1>
          <p className="mt-4 text-body text-cream-muted">
            לא הצלחנו לעבד את התשלום. אנא נסו שוב.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/checkout"
              className="border border-copper bg-copper px-8 py-3 text-caption font-medium text-primary transition-colors hover:bg-copper-light"
            >
              נסו שוב
            </Link>
            <Link
              href="/store"
              className="border border-warm px-8 py-3 text-caption font-medium text-cream-muted transition-colors hover:bg-secondary"
            >
              חזרה לחנות
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // NOT_FOUND
  return (
    <section className="bg-primary pt-32 pb-20">
      <div className="mx-auto max-w-lg px-4 text-center">
        <h1 className="font-heading-secondary text-h3 text-copper">
          הזמנה לא נמצאה
        </h1>
        <p className="mt-4 text-body text-cream-muted">
          לא הצלחנו למצוא את ההזמנה.
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
