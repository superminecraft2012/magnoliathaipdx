'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { TabId } from '@/components/TabsClient'

interface Props {
  onTabChange?: (tab: TabId) => void
}

type GalleryFilter = 'all' | 'food' | 'restaurant' | 'events'

interface GalleryItem {
  id: string
  filter: GalleryFilter
  /** CSS grid span: 1 or 2 */
  span?: 2
  imgSrc?: string
  lightBg?: boolean  // for white-background product shots
  seoAlt: string
  caption: string
  /** Aspect ratio class */
  aspect: string
}

const GALLERY: GalleryItem[] = [
  {
    id: 'dining-room',
    filter: 'restaurant',
    span: 2,
    imgSrc: '/images/herosection.webp',
    seoAlt:
      'Magnolia Thai Restaurant dining room — warm golden lighting and inviting atmosphere at our Milwaukie, Oregon location',
    caption: 'The Dining Room',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 'pad-see-ew',
    filter: 'food',
    imgSrc: '/images/food/PadSeeEw.webp',
    lightBg: true,
    seoAlt:
      'Pad See Ew — wide rice noodles stir fried with egg, broccoli, carrots, and sweet dark soy sauce at Magnolia Thai',
    caption: 'Pad See Ew',
    aspect: 'aspect-square',
  },
  {
    id: 'thai-red-curry',
    filter: 'food',
    imgSrc: '/images/food/ThaiRedCurry.webp',
    lightBg: true,
    seoAlt:
      'Thai Red Curry with coconut milk, bamboo shoots, bell peppers, and kaffir lime leaves at Magnolia Thai',
    caption: 'Thai Red Curry',
    aspect: 'aspect-square',
  },
  {
    id: 'restaurant-evening',
    filter: 'restaurant',
    imgSrc: '/images/ourstoryhero.webp',
    seoAlt:
      'Magnolia Thai Restaurant evening atmosphere — intimate dining setting with warm lighting and traditional Thai decor in Milwaukie, Oregon',
    caption: 'Evening Atmosphere',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'signature-curry',
    filter: 'food',
    span: 2,
    imgSrc: '/images/menuhero.webp',
    seoAlt:
      'Magnolia Thai signature curry — rich Thai curry served in a traditional silver pot with coconut milk, warming spices, and fresh coriander, with jasmine rice on the side',
    caption: 'Signature Curry',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 'pineapple-fried-rice',
    filter: 'food',
    imgSrc: '/images/food/PineappleFriedRice.webp',
    lightBg: true,
    seoAlt:
      'Pineapple Fried Rice with cashew nuts, peas, carrots, tomatoes, and pineapple at Magnolia Thai',
    caption: 'Pineapple Fried Rice',
    aspect: 'aspect-square',
  },
  {
    id: 'events-private',
    filter: 'events',
    span: 2,
    seoAlt:
      'Private dining at Magnolia Thai Restaurant — large group table set for a Thai feast',
    caption: 'Private Dining Events',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 'events-cooking',
    filter: 'events',
    seoAlt:
      'Cooking at Magnolia Thai Restaurant — authentic Thai dishes prepared fresh in our kitchen',
    caption: 'Cooking Classes',
    aspect: 'aspect-square',
  },
  {
    id: 'spring-rolls',
    filter: 'food',
    seoAlt:
      'Crispy spring rolls with sour orange dipping sauce at Magnolia Thai Restaurant',
    caption: 'Crispy Spring Rolls',
    aspect: 'aspect-[3/4]',
  },
]

const FILTERS: { id: GalleryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food & Drinks' },
  { id: 'restaurant', label: 'The Restaurant' },
  { id: 'events', label: 'Events' },
]

// Warm gradient variants for placeholder tiles
const GRADIENTS = [
  'linear-gradient(135deg,#2a1f0a 0%,#1a1a1a 100%)',
  'linear-gradient(135deg,#1a1a1a 0%,#221a0a 100%)',
  'linear-gradient(135deg,#221a0a 0%,#1c1c1c 50%,#0a0a0a 100%)',
  'linear-gradient(135deg,#1c1a0e 0%,#1a1a1a 100%)',
]

