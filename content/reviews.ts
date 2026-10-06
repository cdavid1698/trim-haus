// Real Google reviews, quoted verbatim (in the original English) from the salon's Google Business Profile
// (checked 6 Oct 2026, see sources.md). Dates are approximate: Google shows relative times ("4 months ago").

import type { Locale } from "./i18n";

export type Review = { author: string; text: string; when: Record<Locale, string>; platform: "Google"; source: string };

export const reviews: Review[] = [
  {
    author: "Hamza Habib",
    text: "Jo Mar is one of the best hairstylist in Al Ain for sure, especially when it comes to fades!",
    when: { en: "January 2026", ar: "يناير 2026" },
    platform: "Google",
    source: "S2",
  },
  {
    author: "herminio buen jr.",
    text: "Best Barbershop in Al Ain! Brings out the best in you!!! … Clean and professional staffs!",
    when: { en: "June 2026", ar: "يونيو 2026" },
    platform: "Google",
    source: "S2",
  },
  { author: "Jake Tejada", text: "D best👌", when: { en: "June 2026", ar: "يونيو 2026" }, platform: "Google", source: "S2" },
];
