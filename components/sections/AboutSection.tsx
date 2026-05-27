'use client'

import Image from 'next/image'
import type { TabId } from '@/components/TabsClient'

interface Props {
  onTabChange?: (tab: TabId) => void
}

const VALUES = [
  {
    icon: '❧',
    title: 'Authentic Recipes',
    body: 'Every dish follows traditional Thai recipes, prepared with care and authenticity — the same way it would be made in Thailand.',
    alt: 'Authentic Thai recipes at Magnolia Thai Restaurant — traditional Thai cuisine prepared with care',
  },
  {
    icon: '✦',
    title: 'Finest Ingredients',
    body: 'We source galangal, lemongrass, kaffir lime, and holy basil fresh, alongside premium proteins and seasonal produce.',
    alt: 'Fresh Thai ingredients at Magnolia Thai — galangal, lemongrass, kaffir lime leaves, and holy basil sourced daily',
  },
  {
    icon: '◈',
    title: 'Craft & Tradition',
    body: 'From hand-ground curry pastes to slow-simmered broths, every element is prepared in-house with traditional Thai techniques.',
    alt: 'Traditional Thai cooking craft at Magnolia Thai — hand-ground curry pastes and slow-simmered broths made in-house',
  },
  {
    icon: '⊕',
    title: 'Warm Hospitality',
    body: 'Thai culture is rooted in generosity and care. From greeting to farewell, we aim to make every visit feel like coming home.',
    alt: 'Warm Thai hospitality at Magnolia Thai Restaurant Milwaukie — welcoming atmosphere inspired by Thai dining culture',
  },
]

export default function AboutSection({ onTabChange }: Props) {
  return (
    <section
      className="min-h-full bg-bg-primary"
      aria-label="About Magnolia Thai Restaurant Milwaukie Oregon"
    >
      <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">

        {/* ── Story header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">

          {/* Story image */}
          <div
            className="relative rounded-lg overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-96"
          >
            <Image
              src="/images/ourstoryhero.webp"
              alt="Magnolia Thai Restaurant interior — warm atmosphere with inviting decor at our Milwaukie, Oregon location"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>

          {/* Story copy */}
          <div>
            <p className="text-gold/45 text-[11px] uppercase tracking-[0.3em] font-sans mb-4">
              Est. 2010 · Milwaukie, Oregon
            </p>
            <h1 className="section-heading text-3xl md:text-4xl mb-6">Our Story</h1>
            <div className="space-y-4 text-gold/70 text-[15px] font-sans font-light leading-relaxed">
              <p>
                Magnolia Thai was born from a simple, heartfelt mission: to bring the true
                flavors of Thailand to the Milwaukie community. Our kitchen is rooted in
                traditional Thai cooking — where recipes are treasures, not shortcuts.
              </p>
              <p>
                Since opening on SE 32nd Ave in 2010, we have been committed to one promise:
                every dish is made with the same care and authenticity as it would be in Thailand.
                Fresh ingredients, hand-ground curry pastes, and slow-simmered broths — all
                prepared in-house, every day.
              </p>
              <p>
                Over fifteen years later, that promise remains the heart of everything we do.
              </p>
            </div>
            <div className="gold-divider mt-6 mb-5" />
            <blockquote className="italic text-gold/55 text-sm font-sans font-light border-l-2 border-gold-muted pl-4">
              &ldquo;We cook Thai food the way it should be — with tradition,
              fresh ingredients, and heart.&rdquo;
              <cite className="block text-gold/35 text-[11px] mt-1 not-italic uppercase tracking-wider">
                — Magnolia Thai Kitchen
              </cite>
            </blockquote>
          </div>
        </div>

        {/* ── Values ── */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="section-heading text-2xl md:text-3xl">The Magnolia Promise</h2>
            <div className="gold-divider mt-4 max-w-xs mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-bg-secondary border border-gold-muted rounded-lg p-5 hover:border-gold/40 transition-colors duration-300"
                aria-label={v.alt}
              >
                <div className="text-gold text-2xl mb-3 font-display" aria-hidden="true">{v.icon}</div>
                <h3 className="font-display text-gold-light text-base mb-2">{v.title}</h3>
                <p className="text-gold/55 text-[13px] font-sans font-light leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center py-8 border-t border-gold-muted">
          <p className="text-gold/55 text-sm font-sans mb-5">
            Ready to experience the flavors of Thailand?
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => onTabChange?.('contact')} className="btn-cta px-10 py-4">
              Order Online
            </button>
            <button onClick={() => onTabChange?.('menu')} className="btn-ghost px-10 py-4">
              View Menu
            </button>
          </div>
        </div>

        <div className="h-8" />
      </div>
    </section>
  )
}
