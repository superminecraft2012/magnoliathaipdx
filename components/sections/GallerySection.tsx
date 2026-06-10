'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import type { TabId } from '@/components/TabsClient'

interface Props {
  onTabChange?: (tab: TabId) => void
}

type FilterId = 'all' | 'food' | 'restaurant'

interface GalleryItem {
  id: string
  src: string
  alt: string
  caption: string
  filter: Exclude<FilterId, 'all'>
  span?: 2
}

const GALLERY: GalleryItem[] = [
  // Restaurant
  {
    id: 'dining-room',
    src: '/images/herosection.webp',
    alt: 'Magnolia Thai Restaurant dining room with warm golden lighting in Milwaukie, Oregon',
    caption: 'The Dining Room',
    filter: 'restaurant',
    span: 2,
  },
  {
    id: 'evening-atmosphere',
    src: '/images/ourstoryhero.webp',
    alt: 'Evening atmosphere at Magnolia Thai Restaurant — intimate dining with warm Thai decor in Milwaukie',
    caption: 'Evening Atmosphere',
    filter: 'restaurant',
  },
  {
    id: 'signature-dishes',
    src: '/images/menuhero.webp',
    alt: 'Magnolia Thai signature curry served in a traditional silver pot with jasmine rice',
    caption: 'Signature Dishes',
    filter: 'restaurant',
  },
  // Food — curries
  {
    id: 'panang-curry',
    src: '/images/1.png',
    alt: 'Panang Curry with tender beef, green beans, red peppers and rich coconut curry sauce at Magnolia Thai',
    caption: 'Panang Curry',
    filter: 'food',
  },
  {
    id: 'duck-curry',
    src: '/images/2.png',
    alt: 'Roasted Duck Curry in red curry with Thai basil and coconut milk at Magnolia Thai Milwaukie',
    caption: 'Duck Curry',
    filter: 'food',
  },
  {
    id: 'thai-red-curry',
    src: '/images/food/ThaiRedCurry.webp',
    alt: 'Thai Red Curry with coconut milk, bamboo shoots, bell peppers and kaffir lime leaves',
    caption: 'Thai Red Curry',
    filter: 'food',
  },
  {
    id: 'salmon-pumpkin-curry',
    src: '/images/6.png',
    alt: 'Salmon Pumpkin Curry — grilled salmon on pumpkin in Thai curry with broccoli and peas',
    caption: 'Salmon Pumpkin Curry',
    filter: 'food',
  },
  // Food — noodles
  {
    id: 'drunken-noodles',
    src: '/images/3.png',
    alt: 'Drunken Noodles — wide flat rice noodles stir fried with shrimp, beef, bell peppers and fresh basil',
    caption: 'Drunken Noodles',
    filter: 'food',
    span: 2,
  },
  {
    id: 'pad-thai',
    src: '/images/5.png',
    alt: 'Pad Thai — stir-fried rice noodles with shrimp, egg, bean sprouts, lime and ground peanuts',
    caption: 'Pad Thai',
    filter: 'food',
  },
  {
    id: 'khao-soi',
    src: '/images/7.png',
    alt: 'Khao Soi — Northern Thai curry noodles with crispy egg noodles, shallots and pickled mustard greens',
    caption: 'Khao Soi',
    filter: 'food',
  },
  {
    id: 'pad-thai-shrimp',
    src: '/images/11.png',
    alt: 'Pad Thai Shrimp — classic stir-fried rice noodles with tiger shrimp, lime and bean sprouts',
    caption: 'Pad Thai Shrimp',
    filter: 'food',
  },
  {
    id: 'pad-see-ew',
    src: '/images/food/PadSeeEw.webp',
    alt: 'Pad See Ew — wide rice noodles stir fried with egg, broccoli, carrots and sweet dark soy sauce',
    caption: 'Pad See Ew',
    filter: 'food',
  },
  // Food — mains & starters
  {
    id: 'garlic-beef',
    src: '/images/10.png',
    alt: 'Garlic Beef & Broccoli — tender beef with broccoli, carrots and savory oyster sauce',
    caption: 'Garlic Beef & Broccoli',
    filter: 'food',
  },
  {
    id: 'sweet-basil-chicken',
    src: '/images/12.png',
    alt: 'Sweet Basil Chicken — stir-fried with bell peppers, mushrooms and Thai basil, garnished with orchid',
    caption: 'Sweet Basil Chicken',
    filter: 'food',
  },
  {
    id: 'pineapple-fried-rice',
    src: '/images/food/PineappleFriedRice.webp',
    alt: 'Pineapple Fried Rice with cashew nuts, peas, carrots, tomatoes and pineapple',
    caption: 'Pineapple Fried Rice',
    filter: 'food',
  },
  {
    id: 'spring-rolls',
    src: '/images/8.png',
    alt: 'Crispy Fried Spring Rolls with sweet dipping sauce and fresh garnish at Magnolia Thai',
    caption: 'Spring Rolls',
    filter: 'food',
  },
  {
    id: 'crab-puffs',
    src: '/images/4.png',
    alt: 'Crab Puffs — fried dumplings filled with crab, cream cheese and vegetables with plum sauce',
    caption: 'Crab Puffs',
    filter: 'food',
  },
  {
    id: 'pot-stickers',
    src: '/images/9.png',
    alt: 'Pot Stickers — pan-fried dumplings with savory filling and Thai-style ginger soy sauce',
    caption: 'Pot Stickers',
    filter: 'food',
  },
]

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
  { id: 'restaurant', label: 'Restaurant' },
]

