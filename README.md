# Trim Haus Gents Salon — demo site

Proposal demo for Trim Haus Gents Salon, Al Ain, prepared by CK David. Bookings are simulated: the site builds a WhatsApp message to the shop and never stores or sends anything itself.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production build: `npm run build && npm start`.

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
- `research/`, `plan/`: research, sources, design plan and feature map.
- `PROPOSAL.md`: pitch notes and the list of content to confirm with the client.

## Deploy (Vercel)

```bash
npx vercel          # preview
npx vercel --prod   # production
```

Or import the GitHub repo in Vercel. Set `NEXT_PUBLIC_SITE_URL` in the project's environment variables. The site is `noindex` by design (metadata + `robots.ts`).
