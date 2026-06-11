'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import type { TabId } from '@/components/TabsClient'

interface Props {
  onTabChange?: (tab: TabId) => void
}

interface GalleryItem {
  id: string
  src: string
  alt: string
}

const ALL_ITEMS: GalleryItem[] = [
  { id: 'dish-1',  src: '/menu/1.webp',  alt: 'Panang Curry with beef, green beans and red peppers in rich coconut curry sauce' },
  { id: 'dish-2',  src: '/menu/2.webp',  alt: 'Roasted Duck Curry in red curry with Thai basil and coconut milk' },
  { id: 'dish-3',  src: '/menu/3.webp',  alt: 'Drunken Noodles — wide flat rice noodles stir fried with shrimp, beef and bell peppers' },
  { id: 'dish-4',  src: '/menu/4.webp',  alt: 'Crab Puffs — fried dumplings filled with crab and cream cheese' },
  { id: 'dish-5',  src: '/menu/5.webp',  alt: 'Pad Thai — stir-fried rice noodles with shrimp, egg, bean sprouts and ground peanuts' },
  { id: 'dish-6',  src: '/menu/6.webp',  alt: 'Salmon Pumpkin Curry — grilled salmon in Thai curry with broccoli and peas' },
  { id: 'dish-7',  src: '/menu/7.webp',  alt: 'Khao Soi — Northern Thai curry noodles with crispy egg noodles' },
  { id: 'dish-8',  src: '/menu/8.webp',  alt: 'Crispy Spring Rolls with sweet dipping sauce' },
  { id: 'dish-9',  src: '/menu/9.webp',  alt: 'Pot Stickers — pan-fried dumplings with Thai-style ginger soy sauce' },
  { id: 'dish-10', src: '/menu/10.webp', alt: 'Garlic Beef & Broccoli with carrots in savory oyster sauce' },
  { id: 'dish-11', src: '/menu/11.webp', alt: 'Pad Thai Shrimp — rice noodles with tiger shrimp, lime and bean sprouts' },
  { id: 'dish-12', src: '/menu/12.webp', alt: 'Sweet Basil Chicken stir-fry with mushrooms, peppers and fresh basil' },
  { id: 'dish-13', src: '/menu/13.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
  { id: 'dish-14', src: '/menu/14.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
  { id: 'dish-15', src: '/menu/15.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
  { id: 'dish-16', src: '/menu/16.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
  { id: 'dish-17', src: '/menu/17.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
  { id: 'dish-18', src: '/menu/18.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
  { id: 'dish-19', src: '/menu/19.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
  { id: 'dish-20', src: '/menu/20.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
  { id: 'dish-21', src: '/menu/21.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
  { id: 'dish-22', src: '/menu/22.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
  { id: 'dish-23', src: '/menu/23.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
  { id: 'dish-24', src: '/menu/24.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
  { id: 'dish-25', src: '/menu/25.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
  { id: 'dish-26', src: '/menu/26.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
  { id: 'dish-28', src: '/menu/28.webp', alt: 'Thai dish — Magnolia Thai Restaurant signature recipe' },
]

const TRACKS = [
  { items: ALL_ITEMS.slice(0, 10),  startIdx: 0,  duration: 55, dir: 'left'  },
  { items: ALL_ITEMS.slice(10, 19), startIdx: 10, duration: 62, dir: 'right' },
  { items: ALL_ITEMS.slice(19, 27), startIdx: 19, duration: 55, dir: 'left'  },
] as const

// ── Individual photo tile ────────────────────────────────────────────────────

function PhotoItem({
  item,
  globalIndex,
  onOpen,
  priority,
}: {
  item: GalleryItem
  globalIndex: number
  onOpen: (i: number) => void
  priority: boolean
}) {
  const divRef = useRef<HTMLDivElement>(null)

  const onMouseEnter = useCallback(() => {
    if (divRef.current) divRef.current.style.willChange = 'transform'
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = divRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 2
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 2
    el.style.transform = `perspective(700px) rotateY(${x * 11}deg) rotateX(${-y * 11}deg) scale(1.08)`
  }, [])

  const onMouseLeave = useCallback(() => {
    const el = divRef.current
    if (!el) return
    el.style.transform = ''
    el.style.willChange = ''
  }, [])

  return (
    <div
      ref={divRef}
      className="gallery-photo mx-4 sm:mx-6 md:mx-8 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-sm"
      style={{ transition: 'transform 0.22s ease-out, filter 0.4s ease' }}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onOpen(globalIndex)}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(globalIndex)}
      role="button"
      tabIndex={0}
      aria-label={`View dish — ${item.alt}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        width={210}
        height={210}
        className="object-contain w-[120px] h-[120px] sm:w-[170px] sm:h-[170px] md:w-[210px] md:h-[210px] select-none pointer-events-none"
        draggable={false}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  )
}

// ── Main section ─────────────────────────────────────────────────────────────

export default function GallerySection({ onTabChange }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const sectionRef    = useRef<HTMLElement>(null)
  const titleRef      = useRef<HTMLDivElement>(null)
  const touchStartX   = useRef(0)

  // Cursor-following atmospheric glow + title parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      sectionRef.current?.style.setProperty('--gx', `${e.clientX}px`)
      sectionRef.current?.style.setProperty('--gy', `${e.clientY}px`)
      if (titleRef.current) {
        const tx = (e.clientX / window.innerWidth  - 0.5) * 14
        const ty = (e.clientY / window.innerHeight - 0.5) * 8
        titleRef.current.style.transform = `translate(${tx}px, ${ty}px)`
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const openLightbox  = useCallback((i: number) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % ALL_ITEMS.length : null)),
    [],
  )
  const goPrev = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + ALL_ITEMS.length) % ALL_ITEMS.length : null)),
    [],
  )

  // Keyboard nav
  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      closeLightbox()
      if (e.key === 'ArrowRight')  goNext()
      if (e.key === 'ArrowLeft')   goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, closeLightbox, goNext, goPrev])

  // Touch swipe in lightbox
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX
  }, [])
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX
      if (diff >  50) goNext()
      if (diff < -50) goPrev()
    },
    [goNext, goPrev],
  )

  const lightboxItem = lightboxIndex !== null ? ALL_ITEMS[lightboxIndex] : null

  return (
    <section
      ref={sectionRef}
      className="min-h-full bg-bg-primary gallery-atmosphere relative"
      style={{ '--gx': '50%', '--gy': '30%' } as React.CSSProperties}
      aria-label="Magnolia Thai Restaurant photo gallery"
    >
      {/* Header */}
      <div className="px-6 sm:px-10 md:px-16 pt-10 sm:pt-14 pb-6 sm:pb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div
          ref={titleRef}
          style={{ transition: 'transform 0.18s ease-out' }}
        >
          <p className="text-gold/30 text-[10px] font-sans uppercase tracking-[0.35em] mb-2">
            Milwaukie, Oregon
          </p>
          <h1 className="font-display text-gold-light text-4xl sm:text-5xl md:text-6xl uppercase tracking-[0.08em] leading-none">
            Gallery
          </h1>
          <p className="text-gold/35 text-xs font-sans uppercase tracking-[0.3em] mt-3">
            Hover to pause
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

      {/* Three marquee tracks */}
      <div className="flex flex-col gap-0 py-4 sm:py-6">
        {TRACKS.map((track, ti) => (
          <div key={ti} className="gallery-track py-4 sm:py-6">
            <div
              className={`gallery-track-inner dir-${track.dir}`}
              style={{ animationDuration: `${track.duration}s` }}
              aria-hidden="true"
            >
              {/* Duplicate items for seamless loop */}
              {[...track.items, ...track.items].map((item, idx) => (
                <PhotoItem
                  key={`${item.id}-${ti}-${idx}`}
                  item={item}
                  globalIndex={track.startIdx + (idx % track.items.length)}
                  onOpen={openLightbox}
                  priority={ti === 0 && idx < 5}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Accessible list (screen readers) */}
      <ul className="sr-only">
        {ALL_ITEMS.map((item, i) => (
          <li key={item.id}>
            <button onClick={() => openLightbox(i)}>{item.alt}</button>
          </li>
        ))}
      </ul>

      <div className="h-8 sm:h-12" />

      {/* ── Lightbox ── */}
      {lightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${lightboxItem.alt}`}
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close */}
          <button
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 w-11 h-11 flex items-center justify-center text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/8"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/25 text-[10px] font-sans uppercase tracking-widest pointer-events-none">
            {lightboxIndex + 1} / {ALL_ITEMS.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-1 sm:left-4 z-10 w-12 h-12 flex items-center justify-center text-white/35 hover:text-white transition-colors rounded-full hover:bg-white/8"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Previous photo"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-[85vw] sm:max-w-xl md:max-w-2xl mx-14 sm:mx-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex items-center justify-center" style={{ minHeight: '55vw', maxHeight: '70vh' }}>
              <Image
                key={lightboxItem.id}
                src={lightboxItem.src}
                alt={lightboxItem.alt}
                width={600}
                height={600}
                className="object-contain max-h-[60vh] w-auto lightbox-img-anim drop-shadow-[0_32px_80px_rgba(212,168,87,0.18)]"
                sizes="(max-width:640px) 85vw, 70vw"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-white/20 text-[10px] font-sans uppercase tracking-widest mt-1 sm:hidden">
                Swipe to navigate
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-1 sm:right-4 z-10 w-12 h-12 flex items-center justify-center text-white/35 hover:text-white transition-colors rounded-full hover:bg-white/8"
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
