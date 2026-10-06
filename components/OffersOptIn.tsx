"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import { useLocale } from "./LocaleProvider";

const UAE_MOBILE = /^(?:\+?971|0)?5\d{8}$/;

/** Demo opt-in for WhatsApp offers. Nothing is sent or stored. */
export function OffersOptIn() {
  const { t } = useLocale();
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const digits = value.replace(/[\s-]/g, "");
    if (!UAE_MOBILE.test(digits)) {
      setError(t.offers.error);
      return;
    }
    setError(null);
    setDone(true);
  }

  return (
    <section aria-labelledby={`${id}-h`} className="on-dark bg-onyx-2 text-tunic">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6">
          <h2 id={`${id}-h`} className="display text-3xl md:text-4xl">
            {t.offers.title}
          </h2>
          <p className="mt-3 max-w-prose text-steel">{t.offers.text}</p>
        </div>
        <div className="md:col-span-6">
          {done ? (
            <p className="flex items-center gap-3 text-lg" role="status">
              <Check className="size-5 text-chat" aria-hidden />
              {t.offers.done}
            </p>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="flex-1">
                <label htmlFor={`${id}-m`} className="sr-only">
                  {t.offers.label}
                </label>
                <input
                  id={`${id}-m`}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  dir="ltr"
                  placeholder={t.offers.placeholder}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? `${id}-e` : undefined}
                  className="min-h-12 w-full rounded border border-white/30 bg-onyx px-4 text-tunic placeholder:text-steel rtl:text-right"
                />
                {error && (
                  <p id={`${id}-e`} className="mt-2 text-sm text-[#ffb4a8]">
                    {error}
                  </p>
                )}
              </div>
              <button type="submit" className="min-h-12 rounded bg-gold px-5 font-semibold text-onyx hover:bg-[#d6b264]">
                {t.offers.join}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
