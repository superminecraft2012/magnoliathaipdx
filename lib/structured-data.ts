export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Magnolia Thai Restaurant',
  alternateName: 'Magnolia Thai',
  image: [
    'https://magnoliathai.com/images/padseehero4k.png',
    'https://magnoliathai.com/images/herosection.webp',
  ],
  description:
    'Authentic, family-owned Thai restaurant in Milwaukie, Oregon. Crafting traditional dishes using time-honored family recipes, fresh ingredients, and house-made sauces and broths since 2010.',
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
  servesCuisine: ['Thai', 'Southeast Asian'],
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  hasMap: 'https://www.google.com/maps/place/Magnolia+Thai+Restaurant/@45.4492,-122.6364,17z',
  hasMenu: {
    '@type': 'Menu',
    name: 'Magnolia Thai Restaurant Full Menu',
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Special Menu',
        description: 'Chef signature dishes including Duck Curry, Salmon Pumpkin Curry, and Crispy Basil Shrimp',
      },
      {
        '@type': 'MenuSection',
        name: 'Chef Recommend',
        description: 'Northern Thai Khao Soi noodles with multiple protein options and Massaman Beef Curry',
      },
      {
        '@type': 'MenuSection',
        name: 'Appetizer',
        description: 'Thai starters including Spring Rolls, Chicken Satay, Crab Puffs, and Coconut Shrimp',
      },
      {
        '@type': 'MenuSection',
        name: 'Soup',
        description: 'Authentic Thai soups including Tom Kha, Tom Yum, and Wonton Soup',
      },
      {
        '@type': 'MenuSection',
        name: 'Stir Fry',
        description: 'Wok-fired dishes including King Rama, Cashew Nut, Sweet Basil (Pad Kra Pao), and Pad Prik-Khing',
      },
      {
        '@type': 'MenuSection',
        name: 'Noodles',
        description: 'Classic Thai noodle dishes including Pad Thai, Pad See Ew, Drunken Noodles, and Sesame Yakisoba',
      },
      {
        '@type': 'MenuSection',
        name: 'Curry',
        description: 'Thai curries including Red, Yellow, Pumpkin, Massaman, Mango, and Panang Curry',
      },
      {
        '@type': 'MenuSection',
        name: 'Fried Rice',
        description: 'Wok-fried jasmine rice dishes including Pineapple, Basil, and Duck Fried Rice',
      },
      {
        '@type': 'MenuSection',
        name: 'Dessert',
        description: 'Thai sweets including Mango Sticky Rice and Chocolate Lava Cake',
      },
    ],
  },
  sameAs: [
    'https://www.facebook.com/Magnoliathaipdx/',
    'https://www.instagram.com/magnoliathaipdx/',
    'https://www.yelp.com/biz/magnolia-thai-milwaukie',
  ],
  keywords:
    'Thai restaurant Milwaukie Oregon, authentic Thai food Portland, pad thai, drunken noodles, khao soi, pineapple fried rice, massaman curry, tom kha, Thai dining Oregon, Thai food near me',
}
