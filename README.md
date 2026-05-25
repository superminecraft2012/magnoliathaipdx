# Magnolia Thai Restaurant — Website

Next.js 14 · Tailwind CSS 3 · TypeScript · Netlify

---

## Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build
```

---

## Architecture

**Tabbed SPA** — the navbar IS the navigation. Each tab fades in/out with CSS opacity. No full-page loads. Hash-based URLs (`/#menu`, `/#reservations`) for shareability, deep-linking, and back-button support.

```
app/
  layout.tsx          # Fonts, metadata, JSON-LD structured data
  page.tsx            # Thin server wrapper → TabsClient
  globals.css         # Tailwind + custom component classes

components/
  TabsClient.tsx      # 'use client' — tab state + hash routing
  layout/
    Header.tsx        # Logo + tab nav + mobile hamburger
  sections/
    HomeSection.tsx   # Hero + info grid (matches screenshot design)
    MenuSection.tsx   # Category-filtered menu grid
    ReservationsSection.tsx  # Booking form (Netlify Forms ready)
    AboutSection.tsx  # Story, values, team
    LocationSection.tsx      # Live open/closed, hours, map slot
    GallerySection.tsx       # Masonry grid + lightbox, filter tabs

lib/
  menu-data.ts        # All menu items with SEO alt text
  structured-data.ts  # JSON-LD schema (Restaurant + Menu)
```

---

## Adding Real Images

Every image has a code comment showing the exact `<Image>` tag to drop in. Search for `── IMAGE SLOT ──` or `── MAP SLOT ──`.

### Required images (drop into `/public/images/`)

| Filename | Where used | Recommended size |
|---|---|---|
| `hero-pad-thai.jpg` | Home hero (right column) | 1600×1200 |
| `og-magnolia-thai.jpg` | OpenGraph social preview | 1200×630 |
| `about-restaurant-interior.jpg` | About section | 1200×900 |
| `menu-*.jpg` | Menu cards (e.g. `menu-pad-thai.jpg`) | 600×400 |
| `gallery-*.jpg` | Gallery (e.g. `gallery-tom-yum.jpg`) | 1200×900 |
| `thumb-*.jpg` | Home signature thumbnails | 120×120 |
| `team-nakamura.jpg` / `team-prasert.jpg` | About team | 200×200 |
| `magnolia-logo.png` | Optional: replace SVG logo | 200×200 |

All `alt` / `aria-label` attributes are already written with SEO keywords. Just uncomment the `<Image>` tags.

---

## SEO & AI Scraping

- **JSON-LD** Restaurant schema in `<head>` — covers address, hours, menu sections, social, geo
- **Semantic HTML** — `<section>`, `<article>`, `<address>`, `<nav>`, `aria-label` throughout
- **All tab content stays in the DOM** (opacity:0, not display:none) — crawlers see every page
- **Alt text** on every image slot — keyword-rich, descriptive, includes restaurant name + location
- **Metadata** with `title`, `description`, `keywords`, `openGraph`, `twitter` in `app/layout.tsx`
- **Viewport meta**, `theme-color`, `canonical` URL configured

---

## Reservations (Netlify Forms)

The form has `data-netlify="true"` and a hidden `form-name` input. After deploying to Netlify, reservations will appear in the Netlify dashboard → Forms.

For a real booking system, replace the `setTimeout` in `handleSubmit` with a fetch to your booking API (OpenTable, Resy, or custom endpoint).

---

## Deploying to Netlify

1. Push to a GitHub repo
2. In Netlify → "Add new site" → "Import from Git"
3. Build command: `npm run build`
4. Publish directory: `.next`
5. The `@netlify/plugin-nextjs` in `netlify.toml` handles the rest automatically

---

## Customising Content

| Thing to change | File |
|---|---|
| Restaurant name, address, phone | `lib/structured-data.ts` + `components/sections/LocationSection.tsx` |
| Menu items + prices | `lib/menu-data.ts` |
| Colours (gold, bg) | `tailwind.config.ts` |
| Opening hours | `lib/structured-data.ts` + `LocationSection.tsx` |
| Social links | `components/sections/HomeSection.tsx` → `SOCIAL` array |
| About story / team | `components/sections/AboutSection.tsx` |
| SEO meta | `app/layout.tsx` |

---

## Design Tokens

```
Background:    #1a1a1a (primary)  #212121 (secondary)  #2a2a2a (tertiary)
Gold:          #d4a857 (default)  #e8c987 (light/headlines)  rgba(212,168,87,0.25) (muted/dividers)
Font display:  Playfair Display (Google Fonts, variable: --font-playfair)
Font sans:     Lato (Google Fonts, variable: --font-lato)
```
