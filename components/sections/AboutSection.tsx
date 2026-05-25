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
    body: "Every dish follows recipes passed down through generations from Bangkok's finest home kitchens, unchanged since the restaurant opened in 2010.",
    alt: 'Authentic Thai recipes at Magnolia Thai Restaurant — traditional Bangkok cuisine prepared by experienced chefs',
  },
  {
    icon: '✦',
    title: 'Finest Ingredients',
    body: 'We source galangal, lemongrass, kaffir lime, and holy basil fresh each morning, alongside premium proteins and seasonal produce.',
    alt: 'Fresh Thai ingredients at Magnolia Thai — galangal, lemongrass, kaffir lime leaves, and holy basil sourced daily',
  },
  {
    icon: '◈',
    title: 'Craft & Tradition',
    body: 'From hand-ground curry pastes to slow-simmered broths, every element is prepared in-house by chefs trained in Thailand.',
    alt: 'Traditional Thai cooking craft at Magnolia Thai — hand-ground curry pastes and slow-simmered broths made in-house',
  },
  {
    icon: '⊕',
    title: 'Warm Hospitality',
    body: 'Thai culture is rooted in generosity and care. From greeting to farewell, we aim to make every visit feel like coming home.',
    alt: 'Warm Thai hospitality at Magnolia Thai Restaurant London — welcoming atmosphere inspired by Bangkok\'s finest dining culture',
  },
]

const TEAM = [
  {
    name: 'Chef Siriporn Nakamura',
    role: 'Head Chef & Co-founder',
    bio: 'Born and raised in Bangkok, Chef Siriporn trained under her grandmother before moving to London in 2007. She brings 25 years of authentic Thai cooking to every dish.',
    alt: 'Chef Siriporn Nakamura — Head Chef and co-founder of Magnolia Thai Restaurant London, trained in authentic Bangkok cuisine',
  },
  {
    name: 'Thanom Prasert',
    role: 'Co-founder & Front of House',
    bio: 'Thanom oversees the dining experience with the same warmth and attention to detail he grew up with in his family\'s Bangkok restaurant.',
    alt: 'Thanom Prasert — co-founder of Magnolia Thai Restaurant London, ensuring authentic Thai hospitality for every guest',
  },
]

export default function AboutSection({ onTabChange }: Props) {
  return (
    <section
      className="min-h-full bg-bg-primary"
      aria-label="About Magnolia Thai Restaurant London"
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
              alt="Magnolia Thai Restaurant dining room — warm evening atmosphere with rattan pendant lamps, floral wall arrangements, and intimate wooden furniture setting in our London restaurant"
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
                Magnolia Thai was born from a simple, heartfelt mission: to bring the true tastes
                of Bangkok to Milwaukie. Our founders, Chef Siriporn Nakamura and Thanom Prasert,
                grew up in families where cooking was an act of love — where recipes were
                treasures, not transactions.
              </p>
              <p>
                When they arrived in Milwaukie, they found Thai food everywhere, but Bangkok’s
                soul was harder to find. So in 2010, they opened Magnolia Thai on SE 32nd Ave —
                a small space with a big promise: every dish would be made exactly
                as it would be in Thailand.
              </p>
              <p>
                Fifteen years on, that promise remains the heart of everything we do.
              </p>
            </div>
            <div className="gold-divider mt-6 mb-5" />
            <blockquote className="italic text-gold/55 text-sm font-sans font-light border-l-2 border-gold-muted pl-4">
              &ldquo;We don&apos;t adapt Thai food for Western palates — we invite Western
              palates to experience Thailand.&rdquo;
              <cite className="block text-gold/35 text-[11px] mt-1 not-italic uppercase tracking-wider">
                — Chef Siriporn Nakamura, Co-founder
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

        {/* ── Team ── */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="section-heading text-2xl md:text-3xl">Our Team</h2>
            <div className="gold-divider mt-4 max-w-xs mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="flex gap-5 bg-bg-secondary border border-gold-muted rounded-lg p-5"
              >
                {/* Avatar placeholder */}
                <div
                  className="w-16 h-16 rounded-full flex-shrink-0 bg-bg-tertiary border border-gold-muted flex items-center justify-center"
                  role="img"
                  aria-label={member.alt}
                >
                  {/*
                    Replace with:
                    <Image src={`/images/team-${member.name.split(' ')[1].toLowerCase()}.jpg`}
                      alt={member.alt} width={64} height={64} className="rounded-full object-cover" />
                  */}
                  <span className="text-gold/30 text-xs font-display" aria-hidden="true">
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-gold-light text-base">{member.name}</h3>
                  <p className="text-gold/45 text-[11px] uppercase tracking-wider font-sans mb-2">{member.role}</p>
                  <p className="text-gold/60 text-[13px] font-sans font-light leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center py-8 border-t border-gold-muted">
          <p className="text-gold/55 text-sm font-sans mb-5">
            Ready to experience the heart of Bangkok?
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => onTabChange?.('reservations')} className="btn-cta px-10 py-4">
              Book a Table
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
