import Image from "next/image";
import Link from "next/link";
import { Scissors } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import { featuredIds } from "@/content/services";
import { barbers } from "@/content/barbers";
import { OpenStatus } from "@/components/OpenStatus";
import { PriceBoard } from "@/components/PriceBoard";
import { RatingBadge, Reviews } from "@/components/Reviews";
import { VisitBlock } from "@/components/VisitBlock";
import { OffersOptIn } from "@/components/OffersOptIn";
import { WhatsAppBubble } from "@/components/WhatsAppBubble";
import { WhatsAppIcon } from "@/components/icons";

const exampleMessage = [
  "Hi Trim Haus, I'd like to book a chair.",
  "Service: Haircut + facial (AED 35)",
  "Barber: Jo Mar",
  "When: Thursday 9 October, 7:30 pm",
  "Name: Ahmed",
].join("\n");

const steps = [
  { title: "Pick a service", text: "Haircut, shave, facial, colour or a combo. Every price is on the page." },
  { title: "Pick your barber and time", text: "Choose your barber or the first free chair, any day from 9 am to 10 pm." },
  { title: "Send it on WhatsApp", text: "Your booking arrives as a ready-made WhatsApp message. The shop replies to confirm." },
];

export default function Home() {
  return (
    <>
      <section className="on-dark relative bg-onyx text-tunic">
        <div className="mx-auto grid max-w-6xl md:min-h-[38rem] md:grid-cols-12">
          <div className="relative aspect-[3/2] md:order-2 md:col-span-6 md:col-start-7 md:aspect-auto">
            <Image
              src="/images/hero-night-cut.webp"
              alt="A Trim Haus barber in black gloves and the white uniform cutting a customer's hair at night, a red Arabic neon sign behind"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div className="flex flex-col justify-center px-4 py-10 md:col-span-6 md:py-16 md:pr-10">
            <p className="flex flex-wrap items-baseline gap-x-3 text-gold">
              <span className="text-lg">{site.tagline}</span>
              <span className="arabic text-sm text-steel" lang="ar">
                {site.nameAr}
              </span>
            </p>
            <h1 className="display mt-4 text-5xl md:text-6xl lg:text-7xl">Sharp fades on Khalifa Street, Al Ain.</h1>
            <p className="mt-5 max-w-md text-lg text-tunic/85">
              Haircuts from AED 25, shaves, facials and colour by our Filipino barbers. Open every day until 10 pm.
            </p>
            <OpenStatus className="mt-5 text-steel" />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex min-h-12 items-center gap-2 rounded bg-gold px-6 text-lg font-semibold text-onyx hover:bg-[#d6b264]"
              >
                <Scissors className="size-5" aria-hidden />
                Book a chair
              </Link>
              <a href={whatsappLink()} className="inline-flex min-h-12 items-center gap-2 rounded bg-chat px-6 text-lg font-semibold text-onyx">
                <WhatsAppIcon className="size-5" />
                WhatsApp us
              </a>
            </div>
            <div className="mt-4">
              <RatingBadge tone="dark" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="prices-heading" className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <h2 id="prices-heading" className="display text-4xl md:text-5xl">
            Prices on the wall, and here
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            A haircut is AED 25. Add a shampoo, facial or scalp massage as a combo and pay less than booking them separately.
          </p>
          <Link href="/prices" className="mt-6 inline-block py-2 font-semibold text-brass underline underline-offset-4">
            See the full price list
          </Link>
        </div>
        <div className="md:col-span-8">
          <PriceBoard ids={featuredIds} />
        </div>
      </section>

      <section aria-labelledby="how-heading" className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <h2 id="how-heading" className="display text-4xl md:text-5xl">
              Book in three steps
            </h2>
            <ol className="mt-8 space-y-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="display grid size-11 shrink-0 place-items-center rounded-full border-2 border-onyx text-xl" aria-hidden>
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-xl font-semibold">{s.title}</span>
                    <span className="mt-1 block text-ink-soft">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Link href="/book" className="mt-8 inline-flex min-h-12 items-center rounded bg-onyx px-6 font-semibold text-tunic hover:bg-onyx-2">
              Book a chair
            </Link>
          </div>
          <div className="md:col-span-5">
            <WhatsAppBubble message={exampleMessage} caption="Example: this is what the shop receives." />
          </div>
        </div>
      </section>

      <section aria-labelledby="barbers-heading" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="barbers-heading" className="display text-4xl md:text-5xl">
            Your barbers
          </h2>
          <Link href="/barbers" className="py-2 font-semibold text-brass underline underline-offset-4">
            Meet the team
          </Link>
        </div>
        <ul className="-mx-4 mt-8 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {barbers.map((b) => (
            <li key={b.id} className="w-56 shrink-0 snap-start md:w-auto">
              <Link href={`/book?barber=${b.id}`} className="group block">
                <Image src={b.image} alt={b.alt} width={640} height={800} sizes="(min-width: 768px) 280px, 224px" className="aspect-[4/5] w-full rounded object-cover" />
                <span className="mt-3 block text-lg font-semibold group-hover:underline">{b.name}</span>
                <span className="block text-ink-soft">{b.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="on-dark relative bg-onyx">
        <Image
          src="/images/gloved-scissor-cut.webp"
          alt="Close-up of a barber in black gloves cutting with scissors and comb"
          width={1600}
          height={1067}
          sizes="100vw"
          className="h-72 w-full object-cover opacity-80 md:h-96"
        />
        <p className="display absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-8 text-3xl text-tunic md:text-5xl">
          Gloves on, every cut.
        </p>
      </section>

      <Reviews />
      <div className="border-t border-line bg-white">
        <VisitBlock />
      </div>
      <OffersOptIn />
    </>
  );
}
