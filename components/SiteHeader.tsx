"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { stripLocale } from "@/content/i18n";
import { site, whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./icons";
import { LanguageToggle } from "./LanguageToggle";
import { useLocale } from "./LocaleProvider";

export function SiteHeader() {
  const { lang, t, path } = useLocale();
  const current = stripLocale(usePathname());
  const [open, setOpen] = useState(false);
  const nav = [
    { href: "/prices", label: t.common.nav.prices },
    { href: "/barbers", label: t.common.nav.barbers },
    { href: "/visit", label: t.common.nav.visit },
  ];

  return (
    <header className="on-dark sticky top-0 z-40 bg-onyx text-tunic">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link href={path("/")} className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/images/th-monogram.webp" alt="" width={44} height={50} className="h-10 w-auto" priority />
          <span className="min-w-0 leading-tight">
            <span className="display block truncate text-xl text-gold">{lang === "ar" ? "تريم هاوس" : "Trim Haus"}</span>
            {lang === "ar" ? (
              <span className="block truncate text-xs text-steel" lang="en" dir="ltr">
                Trim Haus Gents Salon
              </span>
            ) : (
              <span className="arabic block truncate text-xs text-steel" lang="ar" dir="rtl">
                {site.nameAr}
              </span>
            )}
          </span>
        </Link>

        <nav aria-label={t.common.mainNav} className="ms-auto hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={path(item.href)}
              aria-current={current === item.href ? "page" : undefined}
              className="rounded px-3 py-2.5 text-[0.95rem] text-tunic/85 hover:text-tunic aria-[current=page]:text-gold"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappLink()}
            className="inline-flex items-center gap-2 rounded px-3 py-2.5 text-[0.95rem] text-tunic/85 hover:text-tunic"
          >
            <WhatsAppIcon className="size-4 text-chat" />
            {t.common.whatsapp}
          </a>
          <LanguageToggle className="ms-1" />
          <Link href={path("/book")} className="ms-2 rounded bg-gold px-4 py-2.5 font-semibold text-onyx hover:bg-[#d6b264]">
            {t.common.bookChair}
          </Link>
        </nav>

        <LanguageToggle className="ms-auto shrink-0 md:hidden" />
        <button
          type="button"
          className="-me-2 grid size-11 shrink-0 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t.common.closeMenu : t.common.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label={t.common.mainNav} className="border-t border-white/10 md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {[{ href: "/", label: t.common.nav.home }, ...nav, { href: "/book", label: t.common.bookChair }].map((item) => (
              <li key={item.href}>
                <Link
                  href={path(item.href)}
                  onClick={() => setOpen(false)}
                  aria-current={current === item.href ? "page" : undefined}
                  className="display block py-3 text-2xl aria-[current=page]:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
