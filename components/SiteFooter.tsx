import Image from "next/image";
import Link from "next/link";
import { getDictionary, localePath, type Locale } from "@/content/i18n";
import { site, whatsappLink } from "@/content/site";

export function SiteFooter({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  return (
    <footer className="on-dark bg-onyx pb-24 text-steel md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image src="/images/trim-haus-logo.webp" alt={t.footer.logoAlt} width={1200} height={1200} className="-ms-4 w-56" />
          <p className="mt-2 max-w-xs">{t.footer.blurb(site.established)}</p>
        </div>

        <div className="md:col-span-4">
          <h2 className="display text-xl text-tunic">{t.footer.visit}</h2>
          <address className="mt-3 not-italic leading-relaxed">
            {t.address.street}
            {t.common.sep}
            {t.address.district}
            <br />
            {t.address.city}
          </address>
          <p className="mt-3">{t.common.hours}</p>
        </div>

        <div className="md:col-span-3">
          <h2 className="display text-xl text-tunic">{t.footer.contact}</h2>
          <ul className="mt-3 space-y-1">
            <li>
              <a href={site.phoneHref} dir="ltr" className="inline-block py-1.5 text-tunic underline-offset-4 hover:underline">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} className="inline-block py-1.5 text-tunic underline-offset-4 hover:underline">
                {t.common.whatsapp}
              </a>
            </li>
            <li>
              <a href={site.facebook} className="inline-block py-1.5 text-tunic underline-offset-4 hover:underline">
                {t.footer.facebook}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-5 text-sm">
          <p>
            © {new Date().getFullYear()} {t.common.businessName}
          </p>
          <Link href={localePath(lang, "/privacy")} className="py-2 hover:text-tunic">
            {t.footer.privacy}
          </Link>
          <Link href={localePath(lang, "/terms")} className="py-2 hover:text-tunic">
            {t.footer.terms}
          </Link>
          <p className="md:ms-auto">{t.footer.demo(site.agencyName)}</p>
        </div>
      </div>
    </footer>
  );
}
