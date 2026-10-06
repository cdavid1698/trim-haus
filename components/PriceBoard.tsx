import Link from "next/link";
import { categories, saving, services, type Service } from "@/content/services";

function Row({ service, bookable }: { service: Service; bookable: boolean }) {
  const save = saving(service);
  const body = (
    <>
      <span className="flex items-baseline gap-3">
        <span className="text-lg text-tunic">{service.name}</span>
        <span className="leader" aria-hidden />
        <span className="display tabular text-2xl text-gold">
          <span className="sr-only">AED </span>
          {service.price}
        </span>
      </span>
      {(save > 0 || service.blurb) && (
        <span className="mt-0.5 block text-sm text-steel">
          {service.blurb}
          {save > 0 && `Save AED ${save} on booking separately`}
        </span>
      )}
    </>
  );
  if (!bookable) return <li className="py-2.5">{body}</li>;
  return (
    <li>
      <Link
        href={`/book?service=${service.id}`}
        className="group block rounded py-2.5 hover:bg-white/5"
      >
        {body}
      </Link>
    </li>
  );
}

/** The salon's black price list, redrawn as text. Rows link straight into booking. */
export function PriceBoard({
  ids,
  grouped = false,
  bookable = true,
}: {
  ids?: string[];
  grouped?: boolean;
  bookable?: boolean;
}) {
  const list = ids ? ids.map((id) => services.find((s) => s.id === id)).filter((s): s is Service => Boolean(s)) : services;

  return (
    <div className="on-dark rounded-lg bg-onyx px-5 py-6 ring-1 ring-gold/40 ring-offset-4 ring-offset-onyx sm:px-8 md:py-8">
      <div className="mb-4 flex items-baseline justify-between border-b border-gold/40 pb-3">
        <p className="display text-2xl text-tunic">Price list</p>
        <p className="text-sm tracking-wide text-steel">AED</p>
      </div>
      {grouped ? (
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {categories.map((c) => (
            <section key={c.id} aria-labelledby={`cat-${c.id}`}>
              <h3 id={`cat-${c.id}`} className="flex items-baseline justify-between text-gold">
                <span className="display text-xl">{c.label}</span>
                <span className="arabic text-sm text-steel" lang="ar">
                  {c.labelAr}
                </span>
              </h3>
              <ul className="mt-2">
                {list
                  .filter((s) => s.category === c.id)
                  .map((s) => (
                    <Row key={s.id} service={s} bookable={bookable} />
                  ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="grid gap-x-12 md:grid-cols-2">
          {list.map((s) => (
            <Row key={s.id} service={s} bookable={bookable} />
          ))}
        </ul>
      )}
    </div>
  );
}
