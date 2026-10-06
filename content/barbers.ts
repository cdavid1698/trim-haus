// F11: four barbers appear on the salon's price list and photo shoot. Only Jo Mar is named publicly.
// The other three are shown with their real photos but placeholder labels until the owner confirms names.

export type Barber = {
  id: string;
  name: string;
  note: string;
  image: string;
  alt: string;
  source?: string;
  sample?: true;
};

export const barbers: Barber[] = [
  {
    id: "jo-mar",
    name: "Jo Mar",
    note: "Known for fades",
    image: "/images/barber-jomar.webp",
    alt: "Barber Jo Mar in the white Trim Haus tunic, holding scissors and clippers",
    source: "F11",
  },
  {
    id: "barber-a",
    name: "Barber A",
    note: "Name to confirm",
    image: "/images/barber-1.webp",
    alt: "Trim Haus barber in the white uniform with the gold TH logo",
    sample: true,
  },
  {
    id: "barber-b",
    name: "Barber B",
    note: "Name to confirm",
    image: "/images/barber-2.webp",
    alt: "Trim Haus barber in the shop",
    sample: true,
  },
  {
    id: "barber-c",
    name: "Barber C",
    note: "Name to confirm",
    image: "/images/barber-4.webp",
    alt: "Trim Haus barber smiling in the shop",
    sample: true,
  },
];

export const anyBarber = { id: "any", name: "Any barber", note: "First free chair" } as const;

export function getBarber(id: string | null | undefined): Barber | undefined {
  return barbers.find((b) => b.id === id);
}
