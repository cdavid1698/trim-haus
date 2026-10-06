import { site } from "@/content/site";

/** HairSalon schema with verified facts only (sources.md F1, F4–F7). */
export function BusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: site.name,
    alternateName: site.nameAr,
    slogan: site.tagline,
    telephone: site.phone.replace(/\s/g, ""),
    url: site.siteUrl,
    image: `${site.siteUrl}/images/shopfront.webp`,
    sameAs: [site.facebook],
    foundingDate: String(site.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.emirate,
      addressCountry: "AE",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.lat, longitude: site.address.lng },
    openingHours: "Mo-Su 09:00-22:00",
    priceRange: "AED 10–60",
    currenciesAccepted: "AED",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
