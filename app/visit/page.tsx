import type { Metadata } from "next";
import Image from "next/image";
import { VisitBlock } from "@/components/VisitBlock";

export const metadata: Metadata = {
  title: "Visit",
  description: "Trim Haus Gents Salon is on Khalifa Street, Central District, Al Ain. Open every day 9 am – 10 pm. Directions, map and contact.",
};

export default function VisitPage() {
  return (
    <>
      <VisitBlock headingLevel={1} />
      <section aria-labelledby="sign-heading" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 id="sign-heading" className="display text-3xl">
          Look for the gold sign
        </h2>
        <Image
          src="/images/shopfront.webp"
          alt="Trim Haus Gents Salon shopfront: black fascia with gold 'Trim Haus Gents Salon' lettering in English and Arabic, glass front"
          width={960}
          height={432}
          className="mt-5 w-full rounded"
        />
        <p className="mt-3 text-ink-soft">
          Shop and building number, and parking: to be confirmed with the salon for the live site.
        </p>
      </section>
    </>
  );
}
