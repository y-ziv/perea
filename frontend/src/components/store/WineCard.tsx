"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

interface WineCardProps {
  slug: string;
  name: string;
  winery: string;
  country: string;
  grape: string;
  year?: number;
  description: string;
  image: string;
  priceAgorot: number;
  stock: number;
}

export function WineCard(wine: WineCardProps) {
  const { addItem } = useCart();

  const outOfStock = wine.stock <= 0;
  const noPrice = wine.priceAgorot <= 0;

  function handleAdd() {
    if (outOfStock || noPrice) return;
    addItem({
      wineSlug: wine.slug,
      quantity: 1,
      name: wine.name,
      priceAgorot: wine.priceAgorot,
      image: wine.image,
    });
  }

  return (
    <div className="group">
      <div className="relative mb-4 h-56 overflow-hidden rounded-sm sm:mb-6 sm:h-72">
        <Image
          src={wine.image}
          alt={wine.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="overline mb-1">
        {wine.country === "Greece" ? "יוון" : "ישראל"} · {wine.grape}
      </p>
      <h3 className="font-sans text-body-lg font-medium text-cream sm:text-h4">
        {wine.name}
      </h3>
      <p className="mt-1 text-caption text-cream-muted">
        {wine.winery} {wine.year && `· ${wine.year}`}
      </p>
      {!noPrice && (
        <p className="mt-1 text-body font-medium text-copper">
          {formatPrice(wine.priceAgorot)}
        </p>
      )}
      <p className="mt-2 text-body font-light leading-relaxed text-cream-muted sm:mt-3">
        {wine.description}
      </p>
      {!noPrice && (
        <button
          onClick={handleAdd}
          disabled={outOfStock}
          className="mt-3 border border-copper px-6 py-2 text-caption font-medium text-copper transition-colors hover:bg-copper hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          {outOfStock ? "אזל מהמלאי" : "הוספה לעגלה"}
        </button>
      )}
    </div>
  );
}
