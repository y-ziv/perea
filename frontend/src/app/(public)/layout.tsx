import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers/Providers";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </Providers>
  );
}