export default function GallerySection({ onTabChange }: Props) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('all')
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  const visible =
    activeFilter === 'all' ? GALLERY : GALLERY.filter((i) => i.filter === activeFilter)

  return (
    <section
      className="min-h-full bg-bg-primary"
      aria-label="Magnolia Thai Restaurant photo gallery"
    >
      {/* Header + filters */}
      <div className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm border-b border-gold-muted">
        <div className="px-6 md:px-12 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="section-heading text-2xl md:text-3xl">Gallery</h1>
              <p className="text-gold/40 text-[11px] font-sans uppercase tracking-widest mt-1">
                The sights of Magnolia Thai
              </p>
            </div>
            <button
              onClick={() => onTabChange?.('contact')}
              className="btn-cta text-[11px] px-6 py-3 self-start sm:self-auto"
              aria-label="Order online from Magnolia Thai Restaurant"
            >
              Order Online
            </button>
          </div>

          {/* Filter row */}
          <div className="flex gap-1.5 overflow-x-auto pb-px" role="tablist" aria-label="Gallery filters">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={activeFilter === f.id}
                onClick={() => setActiveFilter(f.id)}
                className={[
                  'flex-shrink-0 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] font-sans',
                  'border transition-all duration-200 rounded-sm focus:outline-none',
                  activeFilter === f.id
                    ? 'bg-gold-light text-bg-primary border-gold-light font-bold'
                    : 'border-gold-muted text-gold/65 hover:border-gold/40 hover:text-gold',
                ].join(' ')}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry-style grid */}
      <div className="px-6 md:px-12 py-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-0">
          {visible.map((item, i) => (
            <div
              key={item.id}
              className={`gallery-item group mb-4 break-inside-avoid ${item.span === 2 ? 'sm:col-span-2' : ''}`}
              onClick={() => setLightbox(item)}
              onKeyDown={(e) => e.key === 'Enter' && setLightbox(item)}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${item.caption} — ${item.seoAlt}`}
            >
              <div className={`relative w-full overflow-hidden ${item.aspect} bg-bg-secondary`}>
                {item.imgSrc ? (
                  <Image
                    src={item.imgSrc}
                    alt={item.seoAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                ) : (
                  <div
                    className="absolute inset-0 transition-transform duration-700 hover:scale-105"
                    style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                    role="img"
                    aria-label={item.seoAlt}
                  />
                )}
                {/* Caption overlay */}
                <div className="gallery-overlay">
                  <p className="text-white/90 text-sm font-sans font-light">{item.caption}</p>
                </div>
                {/* Caption label (always visible on placeholder) */}
                <div className="absolute top-2 left-2">
                  <span className="text-[9px] text-gold/25 uppercase tracking-widest font-sans">
                    {item.caption}
                  </span>
                </div>
                {/* Hidden SEO alt text */}
                <span className="sr-only">{item.seoAlt}</span>
              </div>
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gold/30 font-sans text-sm uppercase tracking-widest">No photos in this category yet.</p>
          </div>
        )}

        <div className="h-8" />
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo lightbox: ${lightbox.caption}`}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl w-10 h-10 flex items-center justify-center"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <div
            className="max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative w-full rounded-lg overflow-hidden bg-bg-secondary ${lightbox.aspect}`}
            >
              {lightbox.imgSrc ? (
                <Image
                  src={lightbox.imgSrc}
                  alt={lightbox.seoAlt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: GRADIENTS[GALLERY.indexOf(lightbox) % GRADIENTS.length] }}
                  role="img"
                  aria-label={lightbox.seoAlt}
                />
              )}
            </div>
            <div className="mt-3 px-1">
              <p className="text-gold-light font-display text-lg">{lightbox.caption}</p>
              <p className="text-gold/45 text-xs font-sans mt-0.5 line-clamp-2">{lightbox.seoAlt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
