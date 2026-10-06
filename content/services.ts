// Prices: salon's published price list (F9, Facebook image, c. early 2025) — confirm current prices with client.
// Durations are not published anywhere: sample values for the booking demo.

import type { Locale } from "./i18n";

export type Category = "cuts" | "care" | "colour" | "combos";
type Text = Record<Locale, string>;

export type Service = {
  id: string;
  name: Text;
  category: Category;
  price: number; // AED
  minutes: number;
  /** For combos: the single services it bundles, used to show the saving. */
  includes?: string[];
  blurb?: Text;
  source: string;
  sampleDuration: true;
};

export const categories: { id: Category; label: Text }[] = [
  { id: "cuts", label: { en: "Cuts & shaves", ar: "قص وحلاقة" } },
  { id: "care", label: { en: "Hair & face care", ar: "عناية بالشعر والبشرة" } },
  { id: "colour", label: { en: "Hair colouring", ar: "صبغ الشعر" } },
  { id: "combos", label: { en: "Combo offers", ar: "عروض مجمّعة" } },
];

const s = (x: Omit<Service, "source" | "sampleDuration">): Service => ({ ...x, source: "F9", sampleDuration: true });

export const services: Service[] = [
  s({
    id: "haircut",
    name: { en: "Haircut", ar: "قص الشعر" },
    category: "cuts",
    price: 25,
    minutes: 30,
    blurb: { en: "Fades, shape-ups and classic cuts.", ar: "تدريج (فيد)، تحديد، وقصّات كلاسيكية." },
  }),
  s({ id: "haircut-shave", name: { en: "Haircut & shave", ar: "قص الشعر وحلاقة الذقن" }, category: "cuts", price: 35, minutes: 45, includes: ["haircut", "shave"] }),
  s({ id: "shave", name: { en: "Regular shave", ar: "حلاقة ذقن عادية" }, category: "cuts", price: 15, minutes: 20 }),
  s({ id: "facial", name: { en: "Basic facial", ar: "تنظيف بشرة أساسي" }, category: "care", price: 15, minutes: 20 }),
  s({ id: "shampoo", name: { en: "Shampoo", ar: "غسيل الشعر" }, category: "care", price: 10, minutes: 10 }),
  s({ id: "scalp-massage", name: { en: "Scalp massage", ar: "مساج فروة الرأس" }, category: "care", price: 30, minutes: 20 }),
  s({ id: "hair-spa", name: { en: "Hair spa", ar: "سبا الشعر" }, category: "care", price: 30, minutes: 30 }),
  s({ id: "colour", name: { en: "Basic colour", ar: "صبغة أساسية" }, category: "colour", price: 40, minutes: 45 }),
  s({ id: "highlights", name: { en: "Highlights", ar: "هايلايت" }, category: "colour", price: 50, minutes: 60 }),
  s({ id: "haircut-shampoo", name: { en: "Haircut + shampoo", ar: "قص + غسيل الشعر" }, category: "combos", price: 30, minutes: 40, includes: ["haircut", "shampoo"] }),
  s({ id: "haircut-facial", name: { en: "Haircut + facial", ar: "قص + تنظيف بشرة" }, category: "combos", price: 35, minutes: 50, includes: ["haircut", "facial"] }),
  s({
    id: "haircut-facial-shampoo",
    name: { en: "Haircut + facial + shampoo", ar: "قص + تنظيف بشرة + غسيل" },
    category: "combos",
    price: 40,
    minutes: 60,
    includes: ["haircut", "facial", "shampoo"],
  }),
  s({ id: "haircut-colour", name: { en: "Haircut + basic colour", ar: "قص + صبغة أساسية" }, category: "combos", price: 60, minutes: 75, includes: ["haircut", "colour"] }),
  s({ id: "haircut-scalp", name: { en: "Haircut + scalp massage", ar: "قص + مساج فروة الرأس" }, category: "combos", price: 50, minutes: 50, includes: ["haircut", "scalp-massage"] }),
  s({ id: "haircut-spa", name: { en: "Haircut + hair spa", ar: "قص + سبا الشعر" }, category: "combos", price: 50, minutes: 60, includes: ["haircut", "hair-spa"] }),
];

export function getService(id: string | null | undefined): Service | undefined {
  return services.find((x) => x.id === id);
}

/** AED saved versus booking the included services one by one. */
export function saving(service: Service): number {
  if (!service.includes) return 0;
  const full = service.includes.reduce((sum, id) => sum + (getService(id)?.price ?? 0), 0);
  return Math.max(0, full - service.price);
}

/** Shown on the home page board: the services people book most often at a barber. */
export const featuredIds = ["haircut", "haircut-shave", "shave", "haircut-shampoo", "haircut-facial", "haircut-facial-shampoo"];
