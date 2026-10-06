# Design plan — Trim Haus Gents Salon

## 0. Grounding in the subject
- **Industry words:** fade, shape-up, line-up, taper, hot towel, "next!", chair, clippers, cape.
- **Materials & place:** white mandarin-collar tunics with an embroidered gold TH, black nitrile gloves, gold-on-black fascia with Arabic and English lettering, a trophy on the shelf, striped capes, a glass shopfront on Khalifa Street, neon shop signs reflected after dark.
- **Customer:** working men in Central Al Ain (many Filipino, many Arab and South Asian). They come after a shift, with a phone in hand, and WhatsApp is how they talk to every business.
- **Emotional state:** relaxed but impatient. "Can I get in tonight, how much, who's cutting?" Not anxious, no research needed: they want **price, time, barber, done**.

## 1. Audience & primary job
A man in Al Ain on his phone who wants a sharp cut today or this week. The site's job is to answer *how much / when / who* in one screen and turn that into a WhatsApp message to the shop in under 30 seconds. Every page has **Book a chair** and **WhatsApp**. On mobile both sit in a sticky bottom bar with **Call**.

## 2. Colour tokens
Taken from the logo (faceted gold on charcoal, silver scissors) and the uniform (white tunic).

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `onyx` | #1D1D1D | Hero, price board, footer surfaces; body text on light. Matched to the logo background so the monogram sits seamlessly | 16.2:1 on `tunic` |
| `tunic` | #F7F6F2 | Main page background (the uniform, not "cream paper": cool-neutral white) | — |
| `gold` | #C9A24A | Prices, monogram, focus rings **on dark only** | 7.0:1 on `onyx` (fails on light, never used there for text) |
| `brass` | #7A5A12 | Gold-family text/links on light surfaces | 5.9:1 on `tunic` |
| `steel` | #8E949A | Secondary text on dark (scissor silver), hairline rules | 6.0:1 on `onyx` |
| `chat` | #25D366 | WhatsApp actions only (with `onyx` label) | 9.6:1 `onyx` on `chat` |

Rule: gold never appears as body text on light. Light sections use `brass`.

## 3. Type
- **Display — Marcellus** (Google, via next/font): an inscriptional Roman cut like the "TRIM HAUS" lettering in the logo, with flared serifs. Used for headings and the price board. Sentence case. Section names are not all caps.
- **Body/UI — Figtree:** a friendly, slightly rounded grotesque, legible at small sizes. Prices use tabular numerals.
- **Arabic — Noto Kufi Arabic:** for the Arabic shop name and bilingual labels, echoing the Kufic-style signage.
- Scale (rem): 0.875 · 1 · 1.125 · 1.375 · 1.75 · 2.25 · 3 · 4 (hero, desktop). Body 1rem / 1.6. Max text measure 65ch.

## 4. Layout concept
Black-and-gold is the owner's own brand, so I keep it. To avoid the "dark site + one accent" look, **most of the page is `tunic` white**, like the barbers' uniform. Black is kept for three deliberate surfaces: the hero, the **price board**, and the footer.

### Home — mobile (375)
```
┌───────────────────────────┐
│ [TH] Trim Haus      ☰     │  onyx header
├───────────────────────────┤
│  photo: barber cutting at │  hero photo (night, neon Arabic sign)
│  night, Khalifa St        │
│ ▓ The Filipino Barbershop │
│ Sharp fades on Khalifa    │  H1 (Marcellus)
│ Street, Al Ain.           │
│ ● Open now · until 10 pm  │  live status (Asia/Dubai)
│ [ Book a chair ]          │
│ [ WhatsApp us ]           │
│ ★ 4.5 · 8 Google reviews  │
├───────────────────────────┤  tunic
│ Prices          AED       │
│ ┌ onyx board ───────────┐ │  price board: dot leaders like
│ │ Haircut ......... 25  │ │  their printed list
│ │ Haircut & shave . 35  │ │
│ │ Haircut + facial  35  │ │
│ │ ...                   │ │
│ └─ Full price list ─────┘ │
├───────────────────────────┤
│ Book in three steps       │  numbered: real sequence
│ 1 Pick a service          │
│ 2 Pick your barber        │
│ 3 Pick a time → WhatsApp  │
├───────────────────────────┤
│ Your barbers  (h-scroll)  │  photo cards, Jo Mar named
├───────────────────────────┤
│ What customers say        │  3 real Google quotes + dates
├───────────────────────────┤
│ Visit · map · hours       │
├───────────────────────────┤
│ footer onyx, demo note    │
└───────────────────────────┘
[ Book ][ WhatsApp ][ Call ]   sticky bar
```

