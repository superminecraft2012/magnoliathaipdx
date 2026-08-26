import { ALLDAY_CATEGORIES } from '@/lib/menu-data'
import {
  BUSINESS,
  BUSINESS_ID,
  DELIVERY_PLATFORMS,
  HOURS,
  ORDER_URL,
  SITE_ORIGIN,
  SOCIAL_PROFILES,
} from '@/lib/site'

/**
 * The ONE canonical business entity.
 *
 * Rules this file exists to enforce:
 *  - exactly one Restaurant node, with a stable @id every other entity can
 *    reference — never a second node for the same address
 *  - openingHoursSpecification is DERIVED from the same HOURS constant the
 *    page renders, so the schema and the visible hours cannot drift
 *  - hasMenuSection is DERIVED from the menu data actually rendered into the
 *    DOM. It used to be a hand-written list of 9 sections while the page
 *    rendered 1; both now come from ALLDAY_CATEGORIES.
 *
 * Deliberately ABSENT, pending client verification — see SEO.md:
 *  - `offers` / `price` on MenuItem. Prices in menu-data.ts disagree with the
 *    printed menu in public/menu/Magnolia_Menu.md and could not be checked
 *    against the Toast ordering system. Unverified prices must not ship as
 *    Offer markup.
 *  - `acceptsReservations`. The reservations UI is commented out of
 *    TabsClient; we have no evidence either way, and asserting `false` is as
 *    much a claim as asserting `true`.
 *  - `suitableForDiet`. The dietary flags in menu-data.ts contradict the
 *    printed menu on 27 items.
 *  - `aggregateRating` / `review`. Never self-declared.
 */

const openingHoursSpecification = HOURS.flatMap((row) =>
  row.service.map((period) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: row.schemaDays,
    opens: period.opens,
    closes: period.closes,
  }))
)

const hasMenuSection = ALLDAY_CATEGORIES.map((category) => ({
  '@type': 'MenuSection',
  name: category.name,
  description: category.description,
  hasMenuItem: category.items.map((item) => ({
    '@type': 'MenuItem',
    name: item.name,
    description: item.description,
  })),
}))

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': BUSINESS_ID,
  name: BUSINESS.name,
  alternateName: BUSINESS.alternateName,
  // Google asks for 1x1, 4x3 and 16x9 crops of real photography. These replace
  // an 18 MB 4096x4096 PNG and a 5504x3072 WebP that Google was fetching raw.
  image: [
    `${SITE_ORIGIN}/images/padseehero-1x1.webp`,
    `${SITE_ORIGIN}/images/hero-4x3.webp`,
    `${SITE_ORIGIN}/images/hero-16x9.webp`,
  ],
  description:
    'Authentic, family-owned Thai restaurant in Milwaukie, Oregon, serving Northern Thai Khao Soi, curries, noodles and wok dishes made with house-ground curry pastes and slow-simmered broths.',
  url: SITE_ORIGIN,
  telephone: BUSINESS.telephone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.streetAddress,
    addressLocality: BUSINESS.addressLocality,
    addressRegion: BUSINESS.addressRegion,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
  },
  openingHoursSpecification,
  servesCuisine: ['Thai', 'Southeast Asian'],
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  hasMap: BUSINESS.mapUrl,
  hasMenu: {
    '@type': 'Menu',
    name: 'Magnolia Thai Restaurant Full Menu',
    url: `${SITE_ORIGIN}/#menu`,
    hasMenuSection,
  },
  potentialAction: {
    '@type': 'OrderAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: ORDER_URL,
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
      ],
    },
    deliveryMethod: [
      'http://purl.org/goodrelations/v1#DeliveryModePickUp',
      'http://purl.org/goodrelations/v1#DeliveryModeOwnFleet',
    ],
  },
  sameAs: [...SOCIAL_PROFILES, ...DELIVERY_PLATFORMS.map((p) => p.href)],
}
