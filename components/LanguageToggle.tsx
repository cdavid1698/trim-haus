"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { LANG_COOKIE, localePath, stripLocale, type Locale } from "@/content/i18n";
import { useLocale } from "./LocaleProvider";

/** Switches between Arabic (default, no prefix) and English (/en), keeping the current page and query. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { t } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const target = t.common.switchLang as Locale;
  const href = localePath(target, stripLocale(pathname));

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={t.common.switchAria}
      onClick={(e) => {
        e.preventDefault();
        // Remember the choice so "/" opens in the same language next time (read by proxy.ts).
        document.cookie = `${LANG_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
        router.push(`${href}${window.location.search}`);
      }}
      className={`inline-flex min-h-11 items-center gap-2 rounded border border-white/25 px-3 text-[0.95rem] text-tunic hover:border-gold ${className}`}
    >
      <Languages className="size-4 text-gold" aria-hidden />
      <span className={target === "ar" ? "arabic" : undefined}>{t.common.switchLabel}</span>
    </a>
  );
}
