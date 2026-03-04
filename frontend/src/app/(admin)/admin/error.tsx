"use client";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-8 text-center">
      <h1 className="text-xl font-semibold text-red-600">שגיאה</h1>
      <p className="mt-2 text-gray-600">אירעה שגיאה. אנא נסו שוב.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-4 rounded bg-copper px-6 py-2 text-sm text-white hover:bg-copper-light"
      >
        נסו שוב
      </button>
    </div>
  );
}
