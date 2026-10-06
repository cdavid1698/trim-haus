"use client";

import Image from "next/image";
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
import { dateParts, formatDate, formatMinutes } from "@/lib/time";
import { useHydrated } from "@/lib/store";
import { WhatsAppBubble } from "../WhatsAppBubble";
import { WhatsAppIcon } from "../icons";

const STEPS = ["Service", "Barber", "Day & time", "Your name"] as const;

export function BookingFlow({ initialService, initialBarber }: { initialService?: string; initialBarber?: string }) {
  const hydrated = useHydrated();
  const [draft, setDraft] = useState<BookingDraft>(() => ({
    ...emptyDraft,
    serviceId: getService(initialService)?.id ?? null,
    barberId: getBarber(initialBarber)?.id ?? null,
  }));
  const [step, setStep] = useState(() => (getService(initialService) ? (getBarber(initialBarber) ? 2 : 1) : 0));
  const [sent, setSent] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
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
  const message = bookingMessage(draft);

  const canContinue = [Boolean(draft.serviceId), Boolean(draft.barberId), Boolean(draft.date && draft.minutes !== null), true][step];

  function send(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!draft.name.trim()) {
      e.preventDefault();
      setNameError("Add your name so the barber knows who's coming.");
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
            Chair requested
          </p>
          <h1 ref={headingRef} tabIndex={-1} className="display mt-3 text-4xl outline-none md:text-5xl">
            Tap send in WhatsApp, {draft.name.trim().split(" ")[0]}
          </h1>
          <p className="mt-4 max-w-prose text-lg text-ink-soft">
            Your message to {site.shortName} is open in WhatsApp. Once you send it, the shop replies to confirm your chair.
          </p>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {[
              ["Service", `${service?.name} · AED ${service?.price}`],
              ["Barber", barberName(draft.barberId)],
              ["When", `${formatDate(draft.date)}, ${formatMinutes(draft.minutes)}`],
              ["Where", `${site.address.street}, ${site.address.city}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3">
                <dt className="text-ink-soft">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={requestLink(draft)}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-12 items-center gap-2 rounded bg-chat px-5 font-semibold text-onyx"
            >
              <WhatsAppIcon className="size-4" />
              Open WhatsApp again
            </a>
            <button
              type="button"
              onClick={() => downloadIcs(draft)}
              className="inline-flex min-h-12 items-center gap-2 rounded border-2 border-onyx px-5 font-semibold"
            >
              <CalendarPlus className="size-4" aria-hidden />
              Add to calendar
            </button>
            <a href={site.phoneHref} className="inline-flex min-h-12 items-center gap-2 rounded px-3 font-semibold underline underline-offset-4">
              <Phone className="size-4" aria-hidden />
              Call the shop
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
            Book another chair
          </button>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <WhatsAppBubble message={message} caption="Demo: nothing is sent unless you tap send in WhatsApp." />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-8 pb-32 md:grid-cols-12 md:pt-12 md:pb-16">
      <div className="md:col-span-7">
        <ol className="flex gap-1.5" aria-label="Booking progress">
          {STEPS.map((label, i) => (
            <li key={label} className="flex-1">
              <button
                type="button"
                disabled={i > step}
                onClick={() => setStep(i)}
                aria-current={i === step ? "step" : undefined}
                aria-label={`Step ${i + 1}: ${label}`}
                className="group block w-full py-2 text-left disabled:cursor-default"
              >
                <span className={`block h-1 rounded-full ${i <= step ? "bg-onyx" : "bg-line"}`} />
                <span className={`mt-2 hidden text-sm sm:block ${i === step ? "font-semibold" : "text-ink-soft"}`}>
                  {i + 1}. {label}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-1 text-sm text-ink-soft sm:hidden">
          Step {step + 1} of {STEPS.length}: {STEPS[step]}
        </p>

        <div className="mt-6">
          {step === 0 && (
            <ServiceStep headingRef={headingRef} value={draft.serviceId} onChange={(id) => update({ serviceId: id, minutes: null })} />
          )}
          {step === 1 && <BarberStep headingRef={headingRef} value={draft.barberId} onChange={(id) => update({ barberId: id, minutes: null })} />}
          {step === 2 && hydrated && (
            <TimeStep
              headingRef={headingRef}
              draft={draft}
              onChange={(patch) => update(patch)}
            />
          )}
          {step === 3 && (
            <DetailsStep
              headingRef={headingRef}
              draft={draft}
              error={nameError}
              onChange={(patch) => {
                if (patch.name) setNameError(null);
                update(patch);
              }}
            />
          )}
        </div>

        {/* Mobile: show the message before sending. */}
        {step === 3 && (
          <div className="mt-8 md:hidden">
            <WhatsAppBubble message={message} />
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
                <ArrowLeft className="size-4" aria-hidden />
                Back
              </button>
            )}
            {service && (
              <p className="text-sm text-steel md:hidden">
                <span className="block font-semibold text-tunic">AED {service.price}</span>
                {service.name}
              </p>
            )}
            {step < 3 ? (
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => setStep((s) => s + 1)}
                className="ml-auto inline-flex min-h-12 items-center rounded bg-gold px-6 font-semibold text-onyx disabled:opacity-40 md:ml-0 md:bg-onyx md:text-tunic"
              >
                Continue
              </button>
            ) : (
              <a
                href={requestLink(draft)}
                target="_blank"
                rel="noopener"
                onClick={send}
                className="ml-auto inline-flex min-h-12 items-center gap-2 rounded bg-chat px-5 font-semibold text-onyx md:ml-0"
              >
                <WhatsAppIcon className="size-5" />
                Send booking on WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>

      <aside className="hidden md:col-span-5 md:block" aria-label="Your WhatsApp message">
        <div className="sticky top-24">
          <p className="mb-3 text-sm font-semibold text-ink-soft">Your message, writing itself</p>
          <WhatsAppBubble message={message} caption="You send it from your own WhatsApp. No app or account needed." />
          {service && (
            <p className="mt-4 flex items-baseline justify-between border-t-2 border-onyx pt-3">
              <span>Total, paid in the shop</span>
              <span className="display tabular text-3xl">AED {service.price}</span>
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
  const [tab, setTab] = useState<Category>(() => getService(value)?.category ?? "cuts");
  const list = useMemo(() => services.filter((s) => s.category === tab), [tab]);
  return (
    <fieldset>
      <StepHeading headingRef={headingRef}>What are you in for?</StepHeading>
      <div role="tablist" aria-label="Service type" className="mt-6 flex gap-1 overflow-x-auto border-b border-line [scrollbar-width:none]">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={tab === c.id}
            onClick={() => setTab(c.id)}
            className="min-h-11 shrink-0 border-b-3 border-transparent px-3 font-semibold text-ink-soft aria-selected:border-onyx aria-selected:text-onyx"
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-2" role="radiogroup" aria-label={categories.find((c) => c.id === tab)?.label}>
        {list.map((s) => {
          const save = saving(s);
          return (
            <label key={s.id} className={optionClass}>
              <input type="radio" name="service" checked={value === s.id} onChange={() => onChange(s.id)} className="sr-only" />
              <span className="flex-1">
                <span className="block text-lg font-semibold">{s.name}</span>
                <span className="block text-sm opacity-75">
                  About {s.minutes} min{save > 0 ? ` · save AED ${save}` : ""}
                </span>
              </span>
              <span className="display tabular text-2xl">AED {s.price}</span>
            </label>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-ink-soft">Prices from the salon&apos;s price list. Times are a guide.</p>
    </fieldset>
  );
}

function BarberStep({ headingRef, value, onChange }: { headingRef: HeadingRef; value: string | null; onChange: (id: string) => void }) {
  return (
    <fieldset>
      <StepHeading headingRef={headingRef}>Who&apos;s cutting?</StepHeading>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <label className={`${optionClass} col-span-2 sm:col-span-3`}>
          <input type="radio" name="barber" checked={value === anyBarber.id} onChange={() => onChange(anyBarber.id)} className="sr-only" />
          <span className="flex-1">
            <span className="block text-lg font-semibold">{anyBarber.name}</span>
            <span className="block text-sm opacity-75">{anyBarber.note}: most choice of times</span>
          </span>
        </label>
        {barbers.map((b) => (
          <label key={b.id} className={`${optionClass} flex-col items-stretch gap-0 overflow-hidden p-0`}>
            <input type="radio" name="barber" checked={value === b.id} onChange={() => onChange(b.id)} className="sr-only" />
            <Image src={b.image} alt="" width={320} height={400} sizes="(min-width: 640px) 200px, 45vw" className="aspect-[4/5] w-full object-cover" />
            <span className="px-3 py-2.5">
              <span className="block font-semibold">{b.name}</span>
              <span className="block text-sm opacity-75">{b.note}</span>
            </span>
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
  const dates = useMemo(() => bookableDates(), []);
  const date = draft.date ?? dates[0];
  const duration = getService(draft.serviceId)?.minutes ?? 30;
  const slots = getSlots(draft.barberId ?? anyBarber.id, date, duration);
  const open = slots.filter((s) => s.available);

  return (
    <fieldset>
      <StepHeading headingRef={headingRef}>Pick a day and time</StepHeading>
      <div className="mt-6 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2" role="radiogroup" aria-label="Day">
        {dates.map((d, i) => {
          const p = dateParts(d);
          return (
            <label key={d} className={`${optionClass} min-w-[4.5rem] shrink-0 flex-col gap-0 px-3 py-2 text-center`}>
              <input
                type="radio"
                name="date"
                checked={date === d}
                onChange={() => onChange({ date: d, minutes: null })}
                className="sr-only"
              />
              <span className="text-sm">{i === 0 ? "Today" : p.weekday}</span>
              <span className="display text-2xl">{p.day}</span>
              <span className="text-xs opacity-75">{p.month}</span>
            </label>
          );
        })}
      </div>

      <h2 className="mt-6 font-semibold">
        {formatDate(date)} with {barberName(draft.barberId)}
      </h2>
      {open.length === 0 ? (
        <p className="mt-3 rounded border border-dashed border-steel p-4 text-ink-soft">
          No chairs left on this day. Try tomorrow, or walk in: we&apos;re open until 10 pm.
        </p>
      ) : (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Time">
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
              <span className="tabular">{formatMinutes(s.minutes)}</span>
              {!s.available && <span className="sr-only"> (taken)</span>}
            </label>
          ))}
        </div>
      )}
      <p className="mt-4 text-sm text-ink-soft">Times shown in Al Ain time. Crossed-out times are taken (simulated for the demo).</p>
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
  return (
    <fieldset>
      <StepHeading headingRef={headingRef}>Who&apos;s the chair for?</StepHeading>
      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor="bk-name" className="block font-semibold">
            Your name
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
            Anything the barber should know? <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input
            id="bk-note"
            value={draft.note}
            placeholder="e.g. skin fade, keep length on top"
            onChange={(e) => onChange({ note: e.target.value })}
            className="mt-2 min-h-12 w-full rounded border-2 border-line bg-white px-4 text-lg placeholder:text-ink-soft/70 focus:border-onyx"
          />
        </div>
      </div>
      <p className="mt-5 max-w-prose text-sm text-ink-soft">
        No account and no payment: your booking goes to the shop as a WhatsApp message, and you pay in the shop. We
        don&apos;t ask for your number because WhatsApp shares it when you send.
      </p>
    </fieldset>
  );
}
