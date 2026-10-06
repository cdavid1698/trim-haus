// Business facts. Every value is from research/sources.md (F# refs) or the agency brief.

export const site = {
  name: "Trim Haus Gents Salon",
  shortName: "Trim Haus",
  nameAr: "صالون تريم هاوس للرجال", // F1
  tagline: "The Filipino Barbershop", // F2
  established: 2022, // F10
  phone: "+971 50 297 4400", // F4
  phoneHref: "tel:+971502974400",
  // Brief asks for WhatsApp; assumed to be the same mobile number (to confirm with client).
  whatsapp: "971502974400",
  facebook: "https://www.facebook.com/p/TRIM-HAUS-GENTS-SALON-100083395836190/",
  address: {
    street: "Khalifa Street", // F5
    district: "Central District (Hai Qesaidah)",
    city: "Al Ain",
    emirate: "Abu Dhabi",
    country: "United Arab Emirates",
    plusCode: "6QF6+WW Al Ain",
    lat: 24.2248061,
    lng: 55.7622703,
  },
  mapsUrl: "https://www.google.com/maps/place/TRIM+HAUS+GENTS+SALON/@24.2248061,55.7622703,17z/data=!4m6!3m5!1s0x3e8ab75da3e2023d:0x49f63aa4ed318c33!8m2!3d24.2248061!4d55.7622703",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=24.2248061,55.7622703",
  mapEmbedUrl: (lang: string) => `https://www.google.com/maps?q=24.2248061,55.7622703&z=17&hl=${lang}&output=embed`,
  timeZone: "Asia/Dubai",
  // F6: Google lists 9 am – 10 pm every day.
  hours: { open: 9 * 60, close: 22 * 60 },
  rating: { value: 4.5, count: 8, platform: "Google", checked: "October 2026" }, // F7
  agencyName: process.env.NEXT_PUBLIC_AGENCY_NAME ?? "CK David",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3462",
} as const;

export function whatsappLink(message?: string): string {
  return `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
