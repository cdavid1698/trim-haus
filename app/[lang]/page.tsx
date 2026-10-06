import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Scissors } from "lucide-react";
import { getDictionary, isLocale, localePath } from "@/content/i18n";
import { whatsappLink } from "@/content/site";
import { featuredIds } from "@/content/services";
import { barbers } from "@/content/barbers";
import { bookingMessage } from "@/lib/message";
import { OpenStatus } from "@/components/OpenStatus";
import { PriceBoard } from "@/components/PriceBoard";
import { RatingBadge, Reviews } from "@/components/Reviews";
import { VisitBlock } from "@/components/VisitBlock";
import { OffersOptIn } from "@/components/OffersOptIn";
import { WhatsAppBubble } from "@/components/WhatsAppBubble";
import { WhatsAppIcon } from "@/components/icons";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const path = (p: string) => localePath(lang, p);

  const exampleMessage = bookingMessage(
    { serviceId: "haircut-facial", barberId: "jo-mar", date: "2026-10-08", minutes: 19 * 60 + 30, name: t.home.exampleName, note: "" },
    lang,
  );

  return (
    <>
      <section className="on-dark relative bg-onyx text-tunic">
        <div className="mx-auto grid max-w-6xl md:min-h-[38rem] md:grid-cols-12">
          <div className="relative aspect-[3/2] md:order-2 md:col-span-6 md:col-start-7 md:aspect-auto">
            <Image
              src="/images/hero-night-cut.webp"
              alt={t.home.heroAlt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div className="flex flex-col justify-center px-4 py-10 md:col-span-6 md:py-16 md:pe-10">
            <p className="flex flex-wrap items-baseline gap-x-3 text-gold">
              <span className="text-lg">{t.common.tagline}</span>
              <span className="text-sm text-steel" lang={lang === "ar" ? "en" : "ar"}>
                {lang === "ar" ? "The Filipino Barbershop" : "صالون تريم هاوس للرجال"}
              </span>
            </p>
            <h1 className="display mt-4 text-5xl md:text-6xl lg:text-7xl rtl:text-[2.5rem] rtl:md:text-[2.75rem] rtl:lg:text-[3.4rem]">
              {t.home.heroTitle}
            </h1>
            <p className="mt-5 max-w-md text-lg text-tunic/85">{t.home.heroText}</p>
            <OpenStatus className="mt-5 text-steel" />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={path("/book")}
                className="inline-flex min-h-12 items-center gap-2 rounded bg-gold px-6 text-lg font-semibold text-onyx hover:bg-[#d6b264]"
              >
                <Scissors className="size-5" aria-hidden />
                {t.common.bookChair}
              </Link>
              <a href={whatsappLink()} className="inline-flex min-h-12 items-center gap-2 rounded bg-chat px-6 text-lg font-semibold text-onyx">
                <WhatsAppIcon className="size-5" />
                {t.common.whatsappUs}
              </a>
            </div>
            <div className="mt-4">
              <RatingBadge lang={lang} tone="dark" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="prices-heading" className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <h2 id="prices-heading" className="display text-4xl md:text-5xl rtl:md:text-4xl">
            {t.home.pricesTitle}
          </h2>
          <p className="mt-4 text-lg text-ink-soft">{t.home.pricesText}</p>
          <Link href={path("/prices")} className="mt-6 inline-block py-2 font-semibold text-brass underline underline-offset-4">
            {t.home.fullPrices}
          </Link>
        </div>
        <div className="md:col-span-8">
          <PriceBoard lang={lang} ids={featuredIds} />
        </div>
      </section>

      <section aria-labelledby="how-heading" className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <h2 id="how-heading" className="display text-4xl md:text-5xl">
              {t.home.howTitle}
            </h2>
            <ol className="mt-8 space-y-6">
              {t.home.steps.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="display grid size-11 shrink-0 place-items-center rounded-full border-2 border-onyx text-xl" aria-hidden>
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-xl font-semibold">{s.title}</span>
                    <span className="mt-1 block text-ink-soft">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Link href={path("/book")} className="mt-8 inline-flex min-h-12 items-center rounded bg-onyx px-6 font-semibold text-tunic hover:bg-onyx-2">
              {t.common.bookChair}
            </Link>
          </div>
          <div className="md:col-span-5">
            <WhatsAppBubble lang={lang} message={exampleMessage} caption={t.home.exampleCaption} />
          </div>
        </div>
      </section>

      <section aria-labelledby="barbers-heading" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="barbers-heading" className="display text-4xl md:text-5xl">
            {t.home.barbersTitle}
          </h2>
          <Link href={path("/barbers")} className="py-2 font-semibold text-brass underline underline-offset-4">
            {t.home.meetTeam}
          </Link>
        </div>
        <ul className="-mx-4 mt-8 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {barbers.map((b) => (
            <li key={b.id} className="w-56 shrink-0 snap-start md:w-auto">
              <Link href={`${path("/book")}?barber=${b.id}`} className="group block">
                <Image
                  src={b.image}
                  alt={b.alt[lang]}
                  width={640}
                  height={800}
                  sizes="(min-width: 768px) 280px, 224px"
                  className="aspect-[4/5] w-full rounded object-cover"
                />
                <span className="mt-3 block text-lg font-semibold group-hover:underline">{b.name[lang]}</span>
                <span className="block text-ink-soft">{b.note[lang]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="on-dark relative bg-onyx">
        <Image
          src="/images/gloved-scissor-cut.webp"
          alt={t.home.glovesAlt}
          width={1600}
          height={1067}
          sizes="100vw"
          className="h-72 w-full object-cover opacity-80 md:h-96"
        />
        <p className="display absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-8 text-3xl text-tunic md:text-5xl">{t.home.gloves}</p>
      </section>

      <Reviews lang={lang} />
      <div className="border-t border-line bg-white">
        <VisitBlock lang={lang} />
      </div>
      <OffersOptIn />
    </>
  );
}
