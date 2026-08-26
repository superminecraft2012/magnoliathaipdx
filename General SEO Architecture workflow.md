# General SEO Architecture Workflow

**A reusable engagement prompt for local business websites, tuned for restaurants.**
Version 1.0 — August 2026. Every rule here traces to a defect found in production.

---

## How to use this file

Paste this entire file into Claude (or any coding agent) in the client's repository,
then fill in the CONFIG block below. The agent works through the phases in order and
stops at the escalation points rather than guessing.

The single most important section is **Phase 0**. On the engagement this came from,
the repo contained two menu files that disagreed with each other, and the one holding
every price was dead code that had never reached a browser. Everything built on the
wrong file would have been wrong, silently.

---

## CONFIG — fill this in before running

```text
CLIENT:         [Business name]
ADDRESS:        [Full street address, or "service-area business, no public address"]
MARKET:         [City / neighborhood the business actually sits in]
CANONICAL URL:  [https://www.example.com]  ← note www vs non-www
BUSINESS TYPE:  [Restaurant / single-location venue / service-area / multi-location]
CUISINE OR
CATEGORY:       [Thai / dentistry / roofing / etc.]
```

---

## OBJECTIVE

Build the smallest set of pages that captures real local search demand, and fix the
technical defects stopping existing pages from ranking.

A compact site with strong menu, location, service and dish pages beats a large grid
of near-duplicate local URLs every time. More URLs do not create more visibility.

---

## PHASE 0 — GROUND TRUTH

**Do this before anything else. Do not write a line of content until every question
below is answered from the repository.**

1. **Which file is the LIVE menu / service list?**
   Businesses routinely accumulate several data files. Find every candidate, then
   *prove* which one renders:
   - grep the built bundle for a string unique to each candidate
   - a file whose unique strings are absent from the bundle is dead code

   Report which is live, which are stale, and every item, price or description where
   they disagree.

2. **Where do prices live?**
   If prices exist only in a file that never reaches the browser, treat every price as
   **UNVERIFIED** and escalate before publishing one.

3. **Extract verified facts only.**
   Name, address, phone, hours, ordering URL, reservation URL, social profiles,
   delivery providers. Take them from what the site already publishes to customers.

4. **Do the VISIBLE hours and the SCHEMA hours agree?**
   They frequently do not. Visible wins. Correct the schema to match, and make both
   read from one shared source so they cannot drift again.

5. **List every route the router defines and compare to the sitemap.**
   Note routes missing from the sitemap, and sitemap URLs with no route.

6. **Inventory which services are ACTUALLY offered.**
   Catering, private events, delivery, takeout, reservations, gift cards. Look for
   evidence — an existing block on the home page, a third-party listing, a popup in
   git history. An unverified service does not get a page.

**Report contradictions. Do not resolve them yourself — they are the client's to
answer.**

---

## PHASE 1 — DEMAND RESEARCH

For every dish (or service) on the LIVE list, gather three independent signals:

| Signal | Source | Watch for |
|---|---|---|
| Keyword volume | Published Google Ads data where it exists | Global vs local figures |
| Reference demand | 12 months of English Wikipedia pageviews via the Wikimedia REST pageviews API | Redirects — an item may sit under a different article title. Pan-cuisine terms (fried rice, spring roll, wonton, roti) are inflated by traffic that is not about this cuisine |
| Local intent | Live Google autocomplete for `<item>`, `<item> <city>`, `<item> near me` | This is the deciding signal |

**Then rank by INTENT, not volume. This is the step people get wrong.**

- **RESTAURANT / COMMERCIAL INTENT → landing page candidate**
  Autocompletes include "near me", "<city>", "best <item> <city>"
- **RECIPE / GROCERY / RESEARCH INTENT → blog subject, NOT a landing page**
  Autocompletes dominated by "recipe", "paste", "calories", "vs", "how to"

An item can be the second-highest-demand thing on the whole menu and still make a bad
landing page. On the reference engagement, tom yum ranked #2 in demand and correctly
got no page — its top ten autocompletes were all recipe and grocery queries with no
"near me" variant anywhere.

