/** Single source of truth for the admin email allowlist. */
let cached: string[] | null = null;

export function getAllowedEmails(): string[] {
  if (cached) return cached;
  cached = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return cached;
}
