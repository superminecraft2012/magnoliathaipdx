import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DISH_PAGES, categoryOf, dishBySlug, findItem } from '@/lib/landing-content'
import { breadcrumbList, faqPage, menuItemSchema } from '@/lib/landing-schema'
import { PROTEIN_OPTIONS } from '@/lib/menu-data'
import { SITE_ORIGIN } from '@/lib/site'
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

export function generateStaticParams() {
  return DISH_PAGES.map((d) => ({ slug: d.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const dish = dishBySlug(params.slug)
  if (!dish) return {}
  return {
    title: { absolute: dish.title },
    description: dish.description,
    alternates: { canonical: `/dishes/${dish.slug}` },
    openGraph: {
      type: 'article',
      title: dish.title,
      description: dish.description,
      url: `${SITE_ORIGIN}/dishes/${dish.slug}`,
      images: [{ url: dish.image.src, alt: dish.image.alt }],
    },
  }
}

export default function DishPage({ params }: { params: { slug: string } }) {
  const dish = dishBySlug(params.slug)
  if (!dish) notFound()

  // Name and description come from the LIVE menu data, never retyped here.
  const item = findItem(dish.itemId)
  const section = categoryOf(dish.itemId)
  const href = `/dishes/${dish.slug}`

  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Dishes', href: '/dishes' },
    { name: item.name, href },
  ]

  const related = dish.related
    .map((s) => dishBySlug(s))
    .filter((d): d is NonNullable<typeof d> => Boolean(d))

  return (
    <>
      <JsonLd data={breadcrumbList(trail)} />
      <JsonLd data={faqPage(dish.faqs)} />
      <JsonLd
        data={menuItemSchema({
          name: item.name,
          description: item.description,
          sectionName: section.name,
          url: `${SITE_ORIGIN}${href}`,
        })}
      />

      <LandingHeader />

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <Breadcrumbs trail={trail} />

        <h1 className="section-heading text-3xl sm:text-4xl md:text-5xl mt-6">{dish.h1}</h1>
        <div className="gold-divider mt-4 mb-8 max-w-[140px]" />

        <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 items-start">
          <div>
            {/* How WE make it — quoted from the live menu data */}
            <p className="text-gold/80 text-[16px] font-sans leading-relaxed">
              {item.description}.
            </p>
            {item.proteinOptions && (
              <p className="text-gold/60 text-[14px] font-sans mt-3 leading-relaxed">
                Choose your protein: {PROTEIN_OPTIONS.join(' · ')}. The price depends on
                which protein you pick — the current amount is shown when you order online.
              </p>
            )}
            {typeof item.spice === 'number' && (
              <p className="text-gold/60 text-[14px] font-sans mt-2 leading-relaxed">
                Our menu marks this dish at spice level {item.spice} of 3. We can adjust it
                — just tell us when you order.
              </p>
            )}
            <div className="mt-6">
              <OrderActions label={`Order ${item.name}`} />
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gold-muted">
            <Image
              src={dish.image.src}
              alt={dish.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
              priority
            />
          </div>
        </div>

        <section aria-labelledby="about-heading" className="mt-14">
          <h2 id="about-heading" className="font-display text-gold-light text-2xl uppercase tracking-wider">
            About {item.name}
          </h2>
          <div className="gold-divider mt-4 mb-6" />
          <div className="space-y-4">
            {dish.background.map((p) => (
              <p key={p.slice(0, 40)} className="text-gold/60 text-[15px] font-sans font-light leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>

        <FaqSection faqs={dish.faqs} />

        <section aria-labelledby="related-heading" className="mt-14">
          <h2 id="related-heading" className="font-display text-gold-light text-2xl uppercase tracking-wider">
            More from our menu
          </h2>
          <div className="gold-divider mt-4 mb-6" />
          <ul className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => {
              const ri = findItem(r.itemId)
              return (
                <li key={r.slug}>
                  <Link
                    href={`/dishes/${r.slug}`}
                    className="block border border-gold-muted rounded-lg p-4 hover:border-gold/50 transition-colors h-full"
                  >
                    <span className="font-display text-gold-light text-[15px] block">{ri.name}</span>
                    <span className="text-gold/60 text-[14px] font-sans font-light leading-relaxed block mt-1.5">
                      {ri.description}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <p className="text-gold/60 text-[14px] font-sans mt-5 leading-relaxed">
            Northern Thai curry noodles are our speciality —{' '}
            <Link href="/thai-khao-soi-portland" className="text-gold/80 hover:text-gold underline underline-offset-2">
              see the full Khao Soi selection
            </Link>
            , or browse the{' '}
            <Link href="/#menu" className="text-gold/80 hover:text-gold underline underline-offset-2">
              complete Magnolia Thai menu
            </Link>
            .
          </p>
        </section>

        <VisitBlock />

        <p className="text-gold/45 text-[12px] font-sans leading-relaxed mt-8">
          Menu items and availability may change. Please tell us about any allergy when you
          order — our kitchen handles peanuts, shellfish, wheat, egg and fish sauce.
        </p>
      </main>

      <LandingFooter />
      <MobileActionBar />
    </>
  )
}
