import { MapPin, Navigation, Phone } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import { OpenStatus } from "./OpenStatus";
import { WhatsAppIcon } from "./icons";

export function VisitBlock({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <section aria-labelledby="visit-heading" className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-12 md:py-20">
      <div className="md:col-span-5">
        <H id="visit-heading" className="display text-4xl md:text-5xl">
          Find us on Khalifa Street
        </H>
        <address className="mt-6 flex gap-3 text-lg not-italic leading-relaxed">
          <MapPin className="mt-1 size-5 shrink-0 text-brass" aria-hidden />
          <span>
            {site.name}
            <br />
            {site.address.street}, {site.address.district}
            <br />
            {site.address.city}, {site.address.emirate}
            <br />
            <span className="text-base text-ink-soft">Plus code {site.address.plusCode}</span>
          </span>
        </address>

        <h3 className="display mt-8 text-2xl">Opening hours</h3>
        <p className="mt-2 text-lg">{site.hours.label}</p>
        <OpenStatus className="mt-1 text-ink-soft" />
        <p className="mt-2 text-ink-soft">Walk in, or book a chair to skip the wait.</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={site.directionsUrl}
            className="inline-flex min-h-12 items-center gap-2 rounded bg-onyx px-5 font-semibold text-tunic hover:bg-onyx-2"
          >
            <Navigation className="size-4" aria-hidden />
            Get directions
          </a>
          <a href={site.phoneHref} className="inline-flex min-h-12 items-center gap-2 rounded border-2 border-onyx px-5 font-semibold">
            <Phone className="size-4" aria-hidden />
            {site.phone}
          </a>
          <a href={whatsappLink()} className="inline-flex min-h-12 items-center gap-2 rounded bg-chat px-5 font-semibold text-onyx">
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>
        </div>
      </div>

      <div className="min-h-80 overflow-hidden rounded-lg ring-1 ring-line md:col-span-7">
        <iframe
          title={`Map showing ${site.name} on ${site.address.street}, ${site.address.city}`}
          src={site.mapEmbedUrl}
          className="size-full min-h-80"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
