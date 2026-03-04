"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (wineSlug: string) => void;
  updateQuantity: (wineSlug: string, quantity: number) => void;
  clearCart: () => void;
  totalAgorot: number;
  totalItems: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = "perea-cart";

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item: unknown): item is CartItem => {
        if (typeof item !== "object" || item === null) return false;
        const o = item as Record<string, unknown>;
        return (
          typeof o.wineSlug === "string" &&
          typeof o.name === "string" &&
          typeof o.image === "string" &&
          typeof o.quantity === "number" && Number.isFinite(o.quantity) && o.quantity > 0 &&
          typeof o.priceAgorot === "number" && Number.isFinite(o.priceAgorot) && o.priceAgorot > 0 &&
          typeof o.stock === "number"
        );
      }
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load cart from localStorage after hydration to avoid SSR mismatch
  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.wineSlug === item.wineSlug);
      if (existing) {
        const newQty = Math.min(existing.quantity + item.quantity, item.stock);
        return prev.map((i) =>
          i.wineSlug === item.wineSlug ? { ...i, quantity: newQty } : i
        );
      }
      return [...prev, { ...item, quantity: Math.min(item.quantity, item.stock) }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((wineSlug: string) => {
    setItems((prev) => prev.filter((i) => i.wineSlug !== wineSlug));
  }, []);

  const updateQuantity = useCallback(
    (wineSlug: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(wineSlug);
        return;
      }
      setItems((prev) =>
        prev.map((i) => {
          if (i.wineSlug !== wineSlug) return i;
          return { ...i, quantity: Math.min(quantity, i.stock) };
        })
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setIsOpen(false);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalAgorot = useMemo(
    () => items.reduce((sum, item) => sum + item.priceAgorot * item.quantity, 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalAgorot,
      totalItems,
      isOpen,
      openCart,
      closeCart,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalAgorot, totalItems, isOpen, openCart, closeCart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
