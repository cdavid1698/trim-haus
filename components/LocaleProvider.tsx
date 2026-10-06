"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getDictionary, localePath, type Locale } from "@/content/i18n";

const LocaleContext = createContext<Locale>("ar");

export function LocaleProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}

/** Current locale, its dictionary, and a helper for locale-aware links. */
export function useLocale() {
  const lang = useContext(LocaleContext);
  return { lang, t: getDictionary(lang), path: (p: string) => localePath(lang, p) };
}
