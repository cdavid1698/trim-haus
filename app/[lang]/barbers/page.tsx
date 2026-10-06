import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { barbers } from "@/content/barbers";
import { BarberTile } from "@/components/BarberTile";
import { getDictionary, isLocale, localePath } from "@/content/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/barbers">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).barbers;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: localePath(lang, "/barbers"), languages: { ar: "/barbers", en: "/en/barbers" } },
  };
}

export default async function BarbersPage({ params }: PageProps<"/[lang]/barbers">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang).barbers;
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="max-w-2xl">
          <h1 className="display text-5xl md:text-6xl">{t.title}</h1>
          <p className="mt-4 text-lg text-ink-soft">{t.intro}</p>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {barbers.map((b) => (
            <li key={b.id}>
              <BarberTile barber={b} lang={lang} className="aspect-square w-full" />
              <h2 className="display mt-4 text-2xl">{b.name[lang]}</h2>
              <Link
                href={`${localePath(lang, "/book")}?barber=${b.id}`}
                className="mt-3 inline-flex min-h-11 items-center rounded border-2 border-onyx px-4 font-semibold hover:bg-onyx hover:text-tunic"
              >
                {t.bookWith(b.name[lang])}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-ink-soft">{t.note}</p>
      </div>

      <section aria-labelledby="shop-heading" className="on-dark bg-onyx text-tunic">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <h2 id="shop-heading" className="display text-4xl">
              {t.shopTitle}
            </h2>
            <p className="mt-4 text-steel">{t.shopText}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:col-span-7">
            <Image
              src="/images/shop-interior.webp"
              alt={t.interiorAlt}
              width={1600}
              height={1067}
              sizes="(min-width: 768px) 640px, 100vw"
              className="col-span-2 aspect-[3/2] w-full rounded object-cover"
            />
            <Image
              src="/images/window-fade.webp"
              alt={t.windowAlt}
              width={960}
              height={640}
              sizes="(min-width: 768px) 320px, 50vw"
              className="aspect-[3/2] w-full rounded object-cover"
            />
            <Image
              src="/images/shopfront.webp"
              alt={t.shopfrontAlt}
              width={960}
              height={432}
              sizes="(min-width: 768px) 320px, 50vw"
              className="aspect-[3/2] w-full rounded object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
