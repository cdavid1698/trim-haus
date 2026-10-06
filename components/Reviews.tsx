import { Star } from "lucide-react";
import { reviews } from "@/content/reviews";
import { site } from "@/content/site";

export function RatingBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <a
      href={site.mapsUrl}
      className={`inline-flex items-center gap-2 py-2 underline-offset-4 hover:underline ${tone === "dark" ? "text-tunic" : "text-onyx"}`}
    >
      <Star className={`size-4 fill-current ${tone === "dark" ? "text-gold" : "text-brass"}`} aria-hidden />
      <span>
        <strong className="font-semibold">{site.rating.value}</strong> on {site.rating.platform} · {site.rating.count} reviews
      </span>
    </a>
  );
}

export function Reviews() {
  return (
    <section aria-labelledby="reviews-heading" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="reviews-heading" className="display text-4xl md:text-5xl">
          What customers say
        </h2>
        <RatingBadge />
      </div>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <li key={r.author} className="border-t-2 border-onyx pt-5">
            <blockquote className="display text-2xl leading-snug">“{r.text}”</blockquote>
            <p className="mt-4 text-sm text-ink-soft">
              {r.author} · {r.platform} review, {r.when}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-ink-soft">
        Quoted from {site.name}&apos;s public Google reviews (checked {site.rating.checked}).
      </p>
    </section>
  );
}
