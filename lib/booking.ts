"use client";

// Booking service module. The demo generates plausible availability locally and hands the
// request to WhatsApp. In the paid build, swap getSlots/requestLink for a real booking API
// (e.g. Cal.com or Fresha) and keep the UI as is.

import { site, whatsappLink } from "@/content/site";
import { getService } from "@/content/services";
import { anyBarber, barbers, getBarber } from "@/content/barbers";
import { addDays, formatDate, formatMinutes, localNow, UTC_OFFSET_MINUTES } from "./time";

export const SLOT_STEP = 30;
export const BOOKING_WINDOW_DAYS = 10;

export type Slot = { minutes: number; available: boolean };

export type BookingDraft = {
  serviceId: string | null;
  barberId: string | null;
  date: string | null;
  minutes: number | null;
  name: string;
  note: string;
};

export const emptyDraft: BookingDraft = { serviceId: null, barberId: null, date: null, minutes: null, name: "", note: "" };

export type Booking = BookingDraft & { serviceId: string; barberId: string; date: string; minutes: number };

export function barberName(id: string | null): string | null {
  if (!id) return null;
  return id === anyBarber.id ? anyBarber.name : getBarber(id)?.name ?? null;
}

export function bookableDates(): string[] {
  const today = localNow().date;
  return Array.from({ length: BOOKING_WINDOW_DAYS }, (_, i) => addDays(today, i));
}

// Deterministic hash so the same slot is always "taken" across renders.
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Start times on a date that let the service finish by closing. "Any barber" is only taken when everyone is. */
export function getSlots(barberId: string, date: string, durationMinutes: number): Slot[] {
  const { open, close } = site.hours;
  const now = localNow();
  const slots: Slot[] = [];
  for (let m = open; m + durationMinutes <= close; m += SLOT_STEP) {
    const past = date === now.date && m < now.minutes + 15;
    // Evenings after work are the busiest.
    const busyChance = m >= 18 * 60 ? 5 : 3;
    const takenFor = (id: string) => hash(`${id}|${date}|${m}`) % 10 < busyChance;
    const taken = barberId === anyBarber.id ? barbers.every((b) => takenFor(b.id)) : takenFor(barberId);
    slots.push({ minutes: m, available: !past && !taken });
  }
  return slots;
}

/** The WhatsApp message, built from whatever the customer has chosen so far. */
export function bookingMessage(d: BookingDraft): string {
  const service = getService(d.serviceId);
  const barber = barberName(d.barberId);
  const lines = ["Hi Trim Haus, I'd like to book a chair."];
  if (service) lines.push(`Service: ${service.name} (AED ${service.price})`);
  if (barber) lines.push(`Barber: ${barber}`);
  if (d.date) lines.push(`When: ${formatDate(d.date)}${d.minutes !== null ? `, ${formatMinutes(d.minutes)}` : ""}`);
  if (d.name.trim()) lines.push(`Name: ${d.name.trim()}`);
  if (d.note.trim()) lines.push(`Note: ${d.note.trim()}`);
  return lines.join("\n");
}

export function isComplete(d: BookingDraft): d is Booking {
  return Boolean(d.serviceId && d.barberId && d.date && d.minutes !== null && d.name.trim());
}

/** Demo: nothing is stored or sent. The customer sends the message from their own WhatsApp. */
export function requestLink(d: BookingDraft): string {
  return whatsappLink(bookingMessage(d));
}

function icsDate(date: string, minutes: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCMinutes(minutes - UTC_OFFSET_MINUTES);
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function icsEscape(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function bookingIcs(b: Booking): string {
  const service = getService(b.serviceId);
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Trim Haus//Booking demo//EN",
    "BEGIN:VEVENT",
    `UID:${hash(bookingMessage(b))}-${stamp}@trimhaus.demo`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${icsDate(b.date, b.minutes)}`,
    `DTEND:${icsDate(b.date, b.minutes + (service?.minutes ?? 30))}`,
    `SUMMARY:${icsEscape(`Trim Haus: ${service?.name ?? "Barber appointment"}`)}`,
    `LOCATION:${icsEscape(`${site.name}, ${site.address.street}, ${site.address.city}`)}`,
    `DESCRIPTION:${icsEscape(`Requested on WhatsApp. Running late? Call ${site.phone}.`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcs(b: Booking) {
  const blob = new Blob([bookingIcs(b)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `trim-haus-${b.date}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
