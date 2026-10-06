import { MapPin, Navigation, Phone } from "lucide-react";
import { getDictionary, type Locale } from "@/content/i18n";
import { site, whatsappLink } from "@/content/site";
import { OpenStatus } from "./OpenStatus";
import { WhatsAppIcon } from "./icons";

export function VisitBlock({ lang, headingLevel = 2 }: { lang: Locale; headingLevel?: 1 | 2 }) {
  const t = getDictionary(lang);
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <section aria-labelledby="visit-heading" className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-12 md:py-20">
      <div className="md:col-span-5">
        <H id="visit-heading" className="display text-4xl md:text-5xl">
          {t.visit.title}
        </H>
        <address className="mt-6 flex gap-3 text-lg not-italic leading-relaxed">
          <MapPin className="mt-1 size-5 shrink-0 text-brass" aria-hidden />
          <span>
            {t.common.businessName}
            <br />
            {t.address.street}
            {t.common.sep}
            {t.address.district}
            <br />
            {t.address.city}
            <br />
            <span className="text-base text-ink-soft">
              {t.address.plusCode}: <bdi dir="ltr">{site.address.plusCode}</bdi>
            </span>
          </span>
        </address>

        <h3 className="display mt-8 text-2xl">{t.visit.hoursTitle}</h3>
        <p className="mt-2 text-lg">{t.common.hours}</p>
        <OpenStatus className="mt-1 text-ink-soft" />
        <p className="mt-2 text-ink-soft">{t.visit.walkIn}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={site.directionsUrl}
            className="inline-flex min-h-12 items-center gap-2 rounded bg-onyx px-5 font-semibold text-tunic hover:bg-onyx-2"
          >
            <Navigation className="size-4" aria-hidden />
            {t.visit.directions}
          </a>
          <a href={site.phoneHref} className="inline-flex min-h-12 items-center gap-2 rounded border-2 border-onyx px-5 font-semibold">
            <Phone className="size-4" aria-hidden />
            <span dir="ltr">{site.phone}</span>
          </a>
          <a href={whatsappLink()} className="inline-flex min-h-12 items-center gap-2 rounded bg-chat px-5 font-semibold text-onyx">
            <WhatsAppIcon className="size-4" />
            {t.common.whatsapp}
          </a>
        </div>
      </div>

      <div className="min-h-80 overflow-hidden rounded-lg ring-1 ring-line md:col-span-7">
        <iframe
          title={t.visit.mapTitle}
          src={site.mapEmbedUrl(lang)}
          className="size-full min-h-80"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
