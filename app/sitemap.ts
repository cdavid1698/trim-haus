import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/book", "/prices", "/barbers", "/visit", "/privacy", "/terms"];
  return routes.map((r) => ({ url: `${site.siteUrl}${r}`, changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.7 }));
}
