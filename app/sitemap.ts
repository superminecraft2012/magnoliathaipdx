import type { MetadataRoute } from 'next'
import { DISH_PAGES } from '@/lib/landing-content'
import { SITE_ORIGIN } from '@/lib/site'

/**
 * Generated at build time from the route and content data, so it cannot drift
 * the way a hand-maintained sitemap does. Adding a dish to DISH_PAGES adds it
 * here automatically.
 *
 * `/` is the tabbed SPA — its #menu, #about, #gallery and #contact fragments
 * are NOT separate URLs and are deliberately not listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_ORIGIN}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_ORIGIN}/dishes`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_ORIGIN}/thai-khao-soi-portland`, changeFrequency: 'monthly', priority: 0.9 },
    ...DISH_PAGES.map((d) => ({
      url: `${SITE_ORIGIN}/dishes/${d.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