**Select 3–6 items. Never more. Report what you rejected and why.**

Run the same intent check on: the category + city head term, "near me" variants,
dietary terms, catering terms, and any distinctive menu section.

---

## PHASE 2 — TECHNICAL AUDIT

Check every item. Each was a real defect found on a real site.

- [ ] **Canonical tags.** Present at all? Do any point at a **different domain** than
      the site uses? A cross-domain canonical tells Google to index the other URL and
      can remove entire sections from search.
- [ ] **Duplicate business entities.** More than one `LocalBusiness`/`Restaurant` node
      for one address — they compete. Exactly one, with a stable `@id` that every other
      entity references.
- [ ] **Schema vs visible content.** Hours, prices, menu items must match what a
      visitor sees.
- [ ] **Sitemap completeness.** Is the menu/services page in it? Is it hand-maintained
      (it will drift) or generated at build time?
- [ ] **Catch-all route.** Does an unknown URL render a 404 page, or a **blank screen**?
      An SPA with no `path="*"` renders nothing at all.
- [ ] **Soft 404s.** Unknown slugs must not redirect to a real page — that tells Google
      the bogus URL is a valid alias.
- [ ] **Tabbed / accordion / carousel content.** Does it *mount* only the active panel?
      Content not in the DOM is invisible to crawlers. Measure the percentage of the
      menu actually present on load.
- [ ] **Orphan crawlable files.** Stray `.html`, raw content sources fetched at runtime,
      mobile/desktop near-duplicates, PDF menus competing with the HTML menu.
- [ ] **Client-side rendering.** Note it. Content and links behind interaction are the
      recurring risk.
- [ ] **Cache headers.** A long `immutable` cache applied to `index.html` serves stale
      bundle references and produces white screens.
- [ ] **Images.** Weight, dimensions reserved, alt text, modern formats, lazy loading
      below the fold.
- [ ] **HTTPS, one canonical host, no redirect chains or loops.**

### What each defect costs

| Defect | Symptom seen | Cost if missed |
|---|---|---|
| Cross-domain canonical | Blog declared `rel="canonical"` on a domain the site does not use | Entire blog can be excluded from the index |
| Tabbed content not mounted | Only the active menu panel rendered | 88% of dishes invisible to crawlers |
| No catch-all route | SPA had no `path="*"` | Every unknown URL renders a white screen |
| Duplicate business entity | A second `Restaurant` node for the same address | Two entities compete for one place |
| Schema vs visible mismatch | Markup claimed continuous hours; page showed split service | Google discounts the structured data |
| Menu missing from sitemap | Hand-maintained sitemap had drifted | The most important page goes undiscovered |
| Soft 404 | Unknown slug redirected to a real hub page | Bogus URLs treated as valid aliases |
| Orphan crawlable files | Raw sources and mobile/desktop duplicates served 200 | Duplicate content competing with the real page |
| Missing canonicals | No page emitted one | Duplicate URLs consolidate unpredictably |
| Immutable cache on the shell | One-year `immutable` on `/*` | Stale `index.html`, missing bundles, white screens |

---

## PHASE 3 — THE PAGE MAP

Build only what the business genuinely supports. Format for each page:
**INTENT / TITLE / H1 / MUST HAVE / SCHEMA / LINKS OUT / GATE.**

### CORE — always build

#### `/`
- **INTENT** — `[category] restaurant [city]`, `[category] near me`
- **TITLE** — `[Category] Restaurant in [City] | [Business]`
- **H1** — `[Category] Restaurant in [City]` — natural language, do not stuff dishes in
- **MUST HAVE** — what the business is; the real city/neighborhood; formats offered
  (dine-in, takeout, delivery, catering, reservations); a few signature items; address,
  current hours, phone, map link; direct actions to view menu / order / reserve / get
  directions
- **SCHEMA** — `Restaurant` — the ONE canonical node with stable `@id`, address, geo,
  `openingHoursSpecification`, `priceRange`, `servesCuisine`, `hasMenu`, `sameAs`, and
  an `image` array (1x1, 4x3, 16x9) where real photos exist
- **LINKS OUT** — menu, dishes hub, every service page, visit, blog
- **GATE** — always

