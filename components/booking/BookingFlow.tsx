"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, CalendarPlus, Check, Phone } from "lucide-react";
import { categories, getService, saving, services, type Category } from "@/content/services";
import { anyBarber, barbers, getBarber } from "@/content/barbers";
import { site } from "@/content/site";
import {
  barberName,
  bookableDates,
  bookingMessage,
  downloadIcs,
  emptyDraft,
  getSlots,
  isComplete,
  requestLink,
  type BookingDraft,
} from "@/lib/booking";
import { dateParts, formatDate, formatMinutes } from "@/lib/format";
import { useHydrated } from "@/lib/store";
import { useLocale } from "../LocaleProvider";
import { WhatsAppBubble } from "../WhatsAppBubble";
import { WhatsAppIcon } from "../icons";

export function BookingFlow({ initialService, initialBarber }: { initialService?: string; initialBarber?: string }) {
  const { lang, t } = useLocale();
  const b = t.book;
  const hydrated = useHydrated();
  const [draft, setDraft] = useState<BookingDraft>(() => ({
    ...emptyDraft,
    serviceId: getService(initialService)?.id ?? null,
    barberId: getBarber(initialBarber)?.id ?? null,
  }));
  const [step, setStep] = useState(() => (getService(initialService) ? (getBarber(initialBarber) ? 2 : 1) : 0));
  const [sent, setSent] = useState(false);
  const [nameError, setNameError] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, sent]);

  const update = (patch: Partial<BookingDraft>) => setDraft((d) => ({ ...d, ...patch }));
  const service = getService(draft.serviceId);
  const message = bookingMessage(draft, lang);

  const canContinue = [Boolean(draft.serviceId), Boolean(draft.barberId), Boolean(draft.date && draft.minutes !== null), true][step];

  function send(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!draft.name.trim()) {
      e.preventDefault();
      setNameError(true);
      return;
    }
    setSent(true);
  }

  if (sent && isComplete(draft)) {
    return (
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-12 md:py-14">
        <div className="md:col-span-6">
          <p className="inline-flex items-center gap-2 font-semibold text-brass">
            <Check className="size-5" aria-hidden />
            {b.requested}
          </p>
          <h1 ref={headingRef} tabIndex={-1} className="display mt-3 text-4xl outline-none md:text-5xl">
            {b.doneTitle(draft.name.trim().split(" ")[0])}
          </h1>
          <p className="mt-4 max-w-prose text-lg text-ink-soft">{b.doneText}</p>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {[
              [b.summary.service, `${service?.name[lang]} · ${t.common.price(service?.price ?? 0)}`],
              [b.summary.barber, barberName(draft.barberId, lang)],
              [b.summary.when, `${formatDate(draft.date, lang)}${t.common.sep}${formatMinutes(draft.minutes, lang)}`],
              [b.summary.where, `${t.address.street}${t.common.sep}${t.address.city}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3">
                <dt className="text-ink-soft">{k}</dt>
                <dd className="text-end font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={requestLink(draft, lang)}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-12 items-center gap-2 rounded bg-chat px-5 font-semibold text-onyx"
            >
              <WhatsAppIcon className="size-4" />
              {b.openAgain}
            </a>
            <button
              type="button"
              onClick={() => downloadIcs(draft, lang)}
              className="inline-flex min-h-12 items-center gap-2 rounded border-2 border-onyx px-5 font-semibold"
            >
              <CalendarPlus className="size-4" aria-hidden />
              {b.addCalendar}
            </button>
            <a href={site.phoneHref} className="inline-flex min-h-12 items-center gap-2 rounded px-3 font-semibold underline underline-offset-4">
              <Phone className="size-4" aria-hidden />
              {b.callShop}
            </a>
          </div>
          <button
            type="button"
            onClick={() => {
              setDraft(emptyDraft);
              setSent(false);
              setStep(0);
            }}
            className="mt-6 min-h-11 text-ink-soft underline underline-offset-4"
          >
            {b.another}
          </button>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <WhatsAppBubble lang={lang} message={message} caption={b.doneCaption} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-8 pb-32 md:grid-cols-12 md:pt-12 md:pb-16">
      <div className="md:col-span-7">
        <ol className="flex gap-1.5" aria-label={b.progress}>
          {b.steps.map((label, i) => (
            <li key={label} className="flex-1">
              <button
                type="button"
                disabled={i > step}
                onClick={() => setStep(i)}
                aria-current={i === step ? "step" : undefined}
                aria-label={b.stepAria(i + 1, label)}
                className="group block w-full py-2 text-start disabled:cursor-default"
              >
                <span className={`block h-1 rounded-full ${i <= step ? "bg-onyx" : "bg-line"}`} />
                <span className={`mt-2 hidden text-sm sm:block ${i === step ? "font-semibold" : "text-ink-soft"}`}>
                  {i + 1}. {label}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-1 text-sm text-ink-soft sm:hidden">{b.stepOf(step + 1, b.steps.length, b.steps[step])}</p>

        <div className="mt-6">
          {step === 0 && (
            <ServiceStep headingRef={headingRef} value={draft.serviceId} onChange={(id) => update({ serviceId: id, minutes: null })} />
          )}
          {step === 1 && (
            <BarberStep headingRef={headingRef} value={draft.barberId} onChange={(id) => update({ barberId: id, minutes: null })} />
          )}
          {step === 2 && hydrated && <TimeStep headingRef={headingRef} draft={draft} onChange={(patch) => update(patch)} />}
          {step === 3 && (
            <DetailsStep
              headingRef={headingRef}
              draft={draft}
              error={nameError ? b.nameError : null}
              onChange={(patch) => {
                if (patch.name) setNameError(false);
                update(patch);
              }}
            />
          )}
        </div>

        {/* Mobile: show the message before sending. */}
        {step === 3 && (
          <div className="mt-8 md:hidden">
            <WhatsAppBubble lang={lang} message={message} />
          </div>
        )}

        <div className="on-dark fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-onyx p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:static md:mt-10 md:border-0 md:bg-transparent md:p-0">
          <div className="flex items-center gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex min-h-12 items-center gap-2 rounded px-3 font-semibold text-tunic md:text-onyx"
              >
                <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
                {b.back}
              </button>
            )}
            {service && (
              <p className="text-sm text-steel md:hidden">
                <span className="block font-semibold text-tunic">{t.common.price(service.price)}</span>
                {service.name[lang]}
              </p>
            )}
            {step < 3 ? (
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => setStep((s) => s + 1)}
                className="ms-auto inline-flex min-h-12 items-center rounded bg-gold px-6 font-semibold text-onyx disabled:opacity-40 md:ms-0 md:bg-onyx md:text-tunic"
              >
                {b.continue}
              </button>
            ) : (
              <a
                href={requestLink(draft, lang)}
                target="_blank"
                rel="noopener"
                onClick={send}
                className="ms-auto inline-flex min-h-12 items-center gap-2 rounded bg-chat px-5 font-semibold text-onyx md:ms-0"
              >
                <WhatsAppIcon className="size-5" />
                {b.send}
              </a>
            )}
          </div>
        </div>
      </div>

      <aside className="hidden md:col-span-5 md:block" aria-label={b.asideLabel}>
        <div className="sticky top-24">
          <p className="mb-3 text-sm font-semibold text-ink-soft">{b.asideTitle}</p>
          <WhatsAppBubble lang={lang} message={message} caption={b.asideCaption} />
          {service && (
            <p className="mt-4 flex items-baseline justify-between border-t-2 border-onyx pt-3">
              <span>{b.total}</span>
              <span className="display tabular text-3xl">{t.common.price(service.price)}</span>
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

type HeadingRef = React.RefObject<HTMLHeadingElement | null>;

function StepHeading({ headingRef, children }: { headingRef: HeadingRef; children: React.ReactNode }) {
  return (
    <legend className="contents">
      <h1 ref={headingRef} tabIndex={-1} className="display text-4xl outline-none md:text-5xl">
        {children}
      </h1>
    </legend>
  );
}

const optionClass =
  "flex cursor-pointer items-center gap-3 rounded border-2 border-line bg-white px-4 py-3 has-[:checked]:border-onyx has-[:checked]:bg-onyx has-[:checked]:text-tunic has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brass";

function ServiceStep({ headingRef, value, onChange }: { headingRef: HeadingRef; value: string | null; onChange: (id: string) => void }) {
  const { lang, t } = useLocale();
  const [tab, setTab] = useState<Category>(() => getService(value)?.category ?? "cuts");
  const list = useMemo(() => services.filter((s) => s.category === tab), [tab]);
  return (
    <fieldset>
      <StepHeading headingRef={headingRef}>{t.book.serviceTitle}</StepHeading>
      <div role="tablist" aria-label={t.book.serviceTabs} className="mt-6 flex gap-1 overflow-x-auto border-b border-line [scrollbar-width:none]">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={tab === c.id}
            onClick={() => setTab(c.id)}
            className="min-h-11 shrink-0 border-b-3 border-transparent px-3 font-semibold text-ink-soft aria-selected:border-onyx aria-selected:text-onyx"
          >
            {c.label[lang]}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-2" role="radiogroup" aria-label={categories.find((c) => c.id === tab)?.label[lang]}>
        {list.map((s) => {
          const save = saving(s);
          return (
            <label key={s.id} className={optionClass}>
              <input type="radio" name="service" checked={value === s.id} onChange={() => onChange(s.id)} className="sr-only" />
              <span className="flex-1">
                <span className="block text-lg font-semibold">{s.name[lang]}</span>
                <span className="block text-sm opacity-75">
                  {t.book.about(s.minutes)}
                  {save > 0 ? ` · ${t.book.saveShort(save)}` : ""}
                </span>
              </span>
              <span className="display tabular text-2xl">{t.common.price(s.price)}</span>
            </label>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-ink-soft">{t.book.serviceNote}</p>
    </fieldset>
  );
}

function BarberStep({ headingRef, value, onChange }: { headingRef: HeadingRef; value: string | null; onChange: (id: string) => void }) {
  const { lang, t } = useLocale();
  return (
    <fieldset>
      <StepHeading headingRef={headingRef}>{t.book.barberTitle}</StepHeading>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <label className={`${optionClass} col-span-2`}>
          <input type="radio" name="barber" checked={value === anyBarber.id} onChange={() => onChange(anyBarber.id)} className="sr-only" />
          <span className="flex-1">
            <span className="block text-lg font-semibold">{anyBarber.name[lang]}</span>
            <span className="block text-sm opacity-75">{t.book.anyNote}</span>
          </span>
        </label>
        {barbers.map((br) => (
          <label key={br.id} className={optionClass}>
            <input type="radio" name="barber" checked={value === br.id} onChange={() => onChange(br.id)} className="sr-only" />
            <span className="display grid size-10 shrink-0 place-items-center rounded-full border-2 border-current text-xl" aria-hidden>
              {br.letter[lang]}
            </span>
            <span className="text-lg font-semibold">{br.name[lang]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function TimeStep({
  headingRef,
  draft,
  onChange,
}: {
  headingRef: HeadingRef;
  draft: BookingDraft;
  onChange: (patch: Partial<BookingDraft>) => void;
}) {
  const { lang, t } = useLocale();
  const dates = useMemo(() => bookableDates(), []);
  const date = draft.date ?? dates[0];
  const duration = getService(draft.serviceId)?.minutes ?? 30;
  const slots = getSlots(draft.barberId ?? anyBarber.id, date, duration);
  const open = slots.filter((s) => s.available);

  return (
    <fieldset>
      <StepHeading headingRef={headingRef}>{t.book.timeTitle}</StepHeading>
      <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:thin]" role="radiogroup" aria-label={t.book.day}>
        {dates.map((d, i) => {
          const p = dateParts(d, lang);
          return (
            <label key={d} className={`${optionClass} min-w-[4.5rem] shrink-0 flex-col gap-0 px-3 py-2 text-center`}>
              <input type="radio" name="date" checked={date === d} onChange={() => onChange({ date: d, minutes: null })} className="sr-only" />
              <span className="text-sm">{i === 0 ? t.book.today : p.weekday}</span>
              <span className="display text-2xl">{p.day}</span>
              <span className="text-xs opacity-75">{p.month}</span>
            </label>
          );
        })}
      </div>

      <h2 className="mt-6 font-semibold">{t.book.withBarber(formatDate(date, lang), barberName(draft.barberId, lang) ?? "")}</h2>
      {open.length === 0 ? (
        <p className="mt-3 rounded border border-dashed border-steel p-4 text-ink-soft">{t.book.noSlots}</p>
      ) : (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4" role="radiogroup" aria-label={t.book.time}>
          {slots.map((s) => (
            <label
              key={s.minutes}
              className={`${optionClass} justify-center px-2 py-2.5 has-[:disabled]:cursor-not-allowed has-[:disabled]:border-transparent has-[:disabled]:bg-transparent has-[:disabled]:text-ink-soft/60 has-[:disabled]:line-through`}
            >
              <input
                type="radio"
                name="time"
                disabled={!s.available}
                checked={draft.date === date && draft.minutes === s.minutes}
                onChange={() => onChange({ date, minutes: s.minutes })}
                className="sr-only"
              />
              <span className="tabular">{formatMinutes(s.minutes, lang)}</span>
              {!s.available && <span className="sr-only">{t.book.taken}</span>}
            </label>
          ))}
        </div>
      )}
      <p className="mt-4 text-sm text-ink-soft">{t.book.timeNote}</p>
    </fieldset>
  );
}

function DetailsStep({
  headingRef,
  draft,
  error,
  onChange,
}: {
  headingRef: HeadingRef;
  draft: BookingDraft;
  error: string | null;
  onChange: (patch: Partial<BookingDraft>) => void;
}) {
  const { t } = useLocale();
  return (
    <fieldset>
      <StepHeading headingRef={headingRef}>{t.book.detailsTitle}</StepHeading>
      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor="bk-name" className="block font-semibold">
            {t.book.nameLabel}
          </label>
          <input
            id="bk-name"
            autoComplete="name"
            value={draft.name}
            onChange={(e) => onChange({ name: e.target.value })}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "bk-name-error" : undefined}
            className="mt-2 min-h-12 w-full rounded border-2 border-line bg-white px-4 text-lg focus:border-onyx"
          />
          {error && (
            <p id="bk-name-error" className="mt-2 text-sm font-semibold text-[#a3261b]">
              {error}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="bk-note" className="block font-semibold">
            {t.book.noteLabel} <span className="font-normal text-ink-soft">{t.book.optional}</span>
          </label>
          <input
            id="bk-note"
            value={draft.note}
            placeholder={t.book.notePlaceholder}
            onChange={(e) => onChange({ note: e.target.value })}
            className="mt-2 min-h-12 w-full rounded border-2 border-line bg-white px-4 text-lg placeholder:text-ink-soft/70 focus:border-onyx"
          />
        </div>
      </div>
      <p className="mt-5 max-w-prose text-sm text-ink-soft">{t.book.detailsNote}</p>
    </fieldset>
  );
}
