import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { fontVariables } from "../fonts";
import { dir, getDictionary, isLocale, localePath, locales } from "@/content/i18n";
import { site } from "@/content/site";
import { LocaleProvider } from "@/components/LocaleProvider";
import { DemoBanner } from "@/components/DemoBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileActionBar } from "@/components/MobileActionBar";
import { BusinessJsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.siteUrl),
    title: { default: t.meta.title, template: t.meta.template },
    description: t.meta.description,
    // Demo preview: keep it out of search so it doesn't compete with the business's real listings.
    robots: { index: false, follow: false },
    alternates: {
      canonical: localePath(lang, "/"),
      languages: { ar: localePath("ar", "/"), en: localePath("en", "/") },
    },
    openGraph: {
      type: "website",
      siteName: t.common.businessName,
      locale: t.meta.ogLocale,
      images: [{ url: "/images/shopfront.webp", width: 960, height: 432, alt: t.meta.ogAlt }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#1d1d1d",
};

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html lang={lang} dir={dir(lang)} className={`${fontVariables} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <LocaleProvider lang={lang}>
          <a
            href="#main"
            className="sr-only z-50 bg-gold p-3 font-semibold text-onyx focus:not-sr-only focus:fixed focus:top-2 focus:start-2"
          >
            {t.common.skip}
          </a>
          <DemoBanner />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter lang={lang} />
          <MobileActionBar />
        </LocaleProvider>
        <BusinessJsonLd />
      </body>
    </html>
  );
}
