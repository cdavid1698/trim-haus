// Prices: salon's published price list (F9, Facebook image, c. early 2025) — confirm current prices with client.
// Durations are not published anywhere: sample values for the booking demo.

export type Category = "cuts" | "care" | "colour" | "combos";

export type Service = {
  id: string;
  name: string;
  category: Category;
  price: number; // AED
  minutes: number;
  /** For combos: the single services it bundles, used to show the saving. */
  includes?: string[];
  blurb?: string;
  source: string;
  sampleDuration: true;
};

export const categories: { id: Category; label: string; labelAr: string }[] = [
  { id: "cuts", label: "Cuts & shaves", labelAr: "قص وحلاقة" },
  { id: "care", label: "Hair & face care", labelAr: "عناية" },
  { id: "colour", label: "Hair colouring", labelAr: "صبغ" },
  { id: "combos", label: "Combo offers", labelAr: "عروض" },
];

const s = (x: Omit<Service, "source" | "sampleDuration">): Service => ({ ...x, source: "F9", sampleDuration: true });

export const services: Service[] = [
  s({ id: "haircut", name: "Haircut", category: "cuts", price: 25, minutes: 30, blurb: "Fades, shape-ups and classic cuts." }),
  s({ id: "haircut-shave", name: "Haircut & shave", category: "cuts", price: 35, minutes: 45, includes: ["haircut", "shave"] }),
  s({ id: "shave", name: "Regular shave", category: "cuts", price: 15, minutes: 20 }),
  s({ id: "facial", name: "Basic facial", category: "care", price: 15, minutes: 20 }),
  s({ id: "shampoo", name: "Shampoo", category: "care", price: 10, minutes: 10 }),
  s({ id: "scalp-massage", name: "Scalp massage", category: "care", price: 30, minutes: 20 }),
  s({ id: "hair-spa", name: "Hair spa", category: "care", price: 30, minutes: 30 }),
  s({ id: "colour", name: "Basic colour", category: "colour", price: 40, minutes: 45 }),
  s({ id: "highlights", name: "Highlights", category: "colour", price: 50, minutes: 60 }),
  s({ id: "haircut-shampoo", name: "Haircut + shampoo", category: "combos", price: 30, minutes: 40, includes: ["haircut", "shampoo"] }),
  s({ id: "haircut-facial", name: "Haircut + facial", category: "combos", price: 35, minutes: 50, includes: ["haircut", "facial"] }),
  s({ id: "haircut-facial-shampoo", name: "Haircut + facial + shampoo", category: "combos", price: 40, minutes: 60, includes: ["haircut", "facial", "shampoo"] }),
  s({ id: "haircut-colour", name: "Haircut + basic colour", category: "combos", price: 60, minutes: 75, includes: ["haircut", "colour"] }),
  s({ id: "haircut-scalp", name: "Haircut + scalp massage", category: "combos", price: 50, minutes: 50, includes: ["haircut", "scalp-massage"] }),
  s({ id: "haircut-spa", name: "Haircut + hair spa", category: "combos", price: 50, minutes: 60, includes: ["haircut", "hair-spa"] }),
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
