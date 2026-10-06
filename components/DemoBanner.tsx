"use client";

import { X } from "lucide-react";
import { site } from "@/content/site";
import { createLocalStore } from "@/lib/store";
import { useLocale } from "./LocaleProvider";

const dismissed = createLocalStore<boolean>("th-demo-dismissed", false);

export function DemoBanner() {
  const { t } = useLocale();
  const hidden = dismissed.useValue();
  if (hidden) return null;
  const demo = t.common.demo(site.agencyName);
  return (
    <div className="on-dark border-b border-white/10 bg-onyx text-sm text-steel">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4">
        <p className="flex-1 py-1.5">
          <span className="font-semibold text-tunic">{demo.strong}</span>
          {demo.rest}
        </p>
        <button
          type="button"
          onClick={() => dismissed.set(true)}
          className="-me-3 grid size-11 shrink-0 place-items-center rounded text-tunic"
          aria-label={t.common.hideDemo}
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
