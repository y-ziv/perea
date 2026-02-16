import type { Metadata } from "next";
import { cormorant, inter } from "@/lib/fonts";
import { siteConfig } from "@/data/siteConfig";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.nameHe} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.nameHe}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.nameHe} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.nameHe,
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.nameHe} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.nameHe,
  description: siteConfig.description,
  url: siteConfig.url,
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.location.coordinates.lat,
    longitude: siteConfig.location.coordinates.lng,
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "גליל",
    addressCountry: "IL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${inter.variable} font-sans antialiased`}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
