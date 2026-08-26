/**
 * Single source of truth for every business fact the site publishes.
 *
 * Hours, NAP and ordering links live here ONCE so the visible page and the
 * JSON-LD cannot drift apart. Never hard-code these values in a component.
 */

/**
 * ⚠️ ESCALATION — CONFIRM BEFORE THE NEXT DEPLOY.
 *
 * This previously read `https://magnoliathai.com`. That domain belongs to a
 * DIFFERENT restaurant — Magnolia Thai of Magnolia, TEXAS (37125 FM 1774,
 * Magnolia TX 77355) — served from Google Sites. Pointing our canonical, OG
 * url and JSON-LD `url` at it told Google to index that business instead of
 * this one.
 *
 * Set to the origin this site is actually served from until the client
 * confirms the production domain. One-line change when they answer.
 */
export const SITE_ORIGIN = 'https://magnoliathaipdx.netlify.app'

/** Stable @id for the one canonical business entity. Never duplicate it. */
export const BUSINESS_ID = `${SITE_ORIGIN}/#restaurant`

export const BUSINESS = {
  name: 'Magnolia Thai Restaurant',
  alternateName: 'Magnolia Thai',
  streetAddress: '10574 SE 32nd Ave',
  addressLocality: 'Milwaukie',
  addressRegion: 'OR',
  postalCode: '97222',
  addressCountry: 'US',
  telephone: '+1-503-659-0149',
  telephoneDisplay: '(503) 659-0149',
  latitude: 45.4492,
  longitude: -122.6364,
  mapUrl:
    'https://www.google.com/maps/place/Magnolia+Thai+Restaurant/@45.4492,-122.6364,17z',
} as const

export const ORDER_URL = 'https://www.toasttab.com/local/order/magnoliathaipdx'

export const DELIVERY_PLATFORMS = [
  {
    name: 'UberEats',
    href: 'https://www.ubereats.com/store/magnolia-thai-restaurant/gHxL-23vRW2gkHHSCTKZEg',
    color: '#06C167',
  },
  {
    name: 'DoorDash',
    href: 'https://www.doordash.com/store/magnolia-thai-restaurant-milwaukie-26242298/34149152/',
    color: '#FF3008',
  },
  {
    name: 'Grubhub',
    href: 'https://www.grubhub.com/restaurant/magnolia-thai-restaurant-10574-se-32nd-ave-milwaukie/7313120',
    color: '#F63440',
  },
] as const

export const SOCIAL_PROFILES = [
  'https://www.facebook.com/Magnoliathaipdx/',
  'https://www.instagram.com/magnoliathaipdx/',
  'https://www.yelp.com/biz/magnolia-thai-milwaukie',
] as const

/**
 * Opening hours — the ONE definition.
 *
 * `LocationSection` renders these and `structured-data.ts` derives
 * `openingHoursSpecification` from them, so the visible hours and the schema
 * hours are the same data by construction.
 *
 * `service` entries are 24h "HH:MM" pairs, one per continuous service period.
 */
export interface HoursRow {
  /** Human label shown on the page */
  days: string
  /** schema.org dayOfWeek values this row covers */
  schemaDays: string[]
  /** Continuous service periods within the day */
  service: { label: string; opens: string; closes: string }[]
}

export const HOURS: HoursRow[] = [
  {
    days: 'Monday – Thursday',
    schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    service: [
      { label: 'Lunch', opens: '11:00', closes: '15:00' },
      { label: 'Dinner', opens: '16:00', closes: '21:00' },
    ],
  },
  {
    days: 'Friday',
    schemaDays: ['Friday'],
    service: [
      { label: 'Lunch', opens: '11:00', closes: '15:00' },
      { label: 'Dinner', opens: '16:00', closes: '22:00' },
    ],
  },
  {
    days: 'Saturday',
    schemaDays: ['Saturday'],
    service: [{ label: 'Open', opens: '12:00', closes: '22:00' }],
  },
  {
    days: 'Sunday',
    schemaDays: ['Sunday'],
    service: [{ label: 'Open', opens: '12:00', closes: '21:00' }],
  },
]
