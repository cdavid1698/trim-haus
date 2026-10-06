import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { getDictionary, isLocale, localePath } from "@/content/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/book">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).book;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: localePath(lang, "/book"), languages: { ar: "/book", en: "/en/book" } },
  };
}

export default async function BookPage({ params, searchParams }: PageProps<"/[lang]/book">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const query = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  // Keyed by query so arriving from another "Book this" link starts the flow afresh.
  return (
    <BookingFlow
      key={`${one(query.service)}|${one(query.barber)}`}
      initialService={one(query.service)}
      initialBarber={one(query.barber)}
    />
  );
}
