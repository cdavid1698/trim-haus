"use client";

import { useSyncExternalStore } from "react";
import { localNow, type LocalNow } from "./format";

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
