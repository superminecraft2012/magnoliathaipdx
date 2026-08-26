import { BUSINESS_ID, SITE_ORIGIN } from '@/lib/site'
import type { Faq } from '@/lib/landing-content'

/**
 * Schema for the landing pages.
 *
 * Every page references the ONE business entity by @id (defined in
 * lib/structured-data.ts and rendered on `/`) rather than redeclaring the
 * restaurant. A second Restaurant node for the same address would compete with
 * the first.
 *
 * No `Offer` and no `price` anywhere — prices are unverified. See SEO.md.
 */

export function breadcrumbList(trail: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_ORIGIN}${c.href === '/' ? '' : c.href}`,
    })),
  }
}

/** Only ever built from Q&As that are visible on the page. */
export function faqPage(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/**
 * The dish itself, hung off the existing business entity by @id.
 * No offers: the price is not verified.
 */
export function menuItemSchema(opts: {
  name: string
  description: string
  sectionName: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': BUSINESS_ID,
    hasMenu: {
      '@type': 'Menu',
      hasMenuSection: {
        '@type': 'MenuSection',
        name: opts.sectionName,
        hasMenuItem: {
          '@type': 'MenuItem',
          name: opts.name,
          description: opts.description,
          url: opts.url,
        },
      },
    },
  }
}

export function itemListSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: `${SITE_ORIGIN}${it.href}`,
    })),
  }
}
