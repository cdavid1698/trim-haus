import type { MetadataRoute } from "next";
import { localePath } from "@/content/i18n";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/book", "/prices", "/barbers", "/visit", "/privacy", "/terms"];
  return routes.map((r) => ({
    url: `${site.siteUrl}${localePath("ar", r)}`,
    changeFrequency: "monthly" as const,
    priority: r === "/" ? 1 : 0.7,
    alternates: {
      languages: {
        ar: `${site.siteUrl}${localePath("ar", r)}`,
        en: `${site.siteUrl}${localePath("en", r)}`,
      },
    },
  }));
}
