import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { formatPrice } from "@/lib/format";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import { DeleteOrderButton } from "@/components/admin/DeleteOrderButton";
import { OrderSearch } from "@/components/admin/OrderSearch";
import Link from "next/link";
import { Suspense } from "react";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  await connectDB();

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (q) {
    const regex = { $regex: q, $options: "i" };
    filter.$or = [
      { orderId: regex },
      { "customer.name": regex },
      { "customer.phone": regex },
    ];
  }
  const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();

  const tabs = [
    { label: "הכל", value: "" },
    { label: "ממתינות", value: "PENDING" },
    { label: "שולמו", value: "PAID" },
    { label: "נכשלו", value: "FAILED" },
  ];

  return (
    <div>
      <h1 className="font-heading-secondary text-h3 text-copper">הזמנות</h1>

      <div className="mt-6">
        <Suspense>
          <OrderSearch />
        </Suspense>
      </div>

      <div className="mt-4 flex gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={tab.value ? `/admin/orders?status=${tab.value}` : "/admin/orders"}
            className={`rounded px-4 py-2 text-caption transition-colors ${
              (status ?? "") === tab.value
                ? "bg-copper text-primary"
                : "bg-primary text-cream hover:bg-secondary"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded border border-warm">
        <table className="w-full">
          <thead className="bg-primary">
            <tr className="text-start text-caption text-cream-muted">
              <th className="px-4 py-3 text-start">מזהה</th>
              <th className="px-4 py-3 text-start">לקוח</th>
              <th className="px-4 py-3 text-start">סכום</th>
              <th className="px-4 py-3 text-start">סטטוס</th>
              <th className="px-4 py-3 text-start">משלוח</th>
              <th className="px-4 py-3 text-start">תאריך</th>
              <th className="px-4 py-3 text-start">פעולות</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warm">
            {orders.map((order) => (
              <tr key={order.orderId} className="bg-primary hover:bg-secondary">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/${order.orderId}`}
                    className="text-body text-copper hover:underline"
                  >
                    {order.orderId.slice(0, 8)}...
                  </Link>
                </td>
                <td className="px-4 py-3 text-body text-cream">
                  {order.customer.name}
                </td>
                <td className="px-4 py-3 text-body text-cream">
                  {formatPrice(order.totalAgorot)}
                </td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 text-body text-cream">
                  {order.deliveryMethod === "pickup" ? "איסוף" : "משלוח"}
                </td>
                <td className="px-4 py-3 text-caption text-cream-muted">
                  {new Date(order.createdAt).toLocaleDateString("he-IL")}
                </td>
                <td className="px-4 py-3">
                  <DeleteOrderButton orderId={order.orderId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="p-8 text-center text-body text-cream-muted">
            אין הזמנות
          </p>
        )}
      </div>
    </div>
  );
}
