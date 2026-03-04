import { connectDB } from "@/lib/mongodb";
import { Order, type IOrderItem } from "@/models/Order";
import { formatPrice } from "@/lib/format";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import { orderIdSchema } from "@/lib/validations";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const parsed = orderIdSchema.safeParse(orderId);
  if (!parsed.success) notFound();
  await connectDB();
  const order = await Order.findOne({ orderId: parsed.data }).lean();

  if (!order) notFound();

  return (
    <div>
      <div className="flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="text-caption text-cream-muted hover:text-copper"
        >
          &rarr; חזרה להזמנות
        </Link>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <h1 className="font-heading-secondary text-h3 text-copper">
          הזמנה {order.orderId}
        </h1>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded border border-warm bg-primary p-6">
          <h2 className="font-heading-secondary text-h4 text-copper">
            פרטי לקוח
          </h2>
          <dl className="mt-4 space-y-2 text-body">
            <div className="flex justify-between">
              <dt className="text-cream-muted">שם</dt>
              <dd className="text-cream">{order.customer.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-cream-muted">טלפון</dt>
              <dd className="text-cream">{order.customer.phone}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-cream-muted">אימייל</dt>
              <dd className="text-cream">{order.customer.email}</dd>
            </div>
            {order.customer.address && (
              <div className="flex justify-between">
                <dt className="text-cream-muted">כתובת</dt>
                <dd className="text-cream">{order.customer.address}</dd>
              </div>
            )}
            {order.customer.notes && (
              <div className="flex justify-between">
                <dt className="text-cream-muted">הערות</dt>
                <dd className="text-cream">{order.customer.notes}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-cream-muted">משלוח</dt>
              <dd className="text-cream">
                {order.deliveryMethod === "pickup" ? "איסוף עצמי" : "משלוח"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded border border-warm bg-primary p-6">
          <h2 className="font-heading-secondary text-h4 text-copper">
            פרטי תשלום
          </h2>
          <dl className="mt-4 space-y-2 text-body">
            <div className="flex justify-between">
              <dt className="text-cream-muted">מזהה הזמנה</dt>
              <dd className="text-cream font-mono text-caption">
                {order.orderId}
              </dd>
            </div>
            {order.cardcomTransactionId && (
              <div className="flex justify-between">
                <dt className="text-cream-muted">מזהה עסקה</dt>
                <dd className="text-cream">{order.cardcomTransactionId}</dd>
              </div>
            )}
            {order.paymentVerifiedAt && (
              <div className="flex justify-between">
                <dt className="text-cream-muted">אושר ב</dt>
                <dd className="text-cream">
                  {new Date(order.paymentVerifiedAt).toLocaleString("he-IL")}
                </dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-cream-muted">נוצר ב</dt>
              <dd className="text-cream">
                {new Date(order.createdAt).toLocaleString("he-IL")}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-8 rounded border border-warm bg-primary p-6">
        <h2 className="font-heading-secondary text-h4 text-copper">פריטים</h2>
        <table className="mt-4 w-full">
          <thead>
            <tr className="text-start text-caption text-cream-muted">
              <th className="pb-2 text-start">יין</th>
              <th className="pb-2 text-start">מחיר</th>
              <th className="pb-2 text-start">כמות</th>
              <th className="pb-2 text-start">סה&quot;כ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warm">
            {order.items.map((item: IOrderItem) => (
              <tr key={item.wineSlug}>
                <td className="py-2 text-body text-cream">{item.name}</td>
                <td className="py-2 text-body text-cream">
                  {formatPrice(item.priceAgorot)}
                </td>
                <td className="py-2 text-body text-cream">{item.quantity}</td>
                <td className="py-2 text-body text-cream">
                  {formatPrice(item.priceAgorot * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-warm">
              <td
                colSpan={3}
                className="pt-3 text-body font-medium text-cream"
              >
                סה&quot;כ
              </td>
              <td className="pt-3 text-body font-medium text-copper">
                {formatPrice(order.totalAgorot)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