#### `/menu`
- **INTENT** — `[category] menu [city]`, `[business] menu`
- **TITLE** — `[Category] Menu in [City] | [Business]`
- **H1** — `Our Menu`
- **MUST HAVE** — crawlable HTML; a PDF is not a menu page. Every section and item name
  in the DOM (see the Phase 2 tab check). Descriptions. Prices where verified. A note
  that prices and availability may change.
- **SCHEMA** — `Restaurant → hasMenu → Menu → MenuSection[] → MenuItem[]`, covering
  **only the sections actually rendered into the DOM**
- **LINKS OUT** — item pages from their menu entries, category/dietary pages, order
- **GATE** — always. This is the primary organic asset.

#### `/visit` (or `/contact`)
- **INTENT** — `[business] address / hours / directions / parking`
- **TITLE** — `Visit [Business] — [Street], [City]`
- **H1** — `Visit Us in [Neighborhood], [City]`
- **MUST HAVE** — exact NAP; embedded map; hours including holiday exceptions; parking,
  transit, entrance and accessibility detail; phone and directions actions; landmarks
  that genuinely help someone arrive
- **SCHEMA** — `BreadcrumbList` only. Reference the home `@id`; never redeclare the
  business.
- **GATE** — always

#### `/about`
- **INTENT** — brand / navigational, `[business] story`
- **TITLE** — `About [Business] | [Category] in [City]`
- **MUST HAVE** — only verifiable history, people and credentials
- **GATE** — build only if the client supplies real material. **If they have not given
  you a founding date or an owner biography, do not invent one.**

### MENU EXPANSION — only with demand AND substance

#### `/dishes` (hub)
- **INTENT** — `[category] dishes [city]`, `signature [category] dishes`
- **TITLE** — `Signature [Category] Dishes in [City] | [Business]`
- **MUST HAVE** — a card per item page with real description and price; links to any
  category/dietary pages; order and visit actions
- **SCHEMA** — `ItemList` + `BreadcrumbList`
- **GATE** — build once there are 3+ item pages

#### `/dishes/[item]`
- **INTENT** — `[item] [city]`, `[item] near me`, `best [item] [city]`
- **TITLE** — `Best [Item] in [City] | [Business]`
- **H1** — `[Item] in [City]` — leave "Best" to the title so the page covers both the
  bare query and the "best" query rather than repeating one phrase twice
- **MUST HAVE** — what the item is (general background); how *this* business makes it,
  quoted from the live data; ingredients from that description; price and options where
  verified; 3–5 FAQs answering real searched questions (`[item] vs [item]` is usually a
  top autocomplete); address, hours, directions; order and call actions; links to 2–3
  related items
- **SCHEMA** — `Restaurant(@id) → hasMenu → MenuSection → MenuItem` with `Offer`, plus
  `BreadcrumbList` and `FAQPage` (every Q&A visible on the page)
- **LINKS OUT** — related items, hub, full menu, visit
- **GATE** — passes the Phase 1 intent check AND has more than a name, one sentence and
  an order button. Use the **searched** spelling in the slug even when the printed menu
  spells it differently, and state on the page that they are the same thing.

#### `/menu/[category]` — e.g. `/menu/curries`, `/menu/noodles`
- **TITLE** — `[Category] at [Business] | [Cuisine] in [City]`
- **MUST HAVE** — every item in the category with real descriptions; guidance that helps
  someone *choose* (heat, richness, what differs between them)
- **SCHEMA** — `MenuSection` + `BreadcrumbList` + `FAQPage`
- **GATE** — use *instead of* individual item pages when the category has demand but no
  single item does. **Never build both for the same items.**

#### `/[dietary]-[category]-[city]` — e.g. `/vegetarian-thai-seattle`
- **INTENT** — `vegetarian / vegan / gluten-free [category] [city]`
- **TITLE** — `Best [Dietary] [Category] Food in [City] | [Business]`
- **MUST HAVE** — items grouped by what the **menu says** is in them; a plain statement
  of what has *not* been verified; an instruction to ask; the phone number
