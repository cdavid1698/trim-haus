import { Star } from "lucide-react";
import { getDictionary, type Locale } from "@/content/i18n";
import { reviews } from "@/content/reviews";
import { site } from "@/content/site";

export function RatingBadge({ lang, tone = "light" }: { lang: Locale; tone?: "light" | "dark" }) {
  const r = getDictionary(lang).common.rating(site.rating.value, site.rating.count);
  return (
    <a
      href={site.mapsUrl}
      className={`inline-flex items-center gap-2 py-2 underline-offset-4 hover:underline ${tone === "dark" ? "text-tunic" : "text-onyx"}`}
    >
      <Star className={`size-4 fill-current ${tone === "dark" ? "text-gold" : "text-brass"}`} aria-hidden />
      <span>
        <strong className="font-semibold">{r.value}</strong>
        {r.rest}
      </span>
    </a>
  );
}

export function Reviews({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).reviews;
  return (
    <section aria-labelledby="reviews-heading" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="reviews-heading" className="display text-4xl md:text-5xl">
          {t.title}
        </h2>
        <RatingBadge lang={lang} />
      </div>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {reviews.map((r) => (
          <li key={r.author} className="border-t-2 border-onyx pt-5">
            {/* Quotes stay in the reviewer's own words (English). */}
            <blockquote lang="en" dir="ltr" className="font-display text-2xl leading-snug">
              “{r.text}”
            </blockquote>
            <p className="mt-4 text-sm text-ink-soft">
              <bdi>{r.author}</bdi> · {t.meta(r.when[lang])}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-ink-soft">{t.note}</p>
    </section>
  );
}
