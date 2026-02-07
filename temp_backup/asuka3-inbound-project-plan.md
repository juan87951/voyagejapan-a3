# 🚢 voyagejapan-a3 — Voyage Japan with Asuka III

> **Project Name:** voyagejapan-a3
> **Parent:** Anchor-Infinite (ARTerrace)
> **Target Audience:** Affluent international tourists visiting Japan
> **Owner:** ARTerrace / juan879
> **Created:** 2026-02-06

---

## 1. Vision

A premium, English-first website that introduces Asuka III cruise experiences to international visitors — combining rich storytelling about Japanese culture, clear itinerary information, seamless lead capture, and (eventually) direct booking capabilities.

The site should feel like a **digital concierge**: beautiful, trustworthy, and effortlessly guiding guests from curiosity to reservation.

---

## 2. Target Users

| Segment | Description | Key Needs |
|---------|-------------|-----------|
| **Explorers** | First-time visitors researching Japan trips | Inspiration, cultural context, "why a cruise?" |
| **Planners** | Decided on Japan, comparing cruise options | Itineraries, pricing, cabin details, dates |
| **Bookers** | Ready to reserve | Simple booking flow, multilingual support, trust signals |
| **Repeaters** | Past Asuka / Japan cruise guests | New routes, loyalty perks, seasonal highlights |

---

## 3. Core Features (Phased)

### Phase 1 — Foundation (MVP)
- **Hero & Brand Storytelling:** Full-screen visuals, video background, "Why Asuka III" narrative
- **Itinerary Showcase:** Interactive route maps, port-of-call highlights (cherry blossoms, temples, cuisine)
- **Ship & Cabin Guide:** Deck plans, suite types, photo galleries
- **Inquiry / Lead Gen Form:** Contact form with trip preferences (dates, cabin type, group size)
- **Multi-language Toggle:** English (primary) + Japanese
- **Responsive Design:** Mobile-first for travelers browsing on the go

### Phase 2 — Engagement
- **Blog / Journal Section:** Cultural stories, onboard experiences, seasonal highlights
- **Photo & Video Gallery:** Immersive media showcasing ship life and destinations
- **FAQ & Travel Info:** Visa tips, access from major airports, what to pack
- **Testimonials / Reviews:** Social proof from past international guests
- **Newsletter Signup:** Build an email list for future sailings

### Phase 3 — Booking
- **Live Availability Scraper:** Scheduled job (~every 2 hours) fetches each voyage's tariff page from plan.asukacruise.co.jp, parses cabin pricing AND booking status (Available / Waitlist / Sold Out) per category, and writes to Supabase. Displays `last_checked_at` timestamp on the frontend so customers see freshness.
- **Availability Calendar:** Sailing dates with real-time cabin status badges
- **Cabin Selection UI:** Visual deck plan with pricing tiers; sold-out cabins greyed out but still showing price for reference
- **Reservation Flow:** Multi-step form → confirmation → payment integration
- **User Accounts (optional):** Booking history, saved preferences
- **Admin Dashboard:** Manage inquiries, bookings, content updates

---

## 4. Recommended Tech Stack

Since you already have experience with the Node.js / Vercel ecosystem from project-alpha, here's a stack that builds on that:

### Frontend
| Tool | Why |
|------|-----|
| **Next.js 15 (App Router)** | You already know it; great for SEO, SSR, and performance |
| **Tailwind CSS** | Fast, consistent styling with a premium feel |
| **Framer Motion** | Smooth animations for storytelling sections |
| **next-intl** | Lightweight i18n for English ↔ Japanese |

### Backend / Data
| Tool | Why |
|------|-----|
| **Supabase** | Free tier, Postgres DB, auth, storage — great for forms + bookings |
| **Vercel Serverless Functions** | API routes for form handling, email triggers |
| **Resend or SendGrid** | Transactional emails (inquiry confirmations) |

### CMS (for blog & itinerary content)
| Tool | Why |
|------|-----|
| **Notion API** or **Sanity.io** | Easy content editing without code deploys |
| Alternative: **MDX files** | Simple if you prefer keeping content in the repo |

### Hosting & Deploy
| Tool | Why |
|------|-----|
| **Vercel** | Seamless Next.js deploys, global CDN, preview URLs |
| **GitHub** | Version control, CI/CD with Vercel |

