"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/types";

export function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-warm/30">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-1"
        />
      </div>
      <div className="flex-1">
        <h4 className="text-body font-medium text-cream">{item.name}</h4>
        <p className="text-caption text-copper">
          {formatPrice(item.priceAgorot)}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.wineSlug, item.quantity - 1)}
            className="flex h-6 w-6 items-center justify-center border border-warm text-caption text-cream-muted hover:border-copper"
          >
            -
          </button>
          <span className="min-w-[1.5rem] text-center text-caption text-cream">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.wineSlug, item.quantity + 1)}
            className="flex h-6 w-6 items-center justify-center border border-warm text-caption text-cream-muted hover:border-copper"
          >
            +
          </button>
          <button
            onClick={() => removeItem(item.wineSlug)}
            className="mr-auto text-caption text-cream-muted hover:text-red-500"
            aria-label="הסר פריט"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
