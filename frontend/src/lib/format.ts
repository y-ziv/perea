/**
 * Format agorot (integer) as ILS string.
 * 18900 → "₪189.00"
 */
export function formatPrice(agorot: number): string {
  return `₪${(Math.round(agorot) / 100).toFixed(2)}`;
}
