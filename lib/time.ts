"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

/** Date and time in Al Ain (Asia/Dubai, UTC+4, no daylight saving). */
export type LocalNow = { date: string; minutes: number };

export const UTC_OFFSET_MINUTES = 4 * 60;

export function localNow(at: Date = new Date()): LocalNow {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: site.timeZone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(at);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

export function formatDate(isoDate: string, style: "long" | "short" = "long"): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    weekday: style,
    day: "numeric",
    month: style,
    timeZone: "UTC",
  });
}

export function dateParts(isoDate: string): { weekday: string; day: string; month: string } {
  const d = new Date(`${isoDate}T00:00:00Z`);
  const f = (o: Intl.DateTimeFormatOptions) => d.toLocaleDateString("en-GB", { ...o, timeZone: "UTC" });
  return { weekday: f({ weekday: "short" }), day: f({ day: "numeric" }), month: f({ month: "short" }) };
}

export type OpenStatus = { open: boolean; label: string };

export function openStatus(now: LocalNow): OpenStatus {
  const { open, close } = site.hours;
  if (now.minutes >= open && now.minutes < close) {
    return { open: true, label: `Open now · until ${formatMinutes(close)}` };
  }
  return { open: false, label: `Closed · opens ${formatMinutes(open)}${now.minutes >= close ? " tomorrow" : ""}` };
}

// A minute-resolution clock shared by every component that shows live status.
let cached: LocalNow | null = null;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer) {
    timer = setInterval(() => {
      cached = localNow();
      listeners.forEach((l) => l());
    }, 30_000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

function getSnapshot(): LocalNow {
  if (!cached) cached = localNow();
  return cached;
}

/** Current Al Ain time, or null during server render and hydration. */
export function useLocalNow(): LocalNow | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
