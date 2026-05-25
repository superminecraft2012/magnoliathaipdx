import type { Metadata, Viewport } from 'next'
import { Cinzel, Lato } from 'next/font/google'
import './globals.css'
import { structuredData } from '@/lib/structured-data'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'Magnolia Thai Restaurant | Authentic Thai Cuisine | Milwaukie, OR',
    template: '%s | Magnolia Thai Restaurant',
  },
  description:
    'Authentic, family-owned Thai restaurant in Milwaukie, Oregon. Savor traditional dishes — Pad Thai, Drunken Noodles, Pineapple Fried Rice, Massaman Curry, Tom Kha — crafted with family recipes and fresh local ingredients.',
  keywords: [
    'Thai restaurant Milwaukie Oregon',
    'authentic Thai food Portland',
    'pad thai Milwaukie',
    'drunken noodles Oregon',
    'pineapple fried rice',
    'massaman curry Portland',
    'tom kha Milwaukie',
    'Magnolia Thai',
    'Thai restaurant Oregon',
    'best Thai Milwaukie',
    'family Thai restaurant Portland',
    'Thai food SE Portland',
  ],
  authors: [{ name: 'Magnolia Thai Restaurant' }],
  creator: 'Magnolia Thai Restaurant',
  publisher: 'Magnolia Thai Restaurant',
  metadataBase: new URL('https://magnoliathai.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://magnoliathai.com',
    siteName: 'Magnolia Thai Restaurant',
    title: 'Magnolia Thai Restaurant | Authentic Thai Cuisine | Milwaukie, OR',
    description:
      'Authentic, family-owned Thai restaurant in Milwaukie, Oregon. Traditional recipes, fresh local ingredients, house-made sauces.',
    images: [
      {
        url: '/images/og-magnolia-thai.jpg',
        width: 1200,
        height: 630,
        alt: 'Magnolia Thai Restaurant Milwaukie Oregon — signature Pad Thai with tiger prawns and roasted peanuts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magnolia Thai Restaurant | Authentic Thai Cuisine | Milwaukie, OR',
    description:
      'Authentic, family-owned Thai restaurant in Milwaukie, Oregon. Traditional recipes, fresh local ingredients.',
    images: ['/images/og-magnolia-thai.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${lato.variable}`}>
      <head>
        {/* Restaurant JSON-LD schema — for Google, AI crawlers, voice search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
