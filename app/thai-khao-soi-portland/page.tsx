import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { KHAO_SOI_FAQS, khaoSoiItems } from '@/lib/landing-content'
import { breadcrumbList, faqPage } from '@/lib/landing-schema'
import { BUSINESS_ID, SITE_ORIGIN } from '@/lib/site'
import {
  Breadcrumbs,
  FaqSection,
  JsonLd,
  LandingFooter,
  LandingHeader,
  MobileActionBar,
  OrderActions,
  VisitBlock,
} from '@/components/landing/LandingChrome'

/**
 * The distinctive-section page from Phase 3.
 *
 * Gate: the menu has a Khao Soi selection competitors genuinely lack (seven
 * variants), and Phase 1 autocomplete for "khao soi", "khao soi portland" and
 * "khao soi near me" is pure restaurant intent with no recipe queries.
 *
 * Every variant below is read LIVE from lib/menu-data.ts, so this page cannot
 * drift from the menu.
 */

const TITLE = 'Best Khao Soi in Portland, OR | Magnolia Thai'
const DESCRIPTION =
  'Northern Thai Khao Soi in Milwaukie, minutes from SE Portland — seven versions including chicken, tofu, tempura, crispy pork belly, duck, salmon and braised beef. Order pickup or delivery.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/thai-khao-soi-portland' },
  openGraph: {
    type: 'article',
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_ORIGIN}/thai-khao-soi-portland`,
    images: [{ url: '/menu/14.webp', alt: 'Crispy pork belly Khao Soi at Magnolia Thai Restaurant' }],
  },
}

const trail = [
  { name: 'Home', href: '/' },
  { name: 'Khao Soi', href: '/thai-khao-soi-portland' },
]

export default function KhaoSoiPage() {
  const items = khaoSoiItems()

  // MenuSection schema describing exactly the variants rendered below.
  const sectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': BUSINESS_ID,
    hasMenu: {
      '@type': 'Menu',
      hasMenuSection: {
        '@type': 'MenuSection',
        name: 'Khao Soi Selection',
        description: 'Northern Thai curry noodle soup, served seven ways',
        url: `${SITE_ORIGIN}/thai-khao-soi-portland`,
        hasMenuItem: items.map((i) => ({
          '@type': 'MenuItem',
          name: i.name,
          description: i.description,
        })),
      },
    },
  }

  return (
    <>
      <JsonLd data={breadcrumbList(trail)} />
      <JsonLd data={faqPage(KHAO_SOI_FAQS)} />
      <JsonLd data={sectionSchema} />

      <LandingHeader />

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <Breadcrumbs trail={trail} />

        <h1 className="section-heading text-3xl sm:text-4xl md:text-5xl mt-6">
          Khao Soi in Portland, Oregon
        </h1>
        <div className="gold-divider mt-4 mb-8 max-w-[140px]" />

        <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 items-start">
          <div>
            <p className="text-gold/80 text-[16px] font-sans leading-relaxed">
              Khao Soi is the noodle dish of northern Thailand: a coconut curry broth over
              soft egg noodles, crowned with a nest of crisp fried egg noodles, with shallots
              and pickled mustard greens on the side to cut the richness.
            </p>
            <p className="text-gold/60 text-[15px] font-sans font-light leading-relaxed mt-4">
              Most Thai restaurants in the Portland area offer one Khao Soi, if any.{' '}
              <strong className="text-gold/85 font-normal">We make seven.</strong> Same
              northern-style curry base each time — shallots, pickled mustard and fried
              shallots served on top of crispy egg noodle — with your choice of what goes in
              the bowl.
            </p>
            <p className="text-gold/60 text-[15px] font-sans font-light leading-relaxed mt-4">
              We are at 10574 SE 32nd Ave in Milwaukie, immediately south of SE Portland and a
              short drive from Sellwood, Westmoreland and Oak Grove.
            </p>
            <div className="mt-6">
              <OrderActions label="Order Khao Soi" />
            </div>
          </div>

          {/* Square cut-out — contained, never cropped. See dishes/[slug]. */}
          <div className="relative w-full max-w-[400px] mx-auto md:mx-0 aspect-square">
            <Image
              src="/menu/14.webp"
              alt="Crispy pork belly Khao Soi — Northern Thai coconut curry broth topped with fried egg noodles, pickled mustard greens and red onion"
              fill
              className="object-contain"
              style={{ filter: 'drop-shadow(0 16px 28px rgba(0,0,0,0.55))' }}
              sizes="(max-width: 768px) 90vw, 400px"
              priority
            />
          </div>
        </div>

        <section aria-labelledby="variants-heading" className="mt-14">
          <h2 id="variants-heading" className="font-display text-gold-light text-2xl uppercase tracking-wider">
            Our Khao Soi, seven ways
          </h2>
          <div className="gold-divider mt-4 mb-6" />
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="border-b border-gold-muted/30 last:border-0 pb-4 last:pb-0">
                <h3 className="font-display text-gold-light text-[16px]">{item.name}</h3>
                <p className="text-gold/60 text-[14px] font-sans font-light leading-relaxed mt-1">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-gold/45 text-[12px] font-sans leading-relaxed mt-5">
            Prices are shown on our online ordering page, which is always current. Menu items
            and availability may change.
          </p>
        </section>

        <section aria-labelledby="choose-heading" className="mt-14">
          <h2 id="choose-heading" className="font-display text-gold-light text-2xl uppercase tracking-wider">
            Which one should you order?
          </h2>
          <div className="gold-divider mt-4 mb-6" />
          <div className="space-y-3 text-gold/60 text-[15px] font-sans font-light leading-relaxed">
            <p>
              <span className="text-gold/85">First time?</span> Chicken is the traditional
              version and the one to judge us by.
            </p>
            <p>
              <span className="text-gold/85">Want the richest bowl?</span> Crispy pork belly —
              the fat renders into the curry as you eat.
            </p>
            <p>
              <span className="text-gold/85">No meat?</span> Tofu. Note that it is still made
              with egg noodles, so it is vegetarian rather than vegan.
            </p>
            <p>
              <span className="text-gold/85">Something different?</span> Duck, salmon, braised
              beef or tempura — none of which you will find on a standard Khao Soi menu.
            </p>
          </div>
        </section>

        <FaqSection faqs={KHAO_SOI_FAQS} />

        <section className="mt-14">
          <h2 className="font-display text-gold-light text-2xl uppercase tracking-wider">
            Also worth ordering
          </h2>
          <div className="gold-divider mt-4 mb-6" />
          <ul className="grid sm:grid-cols-3 gap-4">
            {[
              { slug: 'pad-thai', name: 'Pad Thai' },
              { slug: 'pad-see-ew', name: 'Pad See Ew' },
              { slug: 'drunken-noodles', name: 'Drunken Noodles' },
            ].map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/dishes/${d.slug}`}
                  className="block border border-gold-muted rounded-lg p-4 hover:border-gold/50 transition-colors"
                >
                  <span className="font-display text-gold-light text-[15px]">{d.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-gold/60 text-[14px] font-sans mt-5 leading-relaxed">
            See every dish on the{' '}
            <Link href="/dishes" className="text-gold/80 hover:text-gold underline underline-offset-2">
              signature dishes page
            </Link>{' '}
            or the{' '}
            <Link href="/#menu" className="text-gold/80 hover:text-gold underline underline-offset-2">
              full Magnolia Thai menu
            </Link>
            .
          </p>
        </section>

        <VisitBlock />

        <p className="text-gold/45 text-[12px] font-sans leading-relaxed mt-8">
          Please tell us about any allergy when you order — our kitchen handles peanuts,
          shellfish, wheat, egg and fish sauce.
        </p>
      </main>

      <LandingFooter />
      <MobileActionBar />
    </>
  )
}
