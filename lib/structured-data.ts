export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Magnolia Thai Restaurant',
  alternateName: 'Magnolia Thai',
  image: [
    'https://magnoliathai.com/images/hero-pad-thai.jpg',
    'https://magnoliathai.com/images/restaurant-interior.jpg',
  ],
  description:
    'Authentic, family-owned Thai restaurant in Milwaukie, Oregon. Crafting traditional dishes using time-honored family recipes, fresh local ingredients, and house-made sauces and broths.',
  url: 'https://magnoliathai.com',
  telephone: '+1-503-659-0149',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '10574 SE 32nd Ave',
    addressLocality: 'Milwaukie',
    addressRegion: 'OR',
    postalCode: '97222',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.4492,
    longitude: -122.6364,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '11:00',
      closes: '15:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '16:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '11:00',
      closes: '15:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '16:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '12:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '12:00',
      closes: '21:00',
    },
  ],
  servesCuisine: ['Thai', 'Bangkok cuisine', 'Southeast Asian'],
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  acceptsReservations: 'True',
  hasMap: 'https://www.google.com/maps/place/Magnolia+Thai+Restaurant/@45.4492,-122.6364,17z',
  hasMenu: {
    '@type': 'Menu',
    name: 'Magnolia Thai Restaurant Full Menu',
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Starters',
        description: 'Traditional Thai appetizers including spring rolls, satay, and fish cakes',
      },
      {
        '@type': 'MenuSection',
        name: 'Soups',
        description: 'Authentic Thai soups including Tom Kha and Tom Yum',
      },
      {
        '@type': 'MenuSection',
        name: 'Curries',
        description: 'Slow-cooked Thai curries: green curry, red curry, Massaman, and Panang',
      },
      {
        '@type': 'MenuSection',
        name: 'Noodles & Rice',
        description: 'Classic Thai wok dishes including Pad Thai, Drunken Noodles, and Pineapple Fried Rice',
      },
      {
        '@type': 'MenuSection',
        name: 'Desserts',
        description: 'Traditional Thai sweets including mango sticky rice and coconut desserts',
      },
    ],
  },
  sameAs: [
    'https://www.facebook.com/Magnoliathaipdx/',
    'https://www.instagram.com/magnoliathaipdx/',
    'https://www.yelp.com/biz/magnolia-thai-milwaukie',
  ],
  keywords:
    'Thai restaurant Milwaukie Oregon, authentic Thai food Portland, pad thai, drunken noodles, pineapple fried rice, massaman curry, tom kha, Thai dining Oregon',
}
