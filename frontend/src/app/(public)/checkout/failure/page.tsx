import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "התשלום נכשל",
};

export default function FailurePage() {
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
          התשלום לא הושלם
        </h1>
        <p className="mt-4 text-body text-cream-muted">
          התשלום בוטל או שאירעה שגיאה. הפריטים נשארו בעגלה שלכם.
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
