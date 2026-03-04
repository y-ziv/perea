"use client";

import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Toaster } from "sonner";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <CartProvider>
        {children}
        <CartDrawer />
        <Toaster position="top-center" richColors />
      </CartProvider>
    </ErrorBoundary>
  );
}
