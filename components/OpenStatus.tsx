"use client";

import { openStatus, useLocalNow } from "@/lib/time";
import { site } from "@/content/site";

/** Live "open now" line in Al Ain time. Renders the static hours until hydrated. */
export function OpenStatus({ className = "" }: { className?: string }) {
  const now = useLocalNow();
  if (!now) return <span className={className}>{site.hours.label}</span>;
  const status = openStatus(now);
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`size-2.5 rounded-full ${status.open ? "pulse-once bg-chat" : "bg-steel"}`}
        aria-hidden
      />
      {status.label}
    </span>
  );
}
