'use client'

import { useState } from 'react'
import Image from 'next/image'
import { LUNCH_CATEGORIES, ALLDAY_CATEGORIES, PROTEIN_OPTIONS, type MenuCategory } from '@/lib/menu-data'
import type { TabId } from '@/components/TabsClient'

const DISH_IMAGES: Record<string, string> = {
  'pad-see-ew': '/images/food/PadSeeEw.webp',
  'red-curry': '/images/food/ThaiRedCurry.webp',
}

interface Props {
  onTabChange?: (tab: TabId) => void
}

type MenuMode = 'all-day' | 'lunch'
type FilterId = 'all' | string

function SpiceDots({ level }: { level?: 1 | 2 | 3 }) {
  if (!level) return null
  return (
    <span className="flex gap-0.5 items-center" aria-label={`Spice level: ${level} of 3`}>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`inline-block w-1.5 h-1.5 rounded-full transition-opacity ${
            n <= level ? 'bg-red-500/80' : 'bg-red-900/30'
          }`}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

function MenuCard({ item, categoryName, imgSrc }: { item: MenuCategory['items'][0]; categoryName: string; imgSrc?: string }) {
  return (
    <article
      className={`menu-card ${item.isOutOfStock ? 'opacity-50' : ''}`}
      aria-label={`${item.name} — $${item.price}`}
    >
      {/* Dish image slot */}
      <div className="relative h-36 overflow-hidden">
        {imgSrc ? (
          <>
            <Image
              src={imgSrc}
              alt={item.seoAlt}
              fill
              className="object-cover"
              sizes="(max-width:768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/20 to-transparent" />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg,#281e08 0%,#1c1c1c 100%)' }}
              role="img"
              aria-label={item.seoAlt}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gold/10 text-[10px] uppercase tracking-widest font-sans text-center px-2">
                {item.name}
              </span>
            </div>
          </>
        )}
        {/* Signature badge */}
        {item.isSignature && (
          <div className="absolute top-2 left-2 bg-gold/90 text-bg-primary text-[9px] uppercase tracking-widest px-2 py-0.5 font-sans font-bold rounded-sm">
            Signature
          </div>
        )}
        {/* Out of stock badge */}
        {item.isOutOfStock && (
          <div className="absolute top-2 right-2 bg-red-900/80 text-red-200 text-[9px] uppercase tracking-widest px-2 py-0.5 font-sans font-bold rounded-sm">
            Out of Stock
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <h3 className="font-display text-gold-light text-base leading-tight">{item.name}</h3>
            {item.itemNumber && (
              <p className="text-gold/40 text-[11px] font-sans mt-0.5">#{item.itemNumber}</p>
            )}
          </div>
          <span className="font-display text-gold text-base flex-shrink-0">
            {item.price > 0 ? `$${item.price}` : 'Ask'}
          </span>
        </div>

        <p className="text-gold/60 text-[13px] font-sans font-light leading-relaxed mt-2 mb-3">
          {item.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <SpiceDots level={item.spice} />
          {item.isVegan && (
            <span className="tag-pill text-emerald-400/70 border-emerald-900/60">V</span>
          )}
          {item.isGlutenFree && (
            <span className="tag-pill text-sky-400/70 border-sky-900/60">GF</span>
          )}
          {item.proteinOptions && (
            <span className="text-gold/35 text-[10px] font-sans uppercase tracking-wider">
              Choose protein
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default function MenuSection({ onTabChange }: Props) {
  const [menuMode, setMenuMode] = useState<MenuMode>('all-day')
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')

  const categories = menuMode === 'lunch' ? LUNCH_CATEGORIES : ALLDAY_CATEGORIES

  const filters: { id: FilterId; label: string }[] = [
    { id: 'all', label: 'All' },
    ...categories.map((c) => ({ id: c.id, label: c.name })),
  ]

  const visibleCategories =
    activeFilter === 'all'
      ? categories
      : categories.filter((c) => c.id === activeFilter)

  return (
    <section className="min-h-full bg-bg-primary" aria-label="Magnolia Thai Restaurant menu">
      {/* Header bar */}
      <div className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm border-b border-gold-muted">
        <div className="px-6 md:px-12 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="section-heading text-2xl md:text-3xl">Our Menu</h1>
              <p className="text-gold/45 text-[12px] font-sans uppercase tracking-widest mt-1">
                Authentic Thai cuisine crafted with tradition
              </p>
            </div>
            <button
              onClick={() => onTabChange?.('reservations')}
              className="btn-cta text-[11px] px-6 py-3 self-start sm:self-auto"
              aria-label="Book a table at Magnolia Thai Restaurant"
            >
              Book a Table
            </button>
          </div>

          {/* Menu mode toggle */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => { setMenuMode('all-day'); setActiveFilter('all') }}
              className={[
                'px-4 py-2 text-[11px] uppercase tracking-[0.18em] font-sans border rounded-sm transition-all duration-200',
                menuMode === 'all-day'
                  ? 'bg-gold-light text-bg-primary border-gold-light font-bold'
                  : 'border-gold-muted text-gold/70 hover:border-gold/50 hover:text-gold',
              ].join(' ')}
            >
              All Day Menu
            </button>
            <button
              onClick={() => { setMenuMode('lunch'); setActiveFilter('all') }}
              className={[
                'px-4 py-2 text-[11px] uppercase tracking-[0.18em] font-sans border rounded-sm transition-all duration-200',
                menuMode === 'lunch'
                  ? 'bg-gold-light text-bg-primary border-gold-light font-bold'
                  : 'border-gold-muted text-gold/70 hover:border-gold/50 hover:text-gold',
              ].join(' ')}
            >
              Lunch Menu
            </button>
          </div>

          {/* Category filter tabs */}
          <div
            className="flex gap-1 mt-3 overflow-x-auto pb-px"
            role="tablist"
            aria-label="Menu categories"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={activeFilter === f.id}
                onClick={() => setActiveFilter(f.id)}
                className={[
                  'flex-shrink-0 px-4 py-2 text-[11px] uppercase tracking-[0.18em] font-sans',
                  'border transition-all duration-200 rounded-sm focus:outline-none',
                  'focus-visible:ring-1 focus-visible:ring-gold',
                  activeFilter === f.id
                    ? 'bg-gold-light text-bg-primary border-gold-light font-bold'
                    : 'border-gold-muted text-gold/70 hover:border-gold/50 hover:text-gold',
                ].join(' ')}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu content */}
      <div className="px-6 md:px-12 py-8 space-y-12">
        {visibleCategories.map((category) => (
          <div key={category.id}>
            <div className="mb-6">
              <h2 className="font-display text-gold-light text-2xl uppercase tracking-wider">
                {category.name}
              </h2>
              <p className="text-gold/45 text-sm font-sans mt-1">{category.description}</p>
              <div className="gold-divider mt-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.items.map((item) => (
                <MenuCard key={item.id} item={item} categoryName={category.name} imgSrc={DISH_IMAGES[item.id]} />
              ))}
            </div>
          </div>
        ))}

        {/* Protein options note */}
        <div className="border border-gold-muted rounded-lg p-5 bg-bg-secondary">
          <h3 className="font-display text-gold-light text-base mb-2">Protein Options</h3>
          <p className="text-gold/60 text-sm font-sans mb-3">
            Dishes marked &ldquo;Choose protein&rdquo; are available with:
          </p>
          <div className="flex flex-wrap gap-2">
            {PROTEIN_OPTIONS.map((p) => (
              <span key={p} className="tag-pill text-gold/70">
                {p}
              </span>
            ))}
          </div>
          <p className="text-gold/40 text-xs font-sans mt-3">
            Please inform your server of any allergies or dietary requirements.
            V = Vegan · GF = Gluten Free
          </p>
        </div>

        {/* Bottom padding */}
        <div className="h-8" />
      </div>
    </section>
  )
}