### Phase 3 Additions
| Tool | Why |
|------|-----|
| **Stripe** | Payment processing for international cards |
| **Supabase Auth** | User accounts for booking management |
| **Vercel Cron Jobs** | Trigger availability scraper every ~2 hours (`vercel.json` cron config) |
| **Cheerio / JSDOM** | Parse tariff HTML from plan.asukacruise.co.jp into structured data (price + booking status per cabin) |

---

## 5. Site Map (Draft)

```
/                          → Hero + brand story + featured cruises
/cruises                   → All available sailings
/cruises/[slug]            → Individual cruise detail (itinerary, map, pricing)
/ship                      → Asuka III ship guide (cabins, dining, amenities)
/experience                → Photo/video gallery + cultural stories
/blog                      → Journal / articles
/blog/[slug]               → Individual blog post
/contact                   → Inquiry form + lead capture
/faq                       → Travel info for international guests
/about                     → About ARTerrace + partnership with Yusen
```

---

## 6. Design Direction

**Keywords:** Premium, serene, Japanese elegance, trustworthy

- **Color Palette:** Deep navy (#1B2A4A), gold accent (#C9A96E), white (#FFFFFF), soft gray (#F5F5F5)
- **Typography:** Clean serif for headings (e.g., Playfair Display), modern sans for body (e.g., Inter or Noto Sans JP)
- **Imagery:** Full-bleed photography — ocean, cherry blossoms, traditional cuisine, ship interiors
- **Tone of Voice:** Warm, inviting, slightly elevated — like a luxury hotel concierge speaking to a valued guest

---

## 7. Key Differentiators vs. Competitors

- **Cultural depth:** Not just a cruise — a cultural journey through Japan, tied to ARTerrace's kogei craft heritage
- **Inbound-first:** Designed for international visitors (most Japanese cruise sites are domestic-focused)
- **Seasonal storytelling:** Cherry blossom routes, autumn foliage, winter illumination — content tied to Japan's seasons
- **Personal touch:** Lead gen funnels to a human concierge, not just a booking engine

---

## 8. Milestones

| Phase | Target | Deliverable |
|-------|--------|-------------|
| **Phase 1** | ~4–6 weeks | MVP live: hero, itineraries, ship guide, inquiry form |
| **Phase 2** | +4 weeks | Blog, gallery, testimonials, newsletter |
| **Phase 3** | +6–8 weeks | Booking flow, payment, admin panel |

---

## 9. Open Questions

- [ ] Domain name — new domain or subdomain of ARTerrace?
- [ ] Content — do we have English-ready copy & photography, or do we need to create/translate?
- [ ] Booking integration — direct partnership with Yusen Cruise for availability data, or periodic scraping of plan.asukacruise.co.jp? (Currently planning scraper approach; confirm Yusen is comfortable with this)
- [ ] Scraping resilience — if Yusen changes page structure, scraper will break. Consider requesting an API or data feed as a long-term alternative.
- [ ] Budget for paid services (Sanity CMS, Stripe fees, Supabase Pro if needed)?
- [ ] Legal — terms of service, privacy policy, booking T&Cs for international customers?

---

## 10. Asuka III Voyage Schedule (April 2026 ~)

> **Source:** [plan.asukacruise.co.jp](https://plan.asukacruise.co.jp/#a3)
> **Ship:** Asuka III (飛鳥Ⅲ) — All cabins feature private balconies. 3 cabin classes: Penthouse, Suite, Balcony. 6 restaurants. Dress code: Elegant Casual.
> **Note:** All tariff data (pricing + booking status) is populated by a live scraper running every ~2 hours against plan.asukacruise.co.jp. Tables below show the schema; actual values come from Supabase at runtime.

---

### Voyage 1: Spring Kagoshima & Ishigaki Cruise (春の鹿児島・石垣クルーズ)

| Item | Detail |
|------|--------|
| **Departure** | April 8, 2026 (Wed) |
| **Duration** | 9 days / 8 nights |
| **Route** | Kobe → Kagoshima → Ishigaki → (cruising) → Kobe |
| **Highlights** | Hot springs culture (Ibusuki sand baths), subtropical nature of Ishigaki, Kabira Bay, cherry blossom season |
| **Official Page** | [plan.asukacruise.co.jp/asuka3/...](https://plan.asukacruise.co.jp/#a3) |

**Tariff Table (per person, double occupancy, JPY):** ⚠️ *Populated by live scraper — not static*

| Cabin Class | Category | Regular Price | My ASUKA CLUB Price | Status |
|-------------|----------|--------------|---------------------|--------|
| Penthouse | Royal Penthouse | *(live)* | *(live)* | *(live)* |
| Penthouse | Grand Penthouse | *(live)* | *(live)* | *(live)* |
| Suite | Captain's Suite | *(live)* | *(live)* | *(live)* |
| Suite | Panorama Suite | *(live)* | *(live)* | *(live)* |
| Suite | Asuka Suite | *(live)* | *(live)* | *(live)* |
| Suite | Midship Suite | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony A | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony B | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony C | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony D | *(live)* | *(live)* | *(live)* |

> **Status values:** `Available` / `Waitlist (キャンセル待ち)` / `Sold Out (満室)` — updated every ~2 hours Spring Ofunato & Aomori Cruise (春の大船渡・青森クルーズ)

| Item | Detail |
|------|--------|
| **Departure** | April 20, 2026 (Mon) |
| **Duration** | 6 days / 5 nights |
| **Route** | Yokohama → Ofunato → Aomori → Yokohama |
| **Highlights** | Tohoku cherry blossoms in full bloom, Sanriku coast, Aomori cultural heritage |
| **Official Page** | [plan.asukacruise.co.jp/asuka3/...](https://plan.asukacruise.co.jp/#a3) |

**Tariff Table (per person, double occupancy, JPY):** *Populated by live scraper*

| Cabin Class | Category | Regular Price | My ASUKA CLUB Price | Status |
|-------------|----------|--------------|---------------------|--------|
| Penthouse | Royal Penthouse | *(live)* | *(live)* | *(live)* |
| Penthouse | Grand Penthouse | *(live)* | *(live)* | *(live)* |
| Suite | Captain's Suite | *(live)* | *(live)* | *(live)* |
| Suite | Panorama Suite | *(live)* | *(live)* | *(live)* |
| Suite | Asuka Suite | *(live)* | *(live)* | *(live)* |
| Suite | Midship Suite | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony A | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony B | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony C | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony D | *(live)* | *(live)* | *(live)* |

---

### Voyage 3: Spring Hakodate & Fushiki Cruise (春の函館・伏木クルーズ)

| Item | Detail |
|------|--------|
| **Departure** | April 25, 2026 (Sat) |
| **Duration** | 8 days / 7 nights |
| **Route** | Yokohama → Hakodate → Fushiki (Toyama) → Yokohama |
| **Highlights** | Hakodate night view, Goryokaku cherry blossoms, Tateyama mountain backdrop at Fushiki, Toyama Bay seafood |
| **Official Page** | [plan.asukacruise.co.jp/asuka3/...](https://plan.asukacruise.co.jp/#a3) |

**Tariff Table (per person, double occupancy, JPY):** *Populated by live scraper*

| Cabin Class | Category | Regular Price | My ASUKA CLUB Price | Status |
|-------------|----------|--------------|---------------------|--------|
| Penthouse | Royal Penthouse | *(live)* | *(live)* | *(live)* |
| Penthouse | Grand Penthouse | *(live)* | *(live)* | *(live)* |
| Suite | Captain's Suite | *(live)* | *(live)* | *(live)* |
| Suite | Panorama Suite | *(live)* | *(live)* | *(live)* |
| Suite | Asuka Suite | *(live)* | *(live)* | *(live)* |
| Suite | Midship Suite | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony A | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony B | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony C | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony D | *(live)* | *(live)* | *(live)* |

---

### Voyage 4: Golden Week Guam Cruise (ゴールデンウィーク グアムクルーズ)

| Item | Detail |
|------|--------|
| **Departure** | May 2, 2026 (Sat) |
| **Duration** | 10 days / 9 nights |
| **Route** | Yokohama → (cruising) → Guam → (cruising) → Yokohama |
| **Highlights** | International cruise, tropical resort stopover, total lunar eclipse viewing opportunity, extended sea days |
| **Official Page** | [plan.asukacruise.co.jp/asuka3/...](https://plan.asukacruise.co.jp/#a3) |

**Tariff Table (per person, double occupancy, JPY):** *Populated by live scraper*

| Cabin Class | Category | Regular Price | My ASUKA CLUB Price | Status |
|-------------|----------|--------------|---------------------|--------|
| Penthouse | Royal Penthouse | *(live)* | *(live)* | *(live)* |
| Penthouse | Grand Penthouse | *(live)* | *(live)* | *(live)* |
| Suite | Captain's Suite | *(live)* | *(live)* | *(live)* |
| Suite | Panorama Suite | *(live)* | *(live)* | *(live)* |
| Suite | Asuka Suite | *(live)* | *(live)* | *(live)* |
| Suite | Midship Suite | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony A | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony B | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony C | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony D | *(live)* | *(live)* | *(live)* |

---

### Voyage 5: Japan Discovery Cruise (2026年 日本一周 ディスカバリークルーズ)

| Item | Detail |
|------|--------|
| **Departure** | A Course: May 12, 2026 (Tue) / B Course: May 13, 2026 (Wed) |
| **Duration** | 23 days / 22 nights |
| **Route** | A: Yokohama → Nagasaki → Kagoshima → Tanegashima → Naze (Amami) → Naha → Miyakojima → Ishigaki → (cruising) → Sakai-Minato → Kanazawa → Fushiki → Sado → Akita → Hakodate → Shimokita Peninsula → Miyako → Ishinomaki → Shimonoseki → (Seto Inland Sea) → Yokohama / B: Kobe → ... → Kobe |
| **Highlights** | Full circumnavigation of Japan, 14 prefectures, 15 ports, JAXA Tanegashima Space Center special visit, Kanazawa traditional cuisine at historic ryotei, kogei crafts, Future Cruise Credit ¥300,000 for My ASUKA CLUB members |
| **Campaign** | My ASUKA CLUB 20% discount |
| **Official Page** | [plan.asukacruise.co.jp/asuka3/98587](https://plan.asukacruise.co.jp/asuka3/98587/) |

**Tariff Table (per person, double occupancy, JPY):** *Populated by live scraper*

| Cabin Class | Category | Regular Price | My ASUKA CLUB Price | Status |
|-------------|----------|--------------|---------------------|--------|
| Penthouse | Royal Penthouse | *(live)* | *(live)* | *(live)* |
| Penthouse | Grand Penthouse | *(live)* | *(live)* | *(live)* |
| Suite | Captain's Suite | *(live)* | *(live)* | *(live)* |
| Suite | Panorama Suite | *(live)* | *(live)* | *(live)* |
| Suite | Asuka Suite | *(live)* | *(live)* | *(live)* |
| Suite | Midship Suite | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony A | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony B | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony C | *(live)* | *(live)* | *(live)* |
| Balcony | Asuka Balcony D | *(live)* | *(live)* | *(live)* |

---

### Voyage 6: Early Summer Kyushu & Amami Cruise (神戸発着 初夏の九州・奄美クルーズ)

| Item | Detail |
|------|--------|
| **Departure** | ~June 2026 (exact date TBC from schedule) |
| **Duration** | ~8 days |
| **Route** | Kobe → Beppu → Kagoshima → Naze (Amami) → (cruising) → Kobe |
| **Highlights** | Subtropical Amami Oshima, Beppu hot springs, Kagoshima Sakurajima volcano |
| **Official Page** | [plan.asukacruise.co.jp/asuka3/...](https://plan.asukacruise.co.jp/#a3) |

*(Same tariff table structure as above — populated by live scraper with Status column)*

---

### Voyage 7: Summer Holiday Suruga Cruise — 1st Anniversary (夏の連休 駿河クルーズ)

| Item | Detail |
|------|--------|
| **Departure** | ~July 2026 (Marine Day holiday weekend) |
| **Duration** | ~4 days |
| **Route** | Yokohama → Shimizu → Yokohama |
| **Highlights** | **Asuka III 1st Anniversary celebration**, Mt. Fuji views from Suruga Bay, summer holiday cruise |
| **Official Page** | [plan.asukacruise.co.jp/asuka3/...](https://plan.asukacruise.co.jp/#a3) |

*(Same tariff table structure as above — populated by live scraper with Status column)*

---

### Voyage 8: Summer Hokkaido Cruise — Kushiro, Muroran & Hakodate (夏の北海道クルーズ 釧路・室蘭・函館)

| Item | Detail |
|------|--------|
| **Departure** | ~July–August 2026 |
| **Duration** | ~7–8 days |
| **Route** | Yokohama → Kushiro → Muroran → Hakodate → Yokohama |
| **Highlights** | Best season for Hokkaido, Kushiro Marshland, Muroran night views, Hakodate seafood |
| **Official Page** | [plan.asukacruise.co.jp/asuka3/...](https://plan.asukacruise.co.jp/#a3) |

*(Same tariff table structure as above — populated by live scraper with Status column)*

---

### Voyage 9: Nichinan Fireworks Cruise (神戸発着 日南花火クルーズ)

| Item | Detail |
|------|--------|
| **Departure** | ~July 2026 |
| **Duration** | ~4 days |
| **Route** | Kobe → Aburatsu (Nichinan) → Kobe |
| **Highlights** | Spectacular fireworks display at sea, Nichinan coastline mythology, Kobe departure |
| **Official Page** | [plan.asukacruise.co.jp/asuka3/...](https://plan.asukacruise.co.jp/#a3) |

*(Same tariff table structure as above — populated by live scraper with Status column)*

---

### Voyage 10: Summer Hokkaido Cruise — Rishiri, Rumoi & Otaru (夏の北海道クルーズ 利尻・留萌・小樽)

| Item | Detail |
|------|--------|
| **Departure** | ~August 2026 |
| **Duration** | ~7–8 days |
| **Route** | Yokohama → Rishiri → Rumoi → Otaru → Yokohama |
| **Highlights** | Rishiri Island (the "floating mountain"), northern Hokkaido wilderness, Otaru canal town |
| **Official Page** | [plan.asukacruise.co.jp/asuka3/...](https://plan.asukacruise.co.jp/#a3) |

*(Same tariff table structure as above — populated by live scraper with Status column)*

---

### ⚠️ Note on Tariff & Availability Data

The official Asuka Cruise booking site ([plan.asukacruise.co.jp](https://plan.asukacruise.co.jp)) hosts tariff tables on each voyage detail page. These tables include both **pricing** and **booking status** (available, waitlist, or sold out) per cabin category.

**Our approach — periodic live scraping:**
1. A **Vercel Cron Job** (~every 2 hours) hits an API route that fetches each voyage's detail page
2. **Cheerio** parses the HTML to extract per-cabin pricing and booking status
3. Results are written to Supabase (`cabin_categories` table) with a `status` field and `last_checked_at` timestamp
4. The frontend displays live status badges and "Last updated X minutes ago" for transparency
5. Sold-out cabins remain visible (greyed out) so customers can see pricing and consider waitlist options

**Why not copy-paste once?** Availability changes constantly as cabins sell. A static snapshot would mislead customers into attempting to book sold-out cabins. Periodic scraping keeps our site in sync with the official source of truth.

**Cabin categories on Asuka III:**
- **Penthouse Class:** Royal Penthouse, Grand Penthouse
- **Suite Class:** Captain's Suite, Panorama Suite, Asuka Suite, Midship Suite
- **Balcony Class:** Asuka Balcony A, B, C, D

**Pricing notes (for the website):**
- All prices are per person, double occupancy
- Single occupancy surcharges apply (vary by cabin type)
- 3rd/4th passenger rate = Asuka Balcony D double-occupancy rate regardless of cabin type
- Domestic cruises include consumption tax and port facility fees
- International cruises include port taxes; International Departure Tax (¥1,000) is separate
- My ASUKA CLUB membership is free to join (no annual fee, age 2+)

---

## 11. About Asuka III (Ship Summary for Website)

> Use this content as the basis for the `/ship` page.

**Asuka III** is Japan's newest and most premium cruise ship, launched in **July 2025**.

| Spec | Detail |
|------|--------|
| **Concept** | "A voyage that expands to your preferences" |
| **Cabins** | All ocean-view with **private balcony** |
| **Cabin Classes** | 3 — Penthouse, Suite, Balcony |
| **Restaurants** | 6 — choose by mood, time, and cuisine |
| **Art & Craft** | Curated collection of Japanese art and kogei (traditional craft) throughout the ship |
| **Dress Code** | Elegant Casual — relaxed yet refined |
| **Entertainment** | Live music at 4 onboard stages, digital performing arts, cultural lectures |
| **Wellness** | Grand Spa, Albatross Pool, wellness programs |
| **Unique Experiences** | "A3 Experience" — exclusive shore excursions curated by Asuka III |

---

## 12. Next Steps

1. **Confirm project name & domain**
2. **Set up new repo** (or branch from project-alpha)
3. **Scaffold Next.js project** with Tailwind + i18n
4. **Design the hero section** — start with brand storytelling
5. **Build itinerary showcase** — reuse/evolve any existing cruise data from project-alpha
6. **Deploy to Vercel** — get a live preview URL running early

---

*This document is a living plan. Update as the project evolves.*
