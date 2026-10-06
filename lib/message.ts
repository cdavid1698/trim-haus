// Builds the WhatsApp booking message. Pure, so it runs on the server (home page example) and the client (live bubble).
// Arabic messages also carry the English service and barber names, so every barber can read the request.

import { getDictionary, type Locale } from "@/content/i18n";
import { getService } from "@/content/services";
import { anyBarber, getBarber } from "@/content/barbers";
import { formatDate, formatMinutes } from "./format";

export type BookingDraft = {
  serviceId: string | null;
  barberId: string | null;
  date: string | null;
  minutes: number | null;
  name: string;
  note: string;
};

export function barberName(id: string | null, lang: Locale): string | null {
  if (!id) return null;
  if (id === anyBarber.id) return anyBarber.name[lang];
  return getBarber(id)?.name[lang] ?? null;
}

function withEnglish(ar: string | null, en: string | null): string | null {
  if (!ar) return null;
  return en && en !== ar ? `${ar} (${en})` : ar;
}

export function bookingMessage(d: BookingDraft, lang: Locale): string {
  const t = getDictionary(lang).message;
  const service = getService(d.serviceId);
  const lines = [t.greeting];
  if (service) {
    const name = lang === "ar" ? withEnglish(service.name.ar, service.name.en) : service.name.en;
    lines.push(`${t.service}: ${name} – ${getDictionary(lang).common.price(service.price)}`);
  }
  const barber = lang === "ar" ? withEnglish(barberName(d.barberId, "ar"), barberName(d.barberId, "en")) : barberName(d.barberId, "en");
  if (barber) lines.push(`${t.barber}: ${barber}`);
  if (d.date) {
    const time = d.minutes !== null ? `${lang === "ar" ? "، " : ", "}${formatMinutes(d.minutes, lang)}` : "";
    lines.push(`${t.when}: ${formatDate(d.date, lang)}${time}`);
  }
  if (d.name.trim()) lines.push(`${t.name}: ${d.name.trim()}`);
  if (d.note.trim()) lines.push(`${t.note}: ${d.note.trim()}`);
  return lines.join("\n");
}
