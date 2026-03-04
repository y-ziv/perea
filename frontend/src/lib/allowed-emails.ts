/** Single source of truth for the admin email allowlist. */
export function getAllowedEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/** Check if an email is in the admin allowlist. Fail-closed: returns false if allowlist is empty. */
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const allowed = getAllowedEmails();
  return allowed.length > 0 && allowed.includes(email.toLowerCase());
}
