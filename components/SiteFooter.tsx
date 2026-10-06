import Image from "next/image";
import Link from "next/link";
import { site, whatsappLink } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-onyx pb-24 text-steel md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image
            src="/images/trim-haus-logo.webp"
            alt="Trim Haus Gents Salon logo, est. 2022"
            width={1200}
            height={1200}
            className="-ml-4 w-56"
          />
          <p className="mt-2 max-w-xs">{site.tagline} on Khalifa Street, Al Ain, since {site.established}.</p>
        </div>

        <div className="md:col-span-4">
          <h2 className="display text-xl text-tunic">Visit</h2>
          <address className="mt-3 not-italic leading-relaxed">
            {site.address.street}, {site.address.district}
            <br />
            {site.address.city}, {site.address.emirate}
          </address>
          <p className="mt-3">{site.hours.label}</p>
        </div>

        <div className="md:col-span-3">
          <h2 className="display text-xl text-tunic">Contact</h2>
          <ul className="mt-3 space-y-1">
            <li>
              <a href={site.phoneHref} className="inline-block py-1.5 text-tunic underline-offset-4 hover:underline">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} className="inline-block py-1.5 text-tunic underline-offset-4 hover:underline">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={site.facebook} className="inline-block py-1.5 text-tunic underline-offset-4 hover:underline">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-5 text-sm">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <Link href="/privacy" className="py-2 hover:text-tunic">
            Privacy
          </Link>
          <Link href="/terms" className="py-2 hover:text-tunic">
            Terms
          </Link>
          <p className="md:ml-auto">
            Demo preview by {site.agencyName}. Bookings are simulated.
          </p>
        </div>
      </div>
    </footer>
  );
}
