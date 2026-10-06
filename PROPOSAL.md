# Proposal: a website for Trim Haus Gents Salon

*Prepared by CK David · October 2026*

## The business, as we understand it
Trim Haus is **"The Filipino Barbershop"** on Khalifa Street in Al Ain's Central District, open since 2022 and trading every day from 9 am to 10 pm. A team of four barbers works in white mandarin-collar tunics with the gold TH monogram and black gloves. Prices are honest: AED 25 for a haircut, AED 35 for a haircut and shave, with combos from AED 30. The shop holds **4.5★ from 8 Google reviews**,. The team even plays basketball as Team Trim Haus x Primo.

## What's holding the online presence back
Evidence gathered 6 Oct 2026 (see `research/sources.md`):

1. **No website.** The Google Business Profile shows "Add website", so customers searching "barber Al Ain" land on competitors' Fresha pages.
2. **The price list is a Facebook image.** It can't be found in search, it's hard to read on a phone, and it may be out of date.
3. **Conflicting hours.** Facebook says "Always open"; Google says 9 am – 10 pm.
4. **No easy way to book.** It's call, walk in or message on Facebook. There's no WhatsApp link anywhere, although that's how Al Ain books barbers.
5. **Proof is hidden.** The Facebook page shows "Not yet rated (0 reviews)", and the 4.5★ Google rating isn't shown anywhere Trim Haus controls.
6. **A professional photo shoot is going unused.** The shoot is excellent, but there's no Instagram or site to show it.

Competitors are just as weak online. Of the listed Al Ain barbers, only Evano Spa (AED 40 haircut) offers online booking. Trim Haus can be the best-presented barber in the city for little cost.

## What the new site does
- **Book a chair in under 30 seconds:** service → barber → day & time → name. The booking turns into a **ready-made WhatsApp message** to the shop, which writes itself as you choose (the site's signature feature). The shop gets complete, consistent requests with no new software.
- **The full price list as real text**, in AED, with combos showing the saving. Every line links straight into booking.
- **Live "Open now · until 10 pm"** in Al Ain time to bring in walk-ins after work.
- **Choose your barber**: four chairs shown as Barber A–D (no names or photos in the demo, since staff may change), plus "Any barber".
- **Real Google reviews** and the 4.5★ rating next to the Book button.
- **A Visit page** with map, Plus code, directions and the gold shopfront photo, so first-timers find it.
- **A sticky mobile bar** with Book · WhatsApp · Call, because most visitors will be on a phone.
- **Arabic first, English one tap away.** The site opens in Arabic (right-to-left, Kufi headings that echo the shop sign) with a toggle to English that remembers the choice. Booking messages sent in Arabic keep the English service and barber names in brackets, so every barber can read them.
- Search-ready structure: HairSalon schema, page titles and descriptions. The demo itself is set to noindex.

## Demo vs full build
| | Demo (now) | Full build |
|---|---|---|
| Booking | Builds the WhatsApp message; slot availability is simulated | Real per-barber calendars (Cal.com/Fresha or WhatsApp Business API), no double booking, automatic reminders |
| Prices | From the published list | Owner-editable CMS |
| Language | Arabic (default) + English toggle | Native-speaker copy review, Arabic SEO, optional Filipino/Urdu |
| Reviews | 2 quoted Google reviews | Live Google rating + post-visit review request links |
| Offers list | Form only, nothing stored | WhatsApp broadcast list / loyalty stamp card |
| Gallery | Photos from Facebook | Instagram feed, before/after fades |
| Ops | — | Analytics, hosting, domain, maintenance |

## Content to confirm with the client
- **Prices:** all 15 come from a Facebook price-list image (c. early 2025). Are they current?
- **Service durations:** sample estimates only (shown as "About 30 min" etc.).
- **Barbers:** shown generically as Barber A–D with no names or photos, because the team may have changed. For the live site, confirm the current team and whether each barber wants their name and photo shown.
- **WhatsApp number:** assumed to be the same as the mobile, +971 50 297 4400.
- **Address detail:** shop/building number and parking information.
- **Hours:** Google (9 am – 10 pm daily) was used; Facebook still says "Always open".
- **Images:** all photos come from the salon's Facebook page. Written permission is needed, especially for photos where customers are visible (see `research/image-credits.md`).
- **Arabic copy:** all Arabic text was written for the demo and should be reviewed by a native speaker (ideally someone who knows how the shop talks to customers) before launch.
- **Legal pages:** templates (Arabic and English) that need review by a UAE lawyer.
- **Trade licence / legal entity:** the sign reads "Sole Proprietorship L.L.C"; we need the exact name and licence number for the footer.

## Open questions
1. Do you prefer bookings or walk-ins? Should the site push one more than the other?
2. Is there a deposit or no-show policy?
3. Which payment methods do you accept (cash, card, Apple Pay)?
4. What do the trophy and certificate on the shop wall represent? They could be used as proof.
5. Do you want an Instagram account set up alongside the site?

## Next steps
1. Walk the owner through the demo on their phone, and send a test booking to their own WhatsApp.
2. Confirm the content list above.
3. Agree on scope (WhatsApp-only booking vs a full booking system) and quote.
4. Build, connect the domain, and add the website link to the Google Business Profile and Facebook page.
