import type { Metadata, Viewport } from "next";
import { Figtree, Marcellus, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { DemoBanner } from "@/components/DemoBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileActionBar } from "@/components/MobileActionBar";
import { BusinessJsonLd } from "@/components/JsonLd";

const marcellus = Marcellus({ variable: "--font-marcellus", subsets: ["latin"], weight: "400" });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });
const kufi = Noto_Kufi_Arabic({ variable: "--font-kufi", subsets: ["arabic"], weight: "400", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: "Trim Haus Gents Salon | The Filipino Barbershop, Al Ain",
    template: "%s | Trim Haus Gents Salon, Al Ain",
  },
  description: site.description,
  // Demo preview: keep it out of search so it doesn't compete with the business's real listings.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_AE",
    images: [{ url: "/images/shopfront.webp", width: 960, height: 432, alt: "Trim Haus Gents Salon shopfront with gold signage" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1d1d1d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AE" className={`${marcellus.variable} ${figtree.variable} ${kufi.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 bg-gold p-3 font-semibold text-onyx focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <DemoBanner />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
        <BusinessJsonLd />
      </body>
    </html>
  );
}
