import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <h1 className="display text-5xl">{title}</h1>
      <p className="mt-4 rounded border border-dashed border-steel p-4 text-ink-soft">
        Template for the demo. This page needs review by a UAE lawyer before the site goes live.
      </p>
      <div className="mt-8 space-y-4 text-lg leading-relaxed [&_h2]:font-display [&_h2]:pt-4 [&_h2]:text-2xl">{children}</div>
    </div>
  );
}
