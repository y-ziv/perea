import { connectDB } from "@/lib/mongodb";
import { Wine } from "@/models/Wine";
import { WineForm } from "@/components/admin/WineForm";
import { DeleteWineButton } from "@/components/admin/DeleteWineButton";
import { notFound } from "next/navigation";

export default async function EditWinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();
  const wine = await Wine.findOne({ slug }).lean();

  if (!wine) notFound();

  const initialData = {
    slug: wine.slug,
    name: wine.name,
    nameHe: wine.nameHe ?? "",
    winery: wine.winery,
    region: wine.region,
    country: wine.country,
    type: wine.type,
    grape: wine.grape,
    year: wine.year ? String(wine.year) : "",
    description: wine.description,
    image: wine.image,
    featured: wine.featured,
    priceAgorot: wine.priceAgorot,
    stock: wine.stock,
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading-secondary text-h3 text-copper">
          עריכת {wine.name}
        </h1>
        <DeleteWineButton slug={wine.slug} />
      </div>
      <div className="mt-8">
        <WineForm initialData={initialData} mode="edit" />
      </div>
    </div>
  );
}
