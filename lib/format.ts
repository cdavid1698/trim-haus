// Pure date/time helpers, safe on server and client. Al Ain is Asia/Dubai (UTC+4, no daylight saving).

import { site } from "@/content/site";
import type { Locale } from "@/content/i18n";

export type LocalNow = { date: string; minutes: number };

export const UTC_OFFSET_MINUTES = 4 * 60;

export function localNow(at: Date = new Date()): LocalNow {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: site.timeZone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(at);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function formatMinutes(minutes: number, lang: Locale): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const time = m === 0 ? `${h12}` : `${h12}:${m.toString().padStart(2, "0")}`;
  if (lang === "ar") return `${time} ${h >= 12 ? "م" : "ص"}`;
  return `${time} ${h >= 12 ? "pm" : "am"}`;
}

// Arabic uses Western digits, as is usual on UAE signage and price lists.
const dateLocale: Record<Locale, string> = { ar: "ar-AE-u-nu-latn", en: "en-GB" };

export function formatDate(isoDate: string, lang: Locale): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString(dateLocale[lang], {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

export function dateParts(isoDate: string, lang: Locale): { weekday: string; day: string; month: string } {
  const d = new Date(`${isoDate}T00:00:00Z`);
  const f = (o: Intl.DateTimeFormatOptions) => d.toLocaleDateString(dateLocale[lang], { ...o, timeZone: "UTC" });
  return { weekday: f({ weekday: "short" }), day: f({ day: "numeric" }), month: f({ month: "short" }) };
}

export type OpenStatus = { open: boolean; closesAt: number; opensAt: number; tomorrow: boolean };

export function openStatus(now: LocalNow): OpenStatus {
  const { open, close } = site.hours;
  return {
    open: now.minutes >= open && now.minutes < close,
    closesAt: close,
    opensAt: open,
    tomorrow: now.minutes >= close,
  };
}
