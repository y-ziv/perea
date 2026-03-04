"use client";

export default function PublicError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="bg-primary pt-32 pb-20">
      <div className="mx-auto max-w-lg px-4 text-center">
        <h1 className="font-heading-secondary text-h3 text-copper">
          משהו השתבש
        </h1>
        <p className="mt-4 text-body text-cream-muted">
          אירעה שגיאה בלתי צפויה. אנא נסו שוב.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 border border-copper bg-copper px-8 py-3 text-caption font-medium text-primary transition-colors hover:bg-copper-light"
        >
          נסו שוב
        </button>
      </div>
    </section>
  );
}
