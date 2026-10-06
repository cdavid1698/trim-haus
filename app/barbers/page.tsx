import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { barbers } from "@/content/barbers";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Barbers",
  description: "Meet the Filipino barbers at Trim Haus Gents Salon, Al Ain, and book a chair with your favourite.",
};

export default function BarbersPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="max-w-2xl">
          <h1 className="display text-5xl md:text-6xl">Your barbers</h1>
          <p className="mt-4 text-lg text-ink-soft">
            White tunics, black gloves, and a steady hand with clippers. Book your favourite barber, or take the first free
            chair.
          </p>
        </div>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {barbers.map((b) => (
            <li key={b.id}>
              <Image src={b.image} alt={b.alt} width={640} height={800} sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw" className="aspect-[4/5] w-full rounded object-cover" />
              <h2 className="display mt-4 text-2xl">{b.name}</h2>
              <p className="text-ink-soft">{b.note}</p>
              <Link
                href={`/book?barber=${b.id}`}
                className="mt-3 inline-flex min-h-11 items-center rounded border-2 border-onyx px-4 font-semibold hover:bg-onyx hover:text-tunic"
              >
                Book with {b.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-ink-soft">Demo: barber names other than Jo Mar are placeholders until the salon confirms them.</p>
      </div>

      <section aria-labelledby="shop-heading" className="on-dark bg-onyx text-tunic">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <h2 id="shop-heading" className="display text-4xl">
              Inside the shop
            </h2>
            <p className="mt-4 text-steel">
              A bright, clean room on {site.address.street}, with the gold Trim Haus sign out front. Off the clock, the team
              plays basketball as Team Trim Haus x Primo.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:col-span-7">
            <Image
              src="/images/shop-interior.webp"
              alt="A Trim Haus barber trimming a customer's hair in the bright white shop interior"
              width={1600}
              height={1067}
              className="col-span-2 aspect-[3/2] w-full rounded object-cover"
            />
            <Image
              src="/images/window-fade.webp"
              alt="A barber finishing a fade by the shop window at night"
              width={960}
              height={640}
              className="aspect-[3/2] w-full rounded object-cover"
            />
            <Image
              src="/images/shopfront.webp"
              alt="Trim Haus Gents Salon shopfront with gold English and Arabic signage"
              width={960}
              height={432}
              className="aspect-[3/2] w-full rounded object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
