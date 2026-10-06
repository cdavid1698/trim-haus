import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { VisitBlock } from "@/components/VisitBlock";
import { getDictionary, isLocale, localePath } from "@/content/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/visit">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).visit;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: localePath(lang, "/visit"), languages: { ar: "/visit", en: "/en/visit" } },
  };
}

export default async function VisitPage({ params }: PageProps<"/[lang]/visit">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang).visit;
  return (
    <>
      <VisitBlock lang={lang} headingLevel={1} />
      <section aria-labelledby="sign-heading" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 id="sign-heading" className="display text-3xl">
          {t.signTitle}
        </h2>
        <Image src="/images/shopfront.webp" alt={t.signAlt} width={960} height={432} className="mt-5 w-full rounded" />
        <p className="mt-3 text-ink-soft">{t.signNote}</p>
      </section>
    </>
  );
}