- **SCHEMA** — `BreadcrumbList` + `FAQPage`
- **GATE** — real demand AND real options. **Never label an item vegetarian, vegan,
  gluten-free or halal on inference** — see Phase 4.

#### `/[category]-[distinctive-section]-[city]` — e.g. `/thai-street-food-seattle`
- **TITLE** — `Best [Section] in [City] | [Business]`
- **MUST HAVE** — the whole section read live from the menu data; why the category is
  distinct; FAQs; order and visit actions
- **SCHEMA** — `BreadcrumbList` + `FAQPage`
- **GATE** — only where the menu has a section competitors genuinely lack

### COMMERCIAL SERVICES — only if genuinely offered, with real facts

#### `/catering`
- **INTENT** — `[category] catering [city]`, `[category] catering near me`
- **TITLE** — `[Category] Catering in [City] | [Business]`
- **MUST HAVE** — packages and what is included; occasions served; service area;
  **minimums**; **lead time**; delivery vs drop-off vs full service; staffing; pricing
  basis; an inquiry path that works and is tracked
- **SCHEMA** — `Service` with `provider` → the home `@id`, plus `areaServed`,
  `BreadcrumbList` and `FAQPage`
- **GATE** — **ESCALATE FIRST.** Without minimums, lead time and coverage this page
  cannot be written honestly. Do not invent them.

#### `/catering/[city]`
- **GATE** — only when catering genuinely operates in that market AND the page can state
  boundaries, logistics, venues and a distinct inquiry path. This targets an **off-site
  service**, never a fake location.

#### `/private-events` (or `/private-dining`)
- **INTENT** — `[category] restaurant private dining [city]`, `private party venue`
- **MUST HAVE** — capacity, spaces, seated vs standing, packages, buyout terms,
  AV and accessibility, real photos, an inquiry action
- **SCHEMA** — `Service` + `BreadcrumbList` + `FAQPage`
- **GATE** — **ESCALATE FIRST** for capacity and packages

#### `/order-online`
- **INTENT** — `[category] takeout [city]`, `[category] delivery near me`
- **MUST HAVE** — pickup vs delivery; which providers, with direct links; delivery
  coverage; fees or minimums if stated; ordering hours where they differ from opening
  hours; tagged outbound links
- **SCHEMA** — `BreadcrumbList`. Add `potentialAction: OrderAction` on the home node only
  if the ordering URL is genuinely first-party.
- **GATE** — build when ordering exists. If ordering is only third-party this page still
  earns its place — it captures the query the aggregators currently own.

#### `/reservations`
- **MUST HAVE** — how to book (platform or phone); party size rules; hold and
  cancellation policy; large-group handling; accessibility
- **SCHEMA** — `BreadcrumbList`. Set `acceptsReservations` on the home node **only if
  true** — and never assert `false` without confirming it.
- **GATE** — build only if reservations are actually taken

#### `/lunch-specials`, `/happy-hour`, `/seasonal-menu`
- **GATE** — only if the offer is real AND someone will keep it current. A stale promo
  page is worse than no page. Confirm who owns updates before building it.

### LOCAL

#### `/near-[landmark]` — e.g. `/near-uw`
- **INTENT** — `[category] restaurant near [landmark]`
- **MUST HAVE** — genuine logistics: travel time, transit route, parking, and why the
  relationship is real
- **SCHEMA** — `BreadcrumbList` **only**. Never a second `Restaurant` node.
- **GATE** — one real landmark relationship. Not a template to repeat.

#### `/locations` + `/locations/[branch]`
- **GATE** — **multi-location only.** Each branch page gets its own address, geo, phone,
  hours, ordering and reservation links, branch menu differences, parking and
  accessibility, original photos, and its **own** `Restaurant` entity with a unique
  `@id`. Never put several branch addresses in one entity. Each eligible branch gets its
  own Business Profile listing.

> **Never build `/[category]-restaurant-[nearby-city]` when there is no branch there.**
> Copy with the place name swapped is a doorway page, named explicitly in Google's spam
> policies.

### CONTENT

