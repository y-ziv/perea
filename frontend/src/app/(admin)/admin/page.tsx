import { connectDB } from "@/lib/mongodb";
import { Wine } from "@/models/Wine";
import { Order } from "@/models/Order";
import Link from "next/link";

export default async function AdminDashboard() {
  await connectDB();

  const [wineCount, orderCount, pendingOrders] = await Promise.all([
    Wine.countDocuments(),
    Order.countDocuments(),
    Order.countDocuments({ status: "PENDING" }),
  ]);

  const stats = [
    { label: "יינות", value: wineCount, href: "/admin/wines" },
    { label: "הזמנות", value: orderCount, href: "/admin/orders" },
    { label: "ממתינות", value: pendingOrders, href: "/admin/orders?status=PENDING" },
  ];

  return (
    <div>
      <h1 className="font-heading-secondary text-h3 text-copper">דשבורד</h1>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded border border-warm bg-primary p-6 transition-colors hover:border-copper"
          >
            <p className="text-caption text-cream-muted">{stat.label}</p>
            <p className="mt-2 font-heading-secondary text-h2 text-copper">
              {stat.value}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
