const statusConfig = {
  PENDING: { label: "ממתינה", className: "bg-yellow-100 text-yellow-800" },
  PAID: { label: "שולמה", className: "bg-green-100 text-green-800" },
  FAILED: { label: "נכשלה", className: "bg-red-100 text-red-800" },
};

export function OrderStatusBadge({ status }: { status: string }) {
  const config = statusConfig[status as keyof typeof statusConfig] ?? {
    label: status,
    className: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
