'use client'

import type { TabId } from '@/components/TabsClient'

interface Props {
  onTabChange?: (tab: TabId) => void
}

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

        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/videos/magnolia-hero.mp4" type="video/mp4" />
        </video>

        {/* 12% black overlay */}
        <div className="absolute inset-0 bg-black z-[1]" style={{ opacity: 0.12 }} aria-hidden="true" />

        {/* Vignette */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.72) 100%)' }}
          aria-hidden="true"
        />

        {/* ── Mobile hero (< sm): text over video ── */}
        <div className="sm:hidden absolute inset-0 z-10">

          {/* Gradient for readability */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-bg-primary/60 to-transparent pointer-events-none" />
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

        {/* ── Desktop hero (sm+): full-width content over video ── */}
        <div className="hidden sm:flex items-center absolute inset-0 z-10">

          {/* Gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/80 via-bg-primary/30 to-transparent pointer-events-none" />

          {/* Copy */}
          <div className="relative flex flex-col justify-center px-10 md:px-14 lg:px-20 max-w-2xl xl:max-w-3xl">
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
        </div>
      </div>

      {/* ── Info strip — vertical stack on mobile, horizontal on sm+ ── */}
      <div className="border-t border-gold-muted flex-shrink-0 overflow-y-auto sm:overflow-x-auto scrollbar-none">
        <div
          className="flex flex-col sm:flex-row lg:grid lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gold-muted anim-stagger"
        >

          {/* Visit Us */}
          <div className="px-4 sm:px-5 py-3 sm:py-5 sm:min-w-[150px] lg:min-w-0">
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
          <div className="px-4 sm:px-5 py-3 sm:py-5 sm:min-w-[160px] lg:min-w-0">
            <h2 className="font-display text-gold-light text-sm sm:text-[19px] mb-2 sm:mb-3">Find Us</h2>
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
          <div className="px-4 sm:px-5 py-3 sm:py-5 sm:min-w-[130px] lg:min-w-0">
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
