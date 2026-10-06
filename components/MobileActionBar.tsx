"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Scissors } from "lucide-react";
import { stripLocale } from "@/content/i18n";
import { site, whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./icons";
import { useLocale } from "./LocaleProvider";

/** Sticky Book · WhatsApp · Call bar on phones. Hidden on /book, where the flow has its own action. */
export function MobileActionBar() {
  const { t, path } = useLocale();
  const onBook = stripLocale(usePathname()) === "/book";
  if (onBook) return null;
  return (
    <div className="on-dark fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-onyx pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="grid grid-cols-3 gap-2 p-2">
        <Link href={path("/book")} className="flex min-h-12 items-center justify-center gap-2 rounded bg-gold font-semibold text-onyx">
          <Scissors className="size-4" aria-hidden />
          {t.common.book}
        </Link>
        <a href={whatsappLink()} className="flex min-h-12 items-center justify-center gap-2 rounded bg-chat font-semibold text-onyx">
          <WhatsAppIcon className="size-4" />
          {t.common.whatsapp}
        </a>
        <a
          href={site.phoneHref}
          className="flex min-h-12 items-center justify-center gap-2 rounded border border-white/25 font-semibold text-tunic"
        >
          <Phone className="size-4" aria-hidden />
          {t.common.call}
        </a>
      </div>
    </div>
  );
}
