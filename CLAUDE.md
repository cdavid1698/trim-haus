# Trim Haus Gents Salon demo site

Proposal demo for Trim Haus Gents Salon ("The Filipino Barbershop"), Khalifa Street, Al Ain, UAE. Prepared by CK David.

@AGENTS.md

## Rules for this project
- Every business fact comes from `research/sources.md` (F# = fact refs). Never add a fact without a source.
- Prices come from the salon's published price list (F9). Service durations and three barber names are sample content.
- Copy and data live in `content/`. Components read from there; don't hard-code business facts in components.
- Booking logic sits behind `lib/booking.ts`. The demo hands bookings to WhatsApp (`wa.me`); nothing is stored or sent by the site.
- Design tokens are in `app/globals.css` and documented in `plan/design-plan.md`. Gold is only used on onyx backgrounds; use brass on light.
- The site is `noindex` (metadata + robots.ts) because it is a demo.
