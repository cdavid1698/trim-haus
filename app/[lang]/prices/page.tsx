import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PriceBoard } from "@/components/PriceBoard";
import { WhatsAppIcon } from "@/components/icons";
import { getDictionary, isLocale, localePath } from "@/content/i18n";
import { whatsappLink } from "@/content/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/prices">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).prices;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: localePath(lang, "/prices"), languages: { ar: "/prices", en: "/en/prices" } },
  };
}

export default async function PricesPage({ params }: PageProps<"/[lang]/prices">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="max-w-2xl">
        <h1 className="display text-5xl md:text-6xl">{t.prices.title}</h1>
        <p className="mt-4 text-lg text-ink-soft">{t.prices.intro}</p>
      </div>
      <div className="mt-10">
        <PriceBoard lang={lang} grouped />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href={localePath(lang, "/book")}
          className="inline-flex min-h-12 items-center rounded bg-onyx px-6 font-semibold text-tunic hover:bg-onyx-2"
        >
          {t.common.bookChair}
        </Link>
        <a
          href={whatsappLink(t.prices.askMessage)}
          className="inline-flex min-h-12 items-center gap-2 rounded bg-chat px-5 font-semibold text-onyx"
        >
          <WhatsAppIcon className="size-4" />
          {t.prices.ask}
        </a>
      </div>
      <p className="mt-6 text-sm text-ink-soft">{t.prices.note}</p>
    </div>
  );
}
