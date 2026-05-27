'use client'

import Image from 'next/image'
import type { TabId } from '@/components/TabsClient'

interface Props {
  onTabChange?: (tab: TabId) => void
}

const SIGNATURES = [
  {
    label: 'Pad Thai',
    img: null as string | null,
    alt: 'Pad Thai — Magnolia Thai signature Bangkok-style stir-fried rice noodles with tiger prawns, organic egg, bean sprouts, and roasted peanuts',
  },
  {
    label: 'Pad See Ew',
    img: '/images/food/PadSeeEw.webp',
    alt: 'Pad See Ew — wide rice noodles wok-charred with egg, broccoli, carrots, and sweet dark soy sauce at Magnolia Thai Milwaukie',
  },
  {
    label: 'Red Curry',
    img: '/images/food/ThaiRedCurry.webp',
    alt: 'Thai Red Curry with coconut milk, bamboo shoots, bell peppers, kaffir lime leaves, and fresh basil at Magnolia Thai Milwaukie',
  },
  {
    label: 'Pineapple Rice',
    img: '/images/food/PineappleFriedRice.webp',
    alt: 'Pineapple Fried Rice with cashew nuts, peas, carrots, tomatoes, and pineapple at Magnolia Thai Milwaukie',
  },
]

const SOCIAL = [
  { label: 'Like Magnolia Thai Restaurant on Facebook', icon: 'f', href: 'https://www.facebook.com/Magnoliathaipdx/' },
  { label: 'Follow Magnolia Thai Restaurant on Instagram for food photos', icon: '◎', href: 'https://www.instagram.com/magnoliathaipdx/' },
  { label: 'Read Magnolia Thai Restaurant reviews on Yelp', icon: '★', href: 'https://www.yelp.com/biz/magnolia-thai-milwaukie' },
]

