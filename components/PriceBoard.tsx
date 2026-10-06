import Link from "next/link";
import { getDictionary, localePath, type Locale } from "@/content/i18n";
import { categories, saving, services, type Service } from "@/content/services";

function Row({ service, bookable, lang }: { service: Service; bookable: boolean; lang: Locale }) {
  const t = getDictionary(lang);
  const save = saving(service);
  const body = (
    <>
      <span className="flex items-baseline gap-3">
        <span className="text-lg text-tunic">{service.name[lang]}</span>
        <span className="leader" aria-hidden />
        <span className="display tabular text-2xl text-gold">
          <span className="sr-only">{t.common.price(service.price)}</span>
          <span aria-hidden>{service.price}</span>
        </span>
      </span>
      {(save > 0 || service.blurb) && (
        <span className="mt-0.5 block text-sm text-steel">
          {service.blurb?.[lang]}
          {save > 0 && t.prices.save(save)}
        </span>
      )}
    </>
  );
  if (!bookable) return <li className="py-2.5">{body}</li>;
  return (
    <li>
      <Link href={`${localePath(lang, "/book")}?service=${service.id}`} className="group block rounded py-2.5 hover:bg-white/5">
        {body}
      </Link>
    </li>
  );
}

/** The salon's black price list, redrawn as text. Rows link straight into booking. */
export function PriceBoard({
  lang,
  ids,
  grouped = false,
  bookable = true,
}: {
  lang: Locale;
  ids?: string[];
  grouped?: boolean;
  bookable?: boolean;
}) {
  const t = getDictionary(lang);
  const list = ids ? ids.map((id) => services.find((s) => s.id === id)).filter((s): s is Service => Boolean(s)) : services;

  return (
    <div className="on-dark rounded-lg bg-onyx px-5 py-6 ring-1 ring-gold/40 ring-offset-4 ring-offset-onyx sm:px-8 md:py-8">
      <div className="mb-4 flex items-baseline justify-between border-b border-gold/40 pb-3">
        <p className="display text-2xl text-tunic">{t.prices.board}</p>
        <p className="text-sm text-steel">{t.common.currency}</p>
      </div>
      {grouped ? (
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {categories.map((c) => (
            <section key={c.id} aria-labelledby={`cat-${c.id}`}>
              <h3 id={`cat-${c.id}`} className="flex items-baseline justify-between text-gold">
                <span className="display text-xl">{c.label[lang]}</span>
                <span className="text-sm text-steel" lang={lang === "ar" ? "en" : "ar"}>
                  {c.label[lang === "ar" ? "en" : "ar"]}
                </span>
              </h3>
              <ul className="mt-2">
                {list
                  .filter((s) => s.category === c.id)
                  .map((s) => (
                    <Row key={s.id} service={s} bookable={bookable} lang={lang} />
                  ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="grid gap-x-12 md:grid-cols-2">
          {list.map((s) => (
            <Row key={s.id} service={s} bookable={bookable} lang={lang} />
          ))}
        </ul>
      )}
    </div>
  );
}
