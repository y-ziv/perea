"use client";

import { useCart } from "@/context/CartContext";
import { WineCard } from "./WineCard";
import type { Wine } from "@/types";

export function WineGrid({ wines }: { wines: Wine[] }) {
  const { addItem } = useCart();

  return (
    <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
      {wines.map((wine) => (
        <WineCard
          key={wine.slug}
          slug={wine.slug}
          name={wine.name}
          winery={wine.winery}
          country={wine.country}
          grape={wine.grape}
          year={wine.year}
          description={wine.description}
          image={wine.image}
          priceAgorot={wine.priceAgorot}
          stock={wine.stock}
          onAddToCart={addItem}
        />
      ))}
    </div>
  );
}
