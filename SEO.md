# SEO Architecture — Magnolia Thai Restaurant

Applied from `General SEO Architecture workflow.md`, August 2026.
Every number below was **measured against the built output**, not estimated.

```
CLIENT:        Magnolia Thai Restaurant
ADDRESS:       10574 SE 32nd Ave, Milwaukie, OR 97222
MARKET:        Milwaukie, Oregon (SE Portland metro)
CANONICAL URL: ⚠️ UNRESOLVED — see Open Question 1
BUSINESS TYPE: Restaurant, single location
CUISINE:       Thai
```

---

## Phase 0 — Ground truth

**Which file is the live menu?** `lib/menu-data.ts` (98 items, 17 categories). Proved by
grepping the built bundle: its item strings appear in `.next/server/app/index.html`.

`public/menu/Magnolia_Menu.md` is **not** wired to any component — but Netlify serves it
at **200** on `/menu/Magnolia_Menu.md`. It is a transcription of the printed menu that
still carries internal working notes (`*(Flagged: Pricing alignment is ambiguous)*`).
It is now `Disallow`ed in robots.txt and `noindex`ed via header. Not deleted — see
Open Question 4.

**Where do prices live?** Only in `lib/menu-data.ts`. They could not be checked against
the Toast ordering system (Cloudflare bot protection, HTTP 403). Every price on this site
is therefore **UNVERIFIED**, and 26 disagree with the printed menu. No price ships as
`Offer` markup. See Open Question 2.

**Do visible and schema hours agree?** They did — by coincidence, across three separate
hard-coded copies (visible table, `isOpen()` badge, JSON-LD). All three now derive from
one constant, `HOURS` in `lib/site.ts`, so they cannot drift apart.

**Routes vs sitemap.** The router defines exactly one route, `/`. There was no sitemap and
no robots.txt (both 404 live). Both are now generated at build time.

**Services actually offered.** Evidence found for: dine-in, takeout, delivery (UberEats,
DoorDash, Grubhub), first-party online ordering (Toast). **No evidence** for catering,
private events, or reservations — `ReservationsSection.tsx` exists but is commented out
of `TabsClient.tsx`. No page was built for any unverified service.

---

## Phase 2 — Technical audit (defects found)

| # | Defect | Measured | Status |
|---|---|---|---|
| 1 | **Canonical pointed at a different business's domain.** `magnoliathai.com` is Magnolia Thai of **Magnolia, TEXAS** (37125 FM 1774, 281-789-7425), on Google Sites. Canonical, `metadataBase`, OG `url`, JSON-LD `url` and both `image[]` URLs all pointed there. | 5 references | **Fixed** — single `SITE_ORIGIN` constant |
| 2 | **Menu category filter unmounted every inactive section.** | **9 of 98 items in the DOM (9.2%)** | **Fixed → 98/98 (100%)** |
| 3 | **Schema described a menu the page did not render.** | 9 sections declared, 1 rendered | **Fixed** — both derive from `ALLDAY_CATEGORIES`; 17/17, 98/98, zero drift |
| 4 | No `@id` on the business entity | — | **Fixed** — `SITE_ORIGIN/#restaurant` |
| 5 | No sitemap.xml, no robots.txt | both 404 live | **Fixed** — generated at build |
| 6 | Hours defined three times independently | 3 copies | **Fixed** — one `HOURS` constant |
| 7 | Seven `<h1>` elements in one document | 7 | **Fixed** — 2 remain (responsive duplicate, identical text; harmless) |
| 8 | Orphan crawlable files served 200 | `.md` ×2, `.HEIC` ×2, asset tree | **Fixed** — robots + `X-Robots-Tag: noindex` |
| 9 | `Tofu Khao Soi` flagged vegan; its own description says **egg noodles** | 1 | **Fixed** — flag removed |
| 10 | Dietary flags contradict the printed menu | **27 items** | **ESCALATED** — not guessed |
| 11 | Prices contradict the printed menu | **26 items** | **ESCALATED** — not guessed |
| 14 | Gallery alt text: 15 of 27 photos shared one placeholder string | 15 | **Fixed** — written from the photographs; confirm the two drink identifications |
| 15 | OG/Twitter card image `og-magnolia-thai.jpg` returned 404 | live + local | **Fixed** — generated 1200×630 from the hero |
| 16 | 18 MB PNG in JSON-LD `image[]`, fetched raw by Google | 18 MB | **Fixed** — WebP 1:1/4:3/16:9 set, 132 KB |
| 12 | Duplicate deployment `magnoliathai.netlify.app` serving an older build, no canonical | 1 | **ESCALATED** — Open Question 3 |
| 13 | `next@14.2.29` has a published security advisory | — | Flagged, not patched (out of scope) |

**Passed:** true 404 status with `noindex` on unknown slugs (no soft-404, no blank
screen); no `immutable` cache on the HTML shell; HTTPS; tab panels all mount; alt text
present on every image; lazy loading below the fold.