#### `/blog` (or `/guides`)
- **MUST HAVE** — crawlable links to every post, real dates, excerpts
- **SCHEMA** — `Blog` + `BreadcrumbList`
- **GATE** — build if there are 3+ posts

#### `/blog/[slug]`
- **MUST HAVE** — a canonical on **this** domain (check it); one clear primary intent;
  the answer early; author and date; links into the relevant item, category and service
  pages
- **SCHEMA** — `BlogPosting` (headline, datePublished, image, author/publisher → business
  `@id`, mainEntityOfPage) + `BreadcrumbList`
- **NOTE** — existing posts are usually the strongest internal links available. Link item
  mentions already written in the copy to their pages by wrapping the existing words.
  **Do not rewrite the prose.**
- **BEST TOPICS** — `[item A] vs [item B]`, how to choose a `[category]`, how the kitchen
  handles spice levels, ordering for a group, the story of a genuine signature item.
  Avoid generic definitions that carry no business-specific expertise.

#### `/gallery`
- **MUST HAVE** — original photos with truthful alt text and descriptive filenames
- **SCHEMA** — `ImageObject`/`ItemList` only if captions and subjects are verifiable
- **GATE** — build when real photography exists

#### `/reviews`
- **GATE** — **ESCALATE FIRST**: which reviews may be reproduced, and under whose
  permission. Never add `AggregateRating` or `Review` markup the business wrote about
  itself.

### UTILITY — indexing is an editorial decision, not a side effect of routing

| Page | Directive | Sitemap | Notes |
|---|---|---|---|
| 404 | `noindex, follow` | excluded | Must be **routed**. Never a blank screen. Unknown dynamic slugs render this — they do not redirect. |
| `/thank-you`, confirmations | `noindex, follow` | excluded | |
| Raw content sources | `noindex` | excluded | Files fetched at runtime are duplicates of the page they feed |
| Mobile/desktop duplicate files | `noindex` or consolidate | excluded | They compete with each other |
| PDF menus | canonical to the HTML menu, or `noindex` | excluded | |
| Staging / preview | blocked entirely | excluded | |

---

## PHASE 4 — CONTENT RULES

Every fact on every page must trace to one of three sources:

1. the live menu / service data file
2. what the site already publishes (address, hours, ordering URL, socials)
3. general background about the dish, cuisine or service category itself

**NEVER invent:** awards, ratings, founding dates, years in business, sourcing claims,
spice levels, dietary certifications, capacity, minimums, lead times, delivery radius,
customer opinions, chef or owner biography.

**"Best [item] in [city]" IS allowed.** It is opinion, not a factual assertion, and it
matches real search demand. The rule:

> Say you are the best as often as you like. Never state a fact you cannot point at.

**Dietary claims are the exception with real-world consequences.** Do not label an item
vegetarian, vegan, gluten-free or halal on inference — many cuisines use fish sauce,
shrimp paste, oyster sauce, lard or shared fryers. Group items by what the menu *says*
is in them, state plainly what has not been verified, and tell people to ask.

Write for a customer deciding where to spend money, not for a crawler.

---

## PHASE 5 — STRUCTURED DATA

**One** canonical business entity with a stable `@id`, defined once in shared code and
rendered on the home page. Every other page references that `@id` instead of
redescribing the business.

| Page | Entities |
|---|---|
| Home | `Restaurant` / `LocalBusiness` — the canonical node |
| Menu | `Restaurant → hasMenu → Menu → MenuSection[] → MenuItem[]` |
| Item page | `MenuItem` + `Offer`, `BreadcrumbList`, `FAQPage` |
| Category / dietary | `BreadcrumbList`, `FAQPage` |
| Service page | `Service` (provider → business `@id`), `BreadcrumbList`, `FAQPage` |
| Blog post | `BlogPosting`, `BreadcrumbList` |
| Landmark / visit | `BreadcrumbList` only |
| Branch page | Its own entity, unique `@id` |

**Mark up only what is in the DOM.** If the menu renders four of eleven sections, the
schema describes four — derive both from the same shared constant so they cannot drift.
Every value must match the visible page.

---

## PHASE 6 — INTERNAL LINKING

