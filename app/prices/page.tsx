import type { Metadata } from "next";
import Link from "next/link";
import { PriceBoard } from "@/components/PriceBoard";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Prices",
  description: "Trim Haus price list in AED: haircut 25, haircut & shave 35, facial 15, colour 40, highlights 50, and combo offers from 30.",
};

export default function PricesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="max-w-2xl">
        <h1 className="display text-5xl md:text-6xl">Prices</h1>
        <p className="mt-4 text-lg text-ink-soft">
          Every service and combo, in dirhams. Tap any line to book it. You pay in the shop.
        </p>
      </div>
      <div className="mt-10">
        <PriceBoard grouped />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link href="/book" className="inline-flex min-h-12 items-center rounded bg-onyx px-6 font-semibold text-tunic hover:bg-onyx-2">
          Book a chair
        </Link>
        <a href={whatsappLink("Hi Trim Haus, I have a question about your prices.")} className="inline-flex min-h-12 items-center gap-2 rounded bg-chat px-5 font-semibold text-onyx">
          <WhatsAppIcon className="size-4" />
          Ask on WhatsApp
        </a>
      </div>
      <p className="mt-6 text-sm text-ink-soft">Prices as published on the salon&apos;s price list and may change. Ask in the shop.</p>
    </div>
  );
}