---

## Phase 1 — Demand research

Signal used: **live Google autocomplete** for `<item>`, `<item> portland`, `<item> near me`.
Ranked by **intent**, not volume.

> **Geography warning.** "Portland" autocompletes are heavily contaminated by Portland,
> **Maine** — it appears in the top 3 for nearly every dish query. And "Milwaukie" collides
> with Milwaukee, WI. Head terms must say **"Milwaukie Oregon"** or **"Portland Oregon"**.

### Selected — commercial intent, build these (4)

| Item | Deciding autocompletes | Why |
|---|---|---|
| **Khao Soi** | `khao soi near me`, `best khao soi portland`, `khao soi restaurant portland`, `vegan khao soi portland`, `chicken khao soi portland` | **The standout.** Pure restaurant intent, no recipe queries in the local set — and Magnolia runs a **7-variant Khao Soi selection** (chicken, tofu, tempura, pork belly, duck, salmon, braised beef) that competitors do not have. This is the distinctive-section page the workflow describes. |
| **Pad See Ew** | `best pad see ew portland`, `pad see ew delivery near me` | Commercial intent, less saturated than Pad Thai |
| **Drunken Noodles** | `best drunken noodles portland`, `thai drunken noodle portland` | Commercial intent |
| **Pineapple Fried Rice** | `best pineapple fried rice portland`, `pineapple fried rice near me` | Local intent present, though mixed with recipe |

### Rejected — and why

| Item | Rejected because |
|---|---|
| **Tom Kha** | Autocomplete is recipe/research: `tom kha broth recipe`, `tom kha paste recipe`, `tom kha crock pot recipe`, `is tom yum or tom kha better`. **Blog subject, not a landing page** — the exact pattern the workflow warns about. |
| **Massaman Curry** | `what is massaman curry made of`, `is massaman curry vegan`, `is massaman curry bad for you`, `what kind of curry is massaman`. Research intent. **Blog subject.** |
| **Pad Thai** | Real commercial intent, but the most saturated Thai term in the metro. Covered by the menu page; revisit once the Khao Soi page proves the pattern. |
| **Catering** | `thai catering portland` autocompletes drift straight to `thai restaurant portland` — weak specific demand — **and there is no evidence Magnolia caters.** Two independent reasons not to build. |

---

## Phase 3 — Page map

**The blocker:** this is a tabbed SPA. Menu, About, Gallery and Find Us are `<button>`
handlers writing `#hash` on a single `/` route. Google does not index hash fragments as
separate URLs, and buttons are not crawlable links — so the site has **exactly one
indexable URL**, and one title/description to cover every query.

Everything below requires converting the tabs into real Next.js routes first. That is an
architecture decision, not an SEO edit, so it is **proposed, not done** — see
Open Question 5.

| Route | Intent | Schema | Status |
|---|---|---|---|
| `/` | `thai restaurant milwaukie oregon`, `thai food near me` | `Restaurant` — the ONE canonical node | exists (tabbed SPA) |
| `/thai-khao-soi-portland` | `khao soi near me`, `best khao soi portland` | `MenuSection` + `BreadcrumbList` + `FAQPage` | **BUILT** |
| `/dishes` (hub) | `thai dishes portland` | `ItemList` + `BreadcrumbList` | **BUILT** |
| `/dishes/pad-thai` | `best pad thai portland` | `MenuItem` + `BreadcrumbList` + `FAQPage` | **BUILT** |
| `/dishes/pad-see-ew` | `best pad see ew portland` | same | **BUILT** |
| `/dishes/drunken-noodles` | `best drunken noodles portland` | same | **BUILT** |
| `/dishes/pineapple-fried-rice` | `pineapple fried rice near me` | same | **BUILT** |
| `/menu` | `thai menu milwaukie` | — | still a `#menu` fragment, not a route |
| `/visit` | address / hours / directions | — | still a `#contact` fragment |
| `/order-online` | `thai takeout milwaukie` | — | proposed |

The six new pages are **standalone server-rendered routes added alongside the SPA**.
`/` is untouched. Their navigation uses real `<a>`/`<Link>` elements, unlike the SPA's
`<button>` handlers, which crawlers do not follow.

**Prices are deliberately absent from these pages.** `menu-data.ts` shows a flat `$15`
for the 22 protein-choice entrées while the printed menu prices them `$15`–`$23` by
protein. Rather than publish a number that is wrong for five of six protein choices, the
pages say the dish is priced by protein and send people to the live ordering page. No
`Offer` or `price` ships as structured data anywhere — verified 0 occurrences across all
six pages.

