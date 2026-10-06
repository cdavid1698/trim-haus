// Barbers are shown generically (no photos, no names) because staff may change.
// The salon's price list and photo shoot show a team of four (F11), so the demo offers four chairs.
// The live site can add real names and photos once the owner confirms who is on the team.

import type { Locale } from "./i18n";

type Text = Record<Locale, string>;

export type Barber = {
  id: string;
  name: Text;
  /** Letter shown on the card tile in place of a photo. */
  letter: Text;
  sample: true;
};

const barber = (id: string, en: string, ar: string): Barber => ({
  id,
  name: { en: `Barber ${en}`, ar: `الحلاق ${ar}` },
  letter: { en, ar },
  sample: true,
});

export const barbers: Barber[] = [barber("barber-a", "A", "أ"), barber("barber-b", "B", "ب"), barber("barber-c", "C", "ج"), barber("barber-d", "D", "د")];

export const anyBarber = {
  id: "any",
  name: { en: "Any barber", ar: "أي حلاق" } as Text,
} as const;

export function getBarber(id: string | null | undefined): Barber | undefined {
  return barbers.find((b) => b.id === id);
}