### Home — desktop (1440)
```
┌──────────────────────────────────────────────────────────┐
│ [TH] TRIM HAUS  تريم هاوس   Prices Barbers Visit  [Book] │
├────────────────────────────┬─────────────────────────────┤
│ The Filipino Barbershop    │                             │
│ Sharp fades on Khalifa     │   hero photo, full height,  │
│ Street, Al Ain.            │   bleeds right              │
│ ● Open now · until 10 pm   │                             │
│ [Book a chair] [WhatsApp]  │                             │
│ ★ 4.5 Google · Since 2022  │                             │
├────────────────────────────┴─────────────────────────────┤
│  Prices (text col 4/12) │ onyx price board (8/12, 2 cols) │
├──────────────────────────────────────────────────────────┤
│ Book in three steps (3 cols) │ live WhatsApp preview      │
├──────────────────────────────────────────────────────────┤
│ Barbers: 4-up grid                                        │
│ Reviews: 3 quotes in a row │ Visit: map 7/12 + hours 5/12 │
└──────────────────────────────────────────────────────────┘
```
Alignment: a 12-column grid with a 1200px max width. Headings and body share one left edge. Price numbers align right in tabular figures.

### Booking flow — `/book`
```
mobile                              desktop
┌──────────────────────┐            ┌────────────────────┬──────────────────┐
│ Step 1 of 4 ▬▬▭▭     │            │ steps (accordion)  │ sticky summary:  │
│ Pick a service       │            │ 1 Service   ✓      │ WhatsApp bubble  │
│ (o) Haircut     25   │            │ 2 Barber    ✓      │ composing live   │
│ ( ) Haircut+... 35   │            │ 3 Day & time ▸     │ ─────────────────│
│ tabs: Cuts|Care|     │            │   [Thu 9][Fri 10]  │ Total AED 35     │
│ Colour|Combos        │            │   09:00 09:30 ...  │ [Send on WA]     │
│ ──────────────────── │            │ 4 Your name        │                  │
│ AED 35 · 45 min      │            └────────────────────┴──────────────────┘
│ [Continue]           │
└──────────────────────┘
Confirmation: "Chair requested" + WhatsApp bubble + [Send on WhatsApp] [Add to calendar] [Call]
```
- Slots are generated from 9:00 to 22:00 (Asia/Dubai), 30-minute steps, ending so the service finishes by 22:00. Times already passed today are hidden. Plausible "taken" slots come from a seeded random function so they stay the same between reloads.
- Durations are **sample** (not published), shown as approximate.
- The action keeps one name throughout: "Book a chair" → "Send booking on WhatsApp" → "Chair requested".

## 5. Signature element — the message that writes itself
On `/book` (and as a teaser on the home page), a WhatsApp-style chat bubble **writes the customer's message live** as they choose: service, barber, day, time, name. The last step is just "Send on WhatsApp", which opens `wa.me/971502974400` with that exact text.

Why it fits Trim Haus: it doesn't pretend they have a booking system they don't. It makes the habit their customers already have (messaging the shop) faster and error-free, and the owner sees fully formed booking requests on day one. Everything else stays quiet. **Accessory removed:** I dropped a planned faceted-gold diagonal divider between sections, so the gold facets appear only in the logo.

Motion: the bubble updates (user-triggered); the "open now" dot pulses once; `prefers-reduced-motion` disables both.

## 6. Self-review — "would I produce this for any other barber?"
- *Black + gold barber palette* → generic. **Revised:** most surfaces are the white of the barbers' **tunics**, and black is kept for the hero, price board and footer. Silver `steel` comes from their scissors.
- *Hero "Sharp cuts, classic style" + stock barber pole* → generic. **Revised:** H1 names the **street** and the **Filipino** identity. The hero is their own night-time photo with the Arabic neon sign.
- *Generic service cards* → **Revised:** the price list is redrawn as their own printed black board with dot leaders, so regulars recognise it. Combos show the real AED saving.
- *Standard booking calendar* → **Revised:** the WhatsApp hand-off, because that's how Al Ain books barbers. It is built on their real hours.
- *Generic testimonial carousel* → **Revised:** three real Google quotes, one naming Jo Mar for fades, with the platform and month.
- Typography: Marcellus was chosen because it echoes their logo lettering, not as a default "luxury serif". Bilingual Arabic labels come from their signage.