**Internal linking (Phase 6).** The landing pages are deliberately **not** in the navbar.
They are reachable by two contextual paths: a "Dish guides" block inside the menu tab, and
a footer block on every landing page with descriptive anchors. Each child links back to
the hub and to the full menu. Confirm with the client whether they want these in the main
navigation — a page with no internal links is an orphan: indexed, but crawled rarely and
ranked weakly.

### Deliberately NOT built — do not let the next person rebuild these

- **`/thai-restaurant-portland`, `/thai-restaurant-clackamas`, `/thai-restaurant-oak-grove`** —
  one location. A page per nearby city with the name swapped is a **doorway page**, named
  explicitly in Google's spam policies.
- **`/catering`, `/private-events`** — no evidence the service is offered, and no minimums,
  lead time or coverage to write honestly.
- **`/reservations`** — the reservations component is commented out. `acceptsReservations`
  is not asserted in schema either way.
- **`/reviews`** — never mark up ratings the business wrote about itself.
- **`/dishes/tom-kha`, `/dishes/massaman-curry`** — failed the Phase 1 intent check. Blog
  subjects. Do not rebuild these as landing pages because they are popular dishes; the
  demand is for recipes, not for a restaurant.
- **Individual pages for all 98 menu items** — five pages with substance rank; ninety-eight
  stubs is a doorway cluster.

---

## Phase 5 — Structured data

One `Restaurant` node, `@id` = `${SITE_ORIGIN}/#restaurant`, defined once in
`lib/structured-data.ts` and rendered on `/`. Any future page references that `@id`
rather than redescribing the business.

`hasMenuSection` and `openingHoursSpecification` are **derived** from the same constants
the page renders, so schema and visible content cannot drift.

**Deliberately absent, and why:** `offers`/`price` (unverified — Open Question 2);
`acceptsReservations` (no evidence either way, and `false` is as much a claim as `true`);
`suitableForDiet` (27 contradictions — Open Question 2); `aggregateRating`/`review`
(never self-declared).

---

## ESCALATE — open questions for the client

1. **What is the production domain?** The code claimed `magnoliathai.com`. That domain
   belongs to a **different restaurant in Magnolia, Texas**, running on Google Sites. Every
   canonical, OG tag and schema URL pointed at it, which tells Google to index that
   business instead of this one. It is now set to the origin the site is actually served
   from, `magnoliathaipdx.netlify.app`. **`magnoliathaipdx.com` has expired and is listed
   for sale** — if that was the intended domain, it needs re-registering. One constant
   (`SITE_ORIGIN` in `lib/site.ts`) changes it.

2. **Prices and dietary flags.** 26 prices and 27 dietary flags in `lib/menu-data.ts`
   disagree with the printed menu. Specifically:
   - **Tom Kha** — site `$18`, printed menu `$16`
   - **Modelo** — site `$5`, printed menu `$7`
   - **Chocolate Lava Cake `$7`, Hot Sake `$6`, Cold Sake `$6`, Tsing Tao `$6`** — the
     printed menu records these as *"price not visible"*. Where did the numbers come from?
   - **22 entrées show a flat `$15`** while the printed menu prices them by protein
     (`$15` veg/chicken → `$16` pork → `$17` shrimp/beef → `$20` combo → `$21` seafood →
     `$23` duck). The on-page note only discloses `Shrimp (+$2)` and `Prawns (+$2)`, so a
     customer ordering duck sees `$15` and pays `$23`.
   - The site marks 26 items gluten-free; the printed menu marks 35, and they disagree on
     27 items in **both** directions. Thai kitchens use fish sauce, oyster sauce and shared
     fryers — none of this can be inferred.

   Nothing here was guessed and no price ships as `Offer` markup.

3. **A second live deployment.** `magnoliathai.netlify.app` serves an older build of this
   same business with a different title and **no canonical tag**. It competes with the real
   site. Should it be deleted, or 301'd to the production domain?

4. **May `/menu/Magnolia_Menu.md` be deleted?** It is `noindex`ed but still reachable at
   200. It is not deleted in case a link was ever texted or QR-coded to a customer.

5. **Convert the remaining tabs to real routes?** The dish pages now exist as real URLs,
   but `/menu`, `/visit` and `/about` are still `#hash` fragments on `/`, so the menu — the
   primary organic asset — still has no URL of its own. Converting them is the next
   structural step.

6. **"Est. 2010" and "over fifteen years".** Published in three places (splash screen,
   About, hero copy) with no source in the repo — and internally inconsistent: 2010 + 15
   = 2025, but it is now 2026. Please confirm the founding year.

7. **Do you cater, host private events, or take reservations?** No page was built for any
   of these.

---

## The honest ceiling

For a single-location restaurant the **Google Business Profile map pack** drives more
customers than organic blue links. The Business Profile — photos, hours, reviews, replies —
outranks anything in this repository. Fix the canonical domain first (Open Question 1),
then verify Search Console, submit the sitemap, and watch **impressions before positions**.
Judge results at **8–12 weeks**, not next week.
