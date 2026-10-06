import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fontVariables } from "./fonts";
import { getDictionary, localePath } from "@/content/i18n";

// Unmatched URLs skip the [lang] layout, so this page shows both languages: Arabic first (the default), then English.

export const metadata: Metadata = {
  title: "الصفحة غير موجودة | Page not found — Trim Haus",
  robots: { index: false, follow: false },
};

const ar = getDictionary("ar");
const en = getDictionary("en");

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={`${fontVariables} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <header className="on-dark bg-onyx">
          <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/th-monogram.webp" alt="" width={44} height={50} className="h-10 w-auto" />
              <span className="display text-xl text-gold">{ar.common.brand}</span>
            </Link>
          </div>
        </header>
        <main className="mx-auto grid w-full max-w-6xl flex-1 gap-12 px-4 py-16 md:grid-cols-2">
          <section>
            <h1 className="display text-4xl md:text-5xl">{ar.notFound.title}</h1>
            <p className="mt-4 text-lg text-ink-soft">{ar.notFound.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localePath("ar", "/")} className="inline-flex min-h-12 items-center rounded bg-onyx px-6 font-semibold text-tunic">
                {ar.notFound.home}
              </Link>
              <Link href={localePath("ar", "/book")} className="inline-flex min-h-12 items-center rounded border-2 border-onyx px-6 font-semibold">
                {ar.common.bookChair}
              </Link>
            </div>
          </section>
          <section lang="en" dir="ltr" className="border-t border-line pt-10 md:border-t-0 md:border-s md:ps-12 md:pt-0">
            <h2 className="display text-4xl md:text-5xl">{en.notFound.title}</h2>
            <p className="mt-4 text-lg text-ink-soft">{en.notFound.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localePath("en", "/")} className="inline-flex min-h-12 items-center rounded bg-onyx px-6 font-semibold text-tunic">
                {en.notFound.home}
              </Link>
              <Link href={localePath("en", "/book")} className="inline-flex min-h-12 items-center rounded border-2 border-onyx px-6 font-semibold">
                {en.common.bookChair}
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
