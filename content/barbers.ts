// F11: four barbers appear on the salon's price list and photo shoot. Only Jo Mar is named publicly.
// The other three are shown with their real photos but placeholder labels until the owner confirms names.

import type { Locale } from "./i18n";

type Text = Record<Locale, string>;

export type Barber = {
  id: string;
  name: Text;
  note: Text;
  image: string;
  alt: Text;
  source?: string;
  sample?: true;
};

const placeholderNote: Text = { en: "Name to confirm", ar: "الاسم قيد التأكيد" };

export const barbers: Barber[] = [
  {
    id: "jo-mar",
    name: { en: "Jo Mar", ar: "جو مار" },
    note: { en: "Known for fades", ar: "معروف بإتقان التدريج" },
    image: "/images/barber-jomar.webp",
    alt: {
      en: "Barber Jo Mar in the white Trim Haus tunic, holding scissors and clippers",
      ar: "الحلاق جو مار بزي تريم هاوس الأبيض ممسكًا بالمقص وماكينة الحلاقة",
    },
    source: "F11",
  },
  {
    id: "barber-a",
    name: { en: "Barber A", ar: "الحلاق أ" },
    note: placeholderNote,
    image: "/images/barber-1.webp",
    alt: { en: "Trim Haus barber in the white uniform with the gold TH logo", ar: "حلاق من تريم هاوس بالزي الأبيض وشعار TH الذهبي" },
    sample: true,
  },
  {
    id: "barber-b",
    name: { en: "Barber B", ar: "الحلاق ب" },
    note: placeholderNote,
    image: "/images/barber-2.webp",
    alt: { en: "Trim Haus barber in the shop", ar: "حلاق من تريم هاوس داخل المحل" },
    sample: true,
  },
  {
    id: "barber-c",
    name: { en: "Barber C", ar: "الحلاق ج" },
    note: placeholderNote,
    image: "/images/barber-4.webp",
    alt: { en: "Trim Haus barber smiling in the shop", ar: "حلاق من تريم هاوس يبتسم داخل المحل" },
    sample: true,
  },
];

export const anyBarber = {
  id: "any",
  name: { en: "Any barber", ar: "أي حلاق" } as Text,
} as const;

export function getBarber(id: string | null | undefined): Barber | undefined {
  return barbers.find((b) => b.id === id);
}
