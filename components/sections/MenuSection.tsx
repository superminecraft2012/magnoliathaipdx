'use client'

import { useState } from 'react'
import { LUNCH_CATEGORIES, ALLDAY_CATEGORIES, PROTEIN_OPTIONS, type MenuCategory } from '@/lib/menu-data'
import type { TabId } from '@/components/TabsClient'

interface Props {
  onTabChange?: (tab: TabId) => void
}

type MenuMode = 'all-day' | 'lunch'
type FilterId = string

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

function MenuItem({ item }: { item: MenuCategory['items'][0] }) {
  return (
    <div
      className={`flex items-start justify-between gap-4 py-3 border-b border-gold-muted/30 last:border-0 ${item.isOutOfStock ? 'opacity-40' : ''}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {item.itemNumber && (
            <span className="text-gold/35 text-[10px] font-sans uppercase tracking-wider flex-shrink-0">
              #{item.itemNumber}
            </span>
          )}
          <h3 className="font-display text-gold-light text-sm leading-tight">{item.name}</h3>
          {item.isSignature && (
            <span className="bg-gold/15 text-gold text-[9px] uppercase tracking-widest px-1.5 py-0.5 font-sans font-bold rounded-sm flex-shrink-0">
              Signature
            </span>
          )}
          {item.isOutOfStock && (
            <span className="bg-red-900/40 text-red-300 text-[9px] uppercase tracking-widest px-1.5 py-0.5 font-sans rounded-sm flex-shrink-0">
              Out of Stock
            </span>
          )}
        </div>
        <p className="text-gold/55 text-[12px] font-sans font-light leading-relaxed mt-1">
          {item.description}
        </p>
        <div className="flex items-center gap-2 flex-wrap mt-1.5">
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
      <span className="font-display text-gold text-sm flex-shrink-0 pt-0.5">
        {item.price > 0 ? `$${item.price}` : 'Ask'}
      </span>
    </div>
  )
}

export default function MenuSection({ onTabChange }: Props) {
  const [menuMode, setMenuMode] = useState<MenuMode>('all-day')
  const [activeFilter, setActiveFilter] = useState<FilterId>(() =>
    ALLDAY_CATEGORIES[0]?.id ?? ''
  )

  const categories = menuMode === 'lunch' ? LUNCH_CATEGORIES : ALLDAY_CATEGORIES
  const filters: { id: FilterId; label: string }[] = categories.map((c) => ({ id: c.id, label: c.name }))
  const visibleCategories = categories.filter((c) => c.id === activeFilter)

  return (
    <section className="min-h-full bg-bg-primary" aria-label="Magnolia Thai Restaurant menu">
      {/* Header bar */}
      <div className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm border-b border-gold-muted">
        <div className="px-4 sm:px-6 md:px-12 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="anim-slide-left section-heading text-xl sm:text-2xl md:text-3xl">Our Menu</h1>
              <p className="anim-fade-up delay-100 text-gold/45 text-[11px] sm:text-[12px] font-sans uppercase tracking-widest mt-1">
                Authentic Thai cuisine crafted with tradition
              </p>
            </div>
            <button
              onClick={() => onTabChange?.('contact')}
              className="btn-cta text-[10px] sm:text-[11px] px-5 py-2.5 sm:px-6 sm:py-3 self-start sm:self-auto"
              aria-label="Order online from Magnolia Thai Restaurant"
            >
              Order Online
            </button>
          </div>

          {/* Menu mode toggle */}
          <div className="flex gap-2 mt-3 sm:mt-4">
            {[
              { mode: 'all-day' as MenuMode, label: 'All Day', onSwitch: () => { setMenuMode('all-day'); setActiveFilter(ALLDAY_CATEGORIES[0].id) } },
              { mode: 'lunch' as MenuMode, label: 'Lunch', onSwitch: () => { setMenuMode('lunch'); setActiveFilter(LUNCH_CATEGORIES[0].id) } },
            ].map(({ mode, label, onSwitch }) => (
              <button
                key={mode}
                onClick={onSwitch}
                className={[
                  'px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-sans border rounded-sm transition-all duration-200',
                  menuMode === mode
                    ? 'bg-gold-light text-bg-primary border-gold-light font-bold'
                    : 'border-gold-muted text-gold/70 hover:border-gold/50 hover:text-gold',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Category filter tabs */}
          <div
            className="flex gap-1 mt-2 sm:mt-3 overflow-x-auto pb-px scrollbar-none"
            role="tablist"
            aria-label="Menu categories"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={activeFilter === f.id}
                onClick={() => setActiveFilter(f.id)}
                className={[
                  'flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.18em] font-sans',
                  'border transition-all duration-200 rounded-sm focus:outline-none',
                  'focus-visible:ring-1 focus-visible:ring-gold whitespace-nowrap',
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
      <div className="px-4 sm:px-6 md:px-12 py-6 sm:py-8 space-y-10 sm:space-y-12 anim-fade-up">
        {visibleCategories.map((category) => (
          <div key={category.id}>
            <div className="mb-4">
              <h2 className="anim-slide-left font-display text-gold-light text-2xl uppercase tracking-wider">
                {category.name}
              </h2>
              <p className="anim-fade-up delay-100 text-gold/45 text-sm font-sans mt-1">{category.description}</p>
              <div className="gold-divider mt-4 anim-line delay-200" />
            </div>

            <div className="anim-stagger">
              {category.items.map((item) => (
                <MenuItem key={item.id} item={item} />
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

        <div className="h-8" />
      </div>
    </section>
  )
}