export default function GallerySection({ onTabChange }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')
  const [gridKey, setGridKey] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const touchStartX = useRef(0)

  const visible =
    activeFilter === 'all' ? GALLERY : GALLERY.filter((i) => i.filter === activeFilter)

  const handleFilterChange = useCallback((id: FilterId) => {
    setActiveFilter(id)
    setGridKey((k) => k + 1)
  }, [])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % visible.length : null))
  }, [visible.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + visible.length) % visible.length : null))
  }, [visible.length])

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, closeLightbox, goNext, goPrev])

  // Touch swipe in lightbox
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX
      if (diff > 50) goNext()
      else if (diff < -50) goPrev()
    },
    [goNext, goPrev],
  )

  const lightboxItem = lightboxIndex !== null ? visible[lightboxIndex] : null

  return (
    <section
      className="min-h-full bg-bg-primary"
      aria-label="Magnolia Thai Restaurant photo gallery"
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm border-b border-gold-muted">
        <div className="px-4 sm:px-6 md:px-12 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h1 className="anim-slide-left section-heading text-2xl md:text-3xl">Gallery</h1>
              <p className="anim-fade-up delay-100 text-gold/40 text-[11px] font-sans uppercase tracking-widest mt-1">
                The sights of Magnolia Thai
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

          {/* Filter row */}
          <div
            className="flex gap-1.5 overflow-x-auto pb-px scrollbar-none"
            role="tablist"
            aria-label="Gallery filters"
          >
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={activeFilter === f.id}
                onClick={() => handleFilterChange(f.id)}
                className={[
                  'flex-shrink-0 px-4 py-2 text-[11px] uppercase tracking-[0.18em] font-sans',
                  'border transition-all duration-200 rounded-sm focus:outline-none',
                  'focus-visible:ring-1 focus-visible:ring-gold',
                  activeFilter === f.id
                    ? 'bg-gold-light text-bg-primary border-gold-light font-bold'
                    : 'border-gold-muted text-gold/65 hover:border-gold/40 hover:text-gold',
                ].join(' ')}
              >
                {f.label}
                <span className="ml-1.5 opacity-50 text-[9px]">
                  {f.id === 'all'
                    ? GALLERY.length
                    : GALLERY.filter((i) => i.filter === f.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-3 sm:px-6 md:px-12 py-4 sm:py-6">
        <div
          key={gridKey}
          className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3"
        >
          {visible.map((item, idx) => (
            <div
              key={item.id}
              className={[
                'gallery-item group gallery-anim-in',
                item.span === 2 ? 'col-span-2' : '',
              ].join(' ')}
              style={{ animationDelay: `${Math.min(idx, 11) * 45}ms` }}
              onClick={() => openLightbox(idx)}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${item.caption}`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  item.span === 2 ? 'aspect-[16/9]' : 'aspect-square'
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes={
                    item.span === 2
                      ? '(max-width:768px) 100vw, (max-width:1280px) 66vw, 880px'
                      : '(max-width:640px) 50vw, (max-width:1280px) 33vw, 440px'
                  }
                  loading={idx < 4 ? 'eager' : 'lazy'}
                  priority={idx < 2}
                />
                {/* Caption overlay */}
                <div className="gallery-overlay">
                  <p className="text-white text-sm font-sans font-medium leading-tight">
                    {item.caption}
                  </p>
                </div>
                {/* Zoom icon */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-lg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gold/30 font-sans text-sm uppercase tracking-widest">
              No photos in this category.
            </p>
          </div>
        )}

        <div className="h-8" />
      </div>

      {/* Lightbox */}
      {lightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${lightboxItem.caption}`}
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close */}
          <button
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/35 text-[11px] font-sans uppercase tracking-widest pointer-events-none">
            {lightboxIndex + 1} / {visible.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-1 sm:left-4 z-10 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Previous photo"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-3xl mx-14 sm:mx-20 px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-square sm:aspect-[4/3]">
              <Image
                key={lightboxItem.id}
                src={lightboxItem.src}
                alt={lightboxItem.alt}
                fill
                className="object-contain lightbox-img-anim"
                sizes="(max-width:640px) 90vw, 80vw"
                priority
              />
            </div>
            <div className="mt-3 px-1 flex items-start justify-between gap-4">
              <p className="text-gold-light font-display text-base sm:text-lg leading-snug">
                {lightboxItem.caption}
              </p>
              <span className="text-white/20 text-[10px] font-sans uppercase tracking-widest sm:hidden flex-shrink-0 mt-1">
                Swipe to navigate
              </span>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-1 sm:right-4 z-10 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Next photo"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