**Ask the client whether the search landing pages belong in the navigation.** Many prefer
them out of the navbar. If so, keep at least two contextual paths — a footer block with
descriptive anchors, and links from the menu — because a page with no internal links is
an orphan: indexed, but crawled rarely and ranked weakly. Say this plainly so the choice
is informed rather than accidental.

- Hub pages link to every child page, and each child links back
- Menu entries link to their item pages
- Blog posts link into item, category and service pages
- Every page links to its logical parent and to a conversion action
- Descriptive anchor text, never "click here"
- No large repetitive footer block of location links

---

## PHASE 7 — VERIFY

**Never assert what you have not measured.**

- Render the JSON-LD and diff it against the visible page text
- Server-render components to **count** what is in the DOM, before and after
- When adding links to existing prose, strip tags from both versions and assert the text
  is byte-identical
- Crawl your own output to confirm every new page is reachable and every sitemap URL
  resolves
- Check title lengths, duplicate titles and duplicate descriptions
- Re-run the Phase 2 audit against the **built** output, not the source
- After deploying, download the live JS bundle and grep it for a string unique to the new
  code. **If it is absent, the deploy did not happen.**

---

## PHASE 8 — SHIP

- Branch. Never commit straight to the default branch.
- Typecheck, lint and build before committing.
- Generate the sitemap at build time from the route and content data so it cannot drift.
  Preserve existing `lastmod` values; stamp only new URLs. Google ignores `lastmod`
  entirely once it decides the values are unreliable.
- Commit a `SEO.md` documenting the architecture, the keyword-to-page map, what you
  deliberately did **not** build and why, and every open question. Without the "why not",
  the next person rebuilds the doorway pages you refused to.

Then tell the client the honest ceiling: for a local business the **map pack** usually
drives more customers than organic blue links, so the Business Profile, photos and
reviews outrank anything in the repo. Verify Search Console, submit the sitemap, watch
**impressions before positions**, and judge at 8–12 weeks, not next week.

---

## ESCALATE, DO NOT GUESS

Stop and ask the client about:

- any price you cannot verify against a live source
- contradictions between data files
- whether a menu section, combo or promotion still exists
- dietary, allergen and preparation claims
- catering minimums, lead times, delivery radius, event capacity
- whether reservations are actually accepted
- which reviews may be reproduced, and under whose permission
- deleting or redirecting files that may be handed out directly (QR codes, texted links)
- founding dates, awards, and anything about the chef, owner or family

---

## THE FOUR THAT GET SITES PENALISED OR CLIENTS EMBARRASSED

1. **A page per nearby city with one location.** Copy with the place name swapped is a
   doorway page. A landmark page — genuinely near a campus, stadium or airport — is fine
   when it carries real logistics.
2. **Publishing unverified prices.** They reach Google as `Offer` markup and customers as
   a promise. If the only price source is a file you proved is stale, escalate instead.
3. **Inferring dietary status.** Labelling a dish vegan because the description lists
   vegetables is the kind of mistake that gets someone hurt.
4. **Twenty thin item pages.** Five with real substance rank; twenty templated stubs is a
   doorway cluster. Restraint is the strategy, not a limitation.

---

## ADAPTING THIS

- **Multi-location clients** — add a `/locations` hub and one page per real branch, each
  with its own entity. Never put several branch addresses in one entity.
- **Non-restaurant local businesses** — swap items for services and the menu for a
  services hub. Phases 0, 2, 7 and the escalation list are unchanged; they are about
  verification, not cuisine.
- **Static or server-rendered sites** — Phase 2's crawlability and soft-404 checks get
  easier. Keep them anyway. A true 404 status becomes achievable, which an SPA cannot
  offer.
- **Clients with photography and reviews** — both were missing on the reference
  engagement and both would have outweighed the copy. If they exist, put them on the item
  pages first.

---

## REFERENCES

- [Google Search spam policies, including doorway abuse](https://developers.google.com/search/docs/essentials/spam-policies)
- [Crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Block indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Business Profile guide for restaurants](https://support.google.com/business/answer/14189260)
- [Business Profile local ranking factors](https://support.google.com/business/answer/7091)
