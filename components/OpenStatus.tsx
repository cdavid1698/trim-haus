"use client";

import { useLocalNow } from "@/lib/time";
import { formatMinutes, openStatus } from "@/lib/format";
import { useLocale } from "./LocaleProvider";

/** Live "open now" line in Al Ain time. Renders the static hours until hydrated. */
export function OpenStatus({ className = "" }: { className?: string }) {
  const { lang, t } = useLocale();
  const now = useLocalNow();
  if (!now) return <span className={className}>{t.common.hours}</span>;
  const s = openStatus(now);
  const label = s.open
    ? t.common.openUntil(formatMinutes(s.closesAt, lang))
    : t.common.closedOpens(formatMinutes(s.opensAt, lang), s.tomorrow);
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`size-2.5 rounded-full ${s.open ? "pulse-once bg-chat" : "bg-steel"}`} aria-hidden />
      {label}
    </span>
  );
}
