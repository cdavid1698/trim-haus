"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./icons";

const nav = [
  { href: "/prices", label: "Prices" },
  { href: "/barbers", label: "Barbers" },
  { href: "/visit", label: "Visit" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="on-dark sticky top-0 z-40 bg-onyx text-tunic">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/images/th-monogram.webp" alt="" width={44} height={50} className="h-10 w-auto" priority />
          <span className="leading-tight">
            <span className="display block text-xl text-gold">Trim Haus</span>
            <span className="arabic block text-xs text-steel" lang="ar">
              {site.nameAr}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="rounded px-3 py-2.5 text-[0.95rem] text-tunic/85 hover:text-tunic aria-[current=page]:text-gold"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappLink()}
            className="ml-2 inline-flex items-center gap-2 rounded px-3 py-2.5 text-[0.95rem] text-tunic/85 hover:text-tunic"
          >
            <WhatsAppIcon className="size-4 text-chat" />
            WhatsApp
          </a>
          <Link href="/book" className="ml-2 rounded bg-gold px-4 py-2.5 font-semibold text-onyx hover:bg-[#d6b264]">
            Book a chair
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 ml-auto grid size-11 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-white/10 md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/book", label: "Book a chair" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
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
