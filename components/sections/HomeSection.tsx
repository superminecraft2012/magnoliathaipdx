'use client'

import Image from 'next/image'
import type { TabId } from '@/components/TabsClient'

interface Props {
  onTabChange?: (tab: TabId) => void
}

const SIGNATURES = [
  {
    label: 'Pad Thai',
    img: '/images/5.png' as string | null,
    alt: 'Pad Thai — Magnolia Thai signature Bangkok-style stir-fried rice noodles with egg, bean sprouts, and roasted peanuts',
  },
  {
    label: 'Pad See Ew',
    img: '/images/food/PadSeeEw.webp',
    alt: 'Pad See Ew — wide rice noodles stir fried with egg, broccoli, carrots, and sweet dark soy sauce at Magnolia Thai Milwaukie',
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
  { label: 'Follow Magnolia Thai Restaurant on Instagram', icon: '◎', href: 'https://www.instagram.com/magnoliathaipdx/' },
  { label: 'Read Magnolia Thai Restaurant reviews on Yelp', icon: '★', href: 'https://www.yelp.com/biz/magnolia-thai-milwaukie' },
]

export default function HomeSection({ onTabChange }: Props) {
  return (
    <section
      className="flex flex-col overflow-hidden"
      style={{ height: 'calc(100dvh - 73px)' }}
      aria-label="Magnolia Thai Restaurant — Welcome"
    >

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden min-h-0">

        {/* Background watermark (all sizes) */}
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

        {/* ── Mobile hero (< sm): full-bleed food photo, text over it ── */}
        <div className="sm:hidden absolute inset-0 z-10">

          {/* Background: pad see ew as full-bleed texture */}
          <Image
            src="/images/padseehero4k.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            aria-hidden="true"
          />

          {/* Fade top transparent corners into page bg */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg-primary to-transparent pointer-events-none" />
          {/* Dark gradient so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent pointer-events-none" />

          {/* Copy + buttons — pinned to bottom */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
            <p className="anim-fade-up delay-0 text-gold/50 text-[9px] uppercase tracking-[0.3em] mb-2 font-sans">
              Authentic Thai · Milwaukie, OR
            </p>
            <h1 className="anim-fade-up delay-100 font-display text-gold-light uppercase leading-[1.08] tracking-wide mb-4 font-bold text-[1.9rem]">
              <span className="block">The Heart of Bangkok,</span>
              <span className="block">Crafted With Tradition.</span>
            </h1>
            <div className="anim-fade-up delay-300 flex flex-row gap-2.5">
              <button
                onClick={() => onTabChange?.('contact')}
                className="btn-cta text-[0.65rem] font-extrabold px-4 py-3 flex-1"
                aria-label="Order delivery or pickup from Magnolia Thai Restaurant"
              >
                Order Online
              </button>
              <button
                onClick={() => onTabChange?.('menu')}
                className="btn-ghost text-[0.65rem] font-extrabold px-4 py-3 flex-1"
                aria-label="View Magnolia Thai Restaurant's full menu"
              >
                View Menu
              </button>
            </div>
          </div>
        </div>

        {/* ── Desktop hero (sm+): side-by-side grid ── */}
        <div className="hidden sm:grid sm:grid-cols-[58%_42%] lg:grid-cols-[58%_42%] absolute inset-0 z-10">

          {/* Left — copy */}
          <div className="flex flex-col justify-center px-10 md:px-14 lg:px-16">
            <p className="anim-fade-up delay-0 text-gold/55 text-[13px] uppercase tracking-[0.32em] mb-4 font-sans">
              Authentic Thai · Milwaukie, OR
            </p>
            <h1 className="anim-fade-up delay-100 font-display text-gold-light uppercase leading-[1.08] tracking-wide mb-5 font-bold">
              <span className="block text-[clamp(1.25rem,4.5vw,5rem)]">The Heart</span>
              <span className="block text-[clamp(1.25rem,4.5vw,5rem)]">of Bangkok,</span>
              <span className="block text-[clamp(1.25rem,4.5vw,5rem)]">Crafted With</span>
              <span className="block text-[clamp(1.25rem,4.5vw,5rem)]">Tradition.</span>
            </h1>
            <p className="anim-fade-up delay-200 text-gold/70 text-base md:text-[1.2rem] max-w-[520px] mb-8 font-sans font-normal leading-relaxed">
              Savor authentic Thai dishes, prepared with passion and the finest
              ingredients — bringing the vibrant flavors of Thailand to Milwaukie since 2010.
            </p>
            <div className="anim-fade-up delay-300 flex gap-5">
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
          <div className="relative h-full overflow-hidden anim-slide-right delay-200 bg-black">
            <Image
              src="/images/padseehero4k.png"
              alt="Pad See Ew — Magnolia Thai signature wide rice noodles stir fried with egg, broccoli, carrots, and sweet dark soy sauce"
              fill
              className="object-contain object-center"
              priority
              sizes="(max-width:1024px) 42vw, 42vw"
            />
          </div>
        </div>
      </div>

      {/* ── Info strip — horizontal scroll on mobile ───────────── */}
      <div className="border-t border-gold-muted flex-shrink-0 overflow-x-auto scrollbar-none">
        <div
          className="flex lg:grid lg:grid-cols-4 divide-x divide-gold-muted anim-stagger"
          style={{ minWidth: 'max-content' }}
        >

          {/* Our Signatures */}
          <div className="px-4 sm:px-5 py-3 sm:py-5 min-w-[160px] lg:min-w-0">
            <h2 className="font-display text-gold-light text-sm sm:text-[19px] mb-2 sm:mb-3">Signatures</h2>
            <div
              className="flex gap-1 sm:gap-2"
              role="list"
              aria-label="Magnolia Thai signature dishes"
            >
              {SIGNATURES.map((dish) => (
                <button
                  key={dish.label}
                  role="listitem"
                  onClick={() => onTabChange?.('menu')}
                  className="relative w-[38px] h-[38px] sm:w-[62px] sm:h-[62px] rounded-md overflow-hidden flex-shrink-0 bg-bg-secondary border border-gold-muted hover:border-gold/50 transition-all duration-200 hover:scale-105 group"
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
                  <span className="sr-only">{dish.alt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Visit Us */}
          <div className="px-4 sm:px-5 py-3 sm:py-5 min-w-[150px] lg:min-w-0">
            <h2 className="font-display text-gold-light text-sm sm:text-[19px] mb-2 sm:mb-3">Visit Us</h2>
            <address className="not-italic space-y-1">
              <p className="text-gold/70 text-xs sm:text-sm font-sans leading-relaxed">
                10574 SE 32nd Ave<br />
                Milwaukie, OR 97222
              </p>
              <button
                onClick={() => onTabChange?.('contact')}
                className="text-gold/45 text-[10px] sm:text-[11px] uppercase tracking-wider hover:text-gold transition-colors font-sans"
                aria-label="View location and directions to Magnolia Thai Restaurant"
              >
                Get directions →
              </button>
            </address>
          </div>

          {/* Contact */}
          <div className="px-4 sm:px-5 py-3 sm:py-5 min-w-[160px] lg:min-w-0">
            <h2 className="font-display text-gold-light text-sm sm:text-[19px] mb-2 sm:mb-3">Contact</h2>
            <div className="space-y-1">
              <a
                href="tel:+15036590149"
                className="block text-gold/70 text-xs sm:text-sm font-sans hover:text-gold transition-colors"
                aria-label="Call Magnolia Thai Restaurant on (503) 659-0149"
              >
                (503) 659-0149
              </a>
              <a
                href="https://www.facebook.com/Magnoliathaipdx/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gold/70 text-xs sm:text-sm font-sans hover:text-gold transition-colors"
                aria-label="Visit Magnolia Thai Restaurant on Facebook"
              >
                /Magnoliathaipdx
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="px-4 sm:px-5 py-3 sm:py-5 min-w-[130px] lg:min-w-0">
            <h2 className="font-display text-gold-light text-sm sm:text-[19px] mb-2 sm:mb-3">Social</h2>
            <div className="flex gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gold-muted flex items-center justify-center text-gold text-xs hover:bg-gold hover:text-bg-primary hover:border-gold transition-all duration-200"
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
