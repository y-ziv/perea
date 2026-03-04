import { connectDB } from "@/lib/mongodb";
import { Wine } from "@/models/Wine";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import Image from "next/image";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminWinesPage() {
  await connectDB();
  const wines = await Wine.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading-secondary text-h3 text-copper">יינות</h1>
        <Link
          href="/admin/wines/new"
          className="border border-copper bg-copper px-6 py-2 text-caption font-medium text-primary transition-colors hover:bg-copper-light"
        >
          + יין חדש
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded border border-warm">
        <table className="w-full">
          <thead className="bg-primary">
            <tr className="text-start text-caption text-cream-muted">
              <th className="px-4 py-3 text-start">תמונה</th>
              <th className="px-4 py-3 text-start">שם</th>
              <th className="px-4 py-3 text-start">מחיר</th>
              <th className="px-4 py-3 text-start">מלאי</th>
              <th className="px-4 py-3 text-start">פעולות</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warm">
            {wines.map((wine) => (
              <tr key={String(wine._id)} className="bg-primary hover:bg-secondary">
                <td className="px-4 py-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded">
                    <Image
                      src={wine.image}
                      alt={wine.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-body text-cream">{wine.name}</td>
                <td className="px-4 py-3 text-body text-cream">
                  {formatPrice(wine.priceAgorot)}
                </td>
                <td className="px-4 py-3 text-body text-cream">{wine.stock}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/wines/${wine.slug}/edit`}
                      className="text-caption text-copper hover:underline"
                    >
                      עריכה
                    </Link>
                    <DeleteButton
                      endpoint={`/api/admin/wines/${wine.slug}`}
                      confirmMessage={`למחוק את ${wine.name}?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {wines.length === 0 && (
          <p className="p-8 text-center text-body text-cream-muted">
            אין יינות עדיין
          </p>
        )}
      </div>
    </div>
  );
}
