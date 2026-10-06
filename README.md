# Trim Haus Gents Salon — demo site

Proposal demo for Trim Haus Gents Salon, Al Ain, prepared by CK David. Bookings are simulated: the site builds a WhatsApp message to the shop and never stores or sends anything itself.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production build: `npm run build && npm start`.

## Languages

- **Arabic is the default** and is served without a prefix (`/`, `/prices`, `/book` …), right-to-left.
- **English** lives under `/en` (`/en`, `/en/prices` …). The header toggle switches language on the same page and remembers the choice in a `th-lang` cookie.
- `proxy.ts` rewrites unprefixed URLs to `app/[lang]` with `lang=ar`, redirects `/ar/...` to the unprefixed URL, and sends visitors who chose English to `/en/...`.
- All UI copy is in `content/i18n.ts` (one dictionary per language). Service, barber and review data carry both languages in `content/`.
- Unknown URLs show the bilingual `app/global-not-found.tsx` (needs `experimental.globalNotFound`, set in `next.config.ts`).

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_AGENCY_NAME` | Preparer name in the demo banner and footer (default `CK David`) |
| `NEXT_PUBLIC_SITE_URL` | Deployment URL for metadata, sitemap and JSON-LD |

No Stripe keys are needed. The demo runs in **Mode A**, and there's no payment step because customers pay in the shop.

## Structure

- `content/`: business facts, prices, barbers and reviews. Each item references `research/sources.md` or is marked sample.
- `lib/booking.ts`: slot generation, WhatsApp message, `.ics` export. Swap this for a real booking API in the paid build.
- `components/booking/BookingFlow.tsx`: the four-step booking flow.
- `lib/message.ts`: builds the WhatsApp message. Arabic messages keep the English service and barber names in brackets so every barber can read them.
- `research/`, `plan/`: research, sources, design plan and feature map.
- `PROPOSAL.md`: pitch notes and the list of content to confirm with the client.

## Deploy (Vercel)

```bash
npx vercel          # preview
npx vercel --prod   # production
```

Or import the GitHub repo in Vercel. Set `NEXT_PUBLIC_SITE_URL` in the project's environment variables. The site is `noindex` by design (metadata + `robots.ts`).
