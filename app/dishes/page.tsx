import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { DISH_PAGES, findItem, khaoSoiItems } from '@/lib/landing-content'
import { breadcrumbList, itemListSchema } from '@/lib/landing-schema'
import { SITE_ORIGIN } from '@/lib/site'
import {
  Breadcrumbs,
  JsonLd,
  LandingFooter,
  LandingHeader,
  MobileActionBar,
  OrderActions,
  VisitBlock,
} from '@/components/landing/LandingChrome'

/** Hub. Gate from Phase 3: build once there are 3+ item pages — there are 5. */

const TITLE = 'Signature Thai Dishes in Portland, OR | Magnolia Thai'
const DESCRIPTION =
  'The dishes Magnolia Thai is known for in Milwaukie and SE Portland — Northern Thai Khao Soi, Pad Thai, Pad See Ew, Drunken Noodles and Pineapple Fried Rice.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/dishes' },
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_ORIGIN}/dishes`,
  },
}

const trail = [
  { name: 'Home', href: '/' },
  { name: 'Dishes', href: '/dishes' },
]

export default function DishesHub() {
  const khaoSoiCount = khaoSoiItems().length

  const cards = [
    {
      href: '/thai-khao-soi-portland',
      name: 'Khao Soi',
      blurb: `Northern Thai curry noodle soup — coconut broth over soft egg noodles, topped with crispy egg noodles, shallots and pickled mustard greens. We serve ${khaoSoiCount} versions.`,
      image: {
        src: '/menu/14.webp',
        alt: 'Crispy pork belly Khao Soi in Northern Thai coconut curry broth with fried egg noodles',
      },
      feature: true,
    },
    ...DISH_PAGES.map((d) => {
      const item = findItem(d.itemId)
      return {
        href: `/dishes/${d.slug}`,
        name: item.name,
        blurb: item.description,
        image: d.image,
        feature: false,
      }
    }),
  ]

  return (
    <>
      <JsonLd data={breadcrumbList(trail)} />
      <JsonLd data={itemListSchema(cards.map((c) => ({ name: c.name, href: c.href })))} />

      <LandingHeader />

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <Breadcrumbs trail={trail} />

        <h1 className="section-heading text-3xl sm:text-4xl md:text-5xl mt-6">
          Signature Thai Dishes in Portland, Oregon
        </h1>
        <div className="gold-divider mt-4 mb-6 max-w-[140px]" />

        <p className="text-gold/70 text-[16px] font-sans leading-relaxed max-w-2xl">
          These are the dishes people come to Magnolia Thai for. We are at 10574 SE 32nd Ave
          in Milwaukie, immediately south of SE Portland — a short drive from Sellwood,
          Westmoreland and Oak Grove.
        </p>

        <div className="mt-6">
          <OrderActions />
        </div>

        <ul className="grid sm:grid-cols-2 gap-5 mt-12">
          {cards.map((c) => (
            <li key={c.href} className={c.feature ? 'sm:col-span-2' : undefined}>
              <Link
                href={c.href}
                className="group block border border-gold-muted rounded-lg overflow-hidden hover:border-gold/50 transition-colors h-full"
              >
                <div className={`relative ${c.feature ? 'aspect-[16/10] sm:aspect-[21/9]' : 'aspect-[4/3]'}`}>
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    fill
                    className="object-cover"
                    sizes={c.feature ? '(max-width: 640px) 100vw, 720px' : '(max-width: 640px) 100vw, 360px'}
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-display text-gold-light text-xl sm:text-lg group-hover:text-gold transition-colors">
                    {c.name}
                  </h2>
                  <p className="text-gold/60 text-[14px] font-sans font-light leading-relaxed mt-2">
                    {c.blurb}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-gold/60 text-[15px] font-sans leading-relaxed mt-10">
          This is a selection, not the whole menu — see the{' '}
          <Link href="/#menu" className="text-gold/80 hover:text-gold underline underline-offset-2">
            full Magnolia Thai menu
          </Link>{' '}
          for all our curries, stir fries, soups, salads and appetisers.
        </p>

        <VisitBlock />

        <p className="text-gold/45 text-[12px] font-sans leading-relaxed mt-8">
          Prices are shown on our online ordering page. Menu items and availability may
          change. Please tell us about any allergy when you order.
        </p>
      </main>

      <LandingFooter />
      <MobileActionBar />
    </>
  )
}
