import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תשלום",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