export default function HomeSection({ onTabChange }: Props) {
  return (
    <section
      className="flex flex-col min-h-[calc(100dvh-73px)]"
      aria-label="Magnolia Thai Restaurant — Welcome"
    >

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[58%_42%] relative overflow-hidden min-h-0">

        {/* Background watermark — logo as texture */}
        <div
          className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src="/images/logonotext.png"
            alt=""
            width={960}
            height={960}
            className="opacity-[0.06] mix-blend-luminosity"
            style={{ filter: 'grayscale(1) brightness(2.5)' }}
            priority
          />
        </div>

        {/* Left — copy */}
        <div className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-12 lg:py-0 z-10 relative">
          <p className="text-gold/55 text-[13px] uppercase tracking-[0.32em] mb-5 font-sans">
            Authentic Thai Cuisine · Milwaukie, Oregon
          </p>

          <h1 className="font-display text-gold-light uppercase leading-[1.08] tracking-wide mb-6 font-bold">
            <span className="block text-[clamp(2.6rem,4.6vw,5rem)]">The Heart of Bangkok,</span>
            <span className="block text-[clamp(2.6rem,4.6vw,5rem)]">Crafted With Tradition.</span>
          </h1>

          <p className="text-gold/70 text-[1.35rem] md:text-[1.45rem] max-w-[520px] mb-10 font-sans font-normal leading-relaxed">
            Savor authentic Thai dishes, prepared with passion and the finest
            ingredients — bringing the vibrant flavors of Thailand to Milwaukie since 2010.
          </p>

          <div className="flex flex-wrap gap-5">
            <button
              onClick={() => onTabChange?.('contact')}
              className="btn-cta text-[1rem] font-extrabold px-14 py-5"
              aria-label="Order delivery or pickup from Magnolia Thai Restaurant"
            >
              Order Online
            </button>
            <button
              onClick={() => onTabChange?.('menu')}
              className="btn-ghost text-[1rem] font-extrabold px-14 py-5"
              aria-label="View Magnolia Thai Restaurant's full menu"
            >
              View Menu
            </button>
          </div>
        </div>

        {/* Right — hero image */}
        <div className="hidden lg:block relative overflow-hidden">
          <Image
            src="/images/padseehero4k.png"
            alt="Pad See Ew — Magnolia Thai signature wide rice noodles stir fried with egg, broccoli, carrots, and sweet dark soy sauce"
            fill
            className="object-contain object-center"
            priority
            sizes="42vw"
          />
        </div>
      </div>

      {/* ── Info grid ─────────────────────────────────────────── */}
      <div className="border-t border-gold-muted flex-shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gold-muted">

          {/* Our Signatures */}
          <div className="px-5 py-5">
            <h2 className="font-display text-gold-light text-[19px] mb-3">Our Signatures</h2>
            <div
              className="flex gap-2 flex-wrap"
              role="list"
              aria-label="Magnolia Thai signature dishes"
            >
              {SIGNATURES.map((dish) => (
                <button
                  key={dish.label}
                  role="listitem"
                  onClick={() => onTabChange?.('menu')}
                  className={`relative w-[62px] h-[62px] rounded-md overflow-hidden flex-shrink-0 ${dish.img ? 'bg-bg-secondary' : 'bg-bg-secondary'} border border-gold-muted hover:border-gold/50 transition-all duration-200 hover:scale-105 group`}
                  title={dish.alt}
                  aria-label={`${dish.label} — view on menu`}
                >
                  {dish.img ? (
                    <Image src={dish.img} alt={dish.alt} fill className="object-cover" sizes="62px" />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(135deg,#2a1f0a,#1a1a1a)' }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="absolute inset-0 flex items-end p-1">
                    <span className="text-[7px] text-gold/45 uppercase tracking-wider leading-tight group-hover:text-gold/70 transition-colors font-sans">
                      {dish.label}
                    </span>
                  </span>
                  {/* Hidden span for screen readers / SEO crawlers */}
                  <span className="sr-only">{dish.alt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Visit Us */}
          <div className="px-5 py-5">
            <h2 className="font-display text-gold-light text-[19px] mb-3">Visit Us</h2>
            <address className="not-italic space-y-1.5">
              <p className="text-gold/70 text-sm font-sans leading-relaxed">
                10574 SE 32nd Ave<br />
                Milwaukie, OR 97222
              </p>
              <button
                onClick={() => onTabChange?.('contact')}
                className="text-gold/45 text-[11px] uppercase tracking-wider hover:text-gold transition-colors font-sans"
                aria-label="View location and directions to Magnolia Thai Restaurant"
              >
                Get directions →
              </button>
            </address>
          </div>

          {/* Contact */}
          <div className="px-5 py-5">
            <h2 className="font-display text-gold-light text-[19px] mb-3">Contact</h2>
            <div className="space-y-1.5">
              <p className="text-gold/60 text-[11px] uppercase tracking-wider font-sans">Get in Touch</p>
              <a
                href="tel:+15036590149"
                className="block text-gold/70 text-sm font-sans hover:text-gold transition-colors"
                aria-label="Call Magnolia Thai Restaurant on (503) 659-0149"
              >
                (503) 659-0149
              </a>
              <a
                href="https://www.facebook.com/Magnoliathaipdx/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gold/70 text-sm font-sans hover:text-gold transition-colors truncate"
                aria-label="Visit Magnolia Thai Restaurant on Facebook"
              >
                facebook.com/Magnoliathaipdx
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="px-5 py-5">
            <h2 className="font-display text-gold-light text-[19px] mb-2">Social</h2>
            <p className="text-gold/45 text-[11px] font-sans mb-3 uppercase tracking-wider">
              Follow our journey
            </p>
            <div className="flex gap-2.5">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full border border-gold-muted flex items-center justify-center text-gold text-xs hover:bg-gold hover:text-bg-primary hover:border-gold transition-all duration-200"
                >
                  <span aria-hidden="true">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
