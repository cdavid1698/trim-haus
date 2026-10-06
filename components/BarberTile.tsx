import type { Barber } from "@/content/barbers";
import type { Locale } from "@/content/i18n";

/** Placeholder tile in place of a barber photo: the chair letter in gold on onyx, like the shop sign. */
export function BarberTile({ barber, lang, className = "" }: { barber: Barber; lang: Locale; className?: string }) {
  return (
    <span aria-hidden className={`on-dark grid place-items-center rounded bg-onyx ring-1 ring-gold/40 ring-inset ${className}`}>
      <span className="display text-6xl text-gold">{barber.letter[lang]}</span>
    </span>
  );
}
