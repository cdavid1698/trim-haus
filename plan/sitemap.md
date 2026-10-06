# Sitemap

Nav (4 + button): **Prices · Barbers · Visit · WhatsApp** + primary **Book a chair**. Mobile: sticky bottom bar **Book · WhatsApp · Call**.

| Route | Purpose | Primary CTA | Key blocks |
|---|---|---|---|
| `/` Home | Show who they are and get a booking in ≤2 taps | Book a chair | Hero (shopfront/barber photo, "The Filipino Barbershop", open-now status, Book + WhatsApp, rating) · Price board preview (top 6 + "full price list") · How booking works (3 real steps) · Barbers strip · Real Google reviews · Visit (map, hours, directions) · Offers-on-WhatsApp opt-in |
| `/prices` | Full price list as text | Book this (per row → `/book?service=`) | Cuts & shaves · Care · Colour · Combos with saving · note "Prices from salon's published list — confirm in shop" |
| `/barbers` | Meet the team | Book with [barber] | Team photo grid (Jo Mar + 3 sample names) · "Any available barber" option · shop photos |
| `/book` | Conversion flow | Send booking on WhatsApp | Step 1 service · Step 2 barber · Step 3 day & time · Step 4 name/phone → confirmation with WhatsApp send, add to calendar, call |
| `/visit` | Find the shop | Get directions | Map embed, address, Plus code, hours table, call/WhatsApp, parking note (to confirm) |
| `/privacy`, `/terms` | Templated legal, marked "needs legal review" | — | — |

System: `sitemap.ts`, `robots.ts` (noindex demo), favicon from the TH monogram, OG image.
