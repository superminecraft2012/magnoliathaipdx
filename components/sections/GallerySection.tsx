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
  caption: string
}

const ALL_ITEMS: GalleryItem[] = [
  { id: 'panang-curry',        src: '/images/1.png',                       alt: 'Panang Curry with beef, green beans and red peppers in rich coconut curry sauce',      caption: 'Panang Curry' },
  { id: 'duck-curry',          src: '/images/2.png',                       alt: 'Roasted Duck Curry in red curry with Thai basil and coconut milk',                     caption: 'Duck Curry' },
  { id: 'drunken-noodles',     src: '/images/3.png',                       alt: 'Drunken Noodles — wide flat rice noodles stir fried with shrimp, beef and bell peppers', caption: 'Drunken Noodles' },
  { id: 'crab-puffs',          src: '/images/4.png',                       alt: 'Crab Puffs — fried dumplings filled with crab and cream cheese',                       caption: 'Crab Puffs' },
  { id: 'pad-thai',            src: '/images/5.png',                       alt: 'Pad Thai — stir-fried rice noodles with shrimp, egg, bean sprouts and ground peanuts', caption: 'Pad Thai' },
  { id: 'salmon-pumpkin',      src: '/images/6.png',                       alt: 'Salmon Pumpkin Curry — grilled salmon in Thai curry with broccoli and peas',           caption: 'Salmon Pumpkin Curry' },
  { id: 'khao-soi',            src: '/images/7.png',                       alt: 'Khao Soi — Northern Thai curry noodles with crispy egg noodles',                       caption: 'Khao Soi' },
  { id: 'spring-rolls',        src: '/images/8.png',                       alt: 'Crispy Spring Rolls with sweet dipping sauce',                                         caption: 'Spring Rolls' },
  { id: 'pot-stickers',        src: '/images/9.png',                       alt: 'Pot Stickers — pan-fried dumplings with Thai-style ginger soy sauce',                  caption: 'Pot Stickers' },
  { id: 'garlic-beef',         src: '/images/10.png',                      alt: 'Garlic Beef & Broccoli with carrots in savory oyster sauce',                           caption: 'Garlic Beef & Broccoli' },
  { id: 'pad-thai-shrimp',     src: '/images/11.png',                      alt: 'Pad Thai Shrimp — rice noodles with tiger shrimp, lime and bean sprouts',              caption: 'Pad Thai Shrimp' },
  { id: 'sweet-basil-chicken', src: '/images/12.png',                      alt: 'Sweet Basil Chicken stir-fry with mushrooms, peppers and fresh basil',                 caption: 'Sweet Basil Chicken' },
  { id: 'pad-see-ew',          src: '/images/food/PadSeeEw.webp',          alt: 'Pad See Ew — wide rice noodles with egg, broccoli and sweet dark soy sauce',           caption: 'Pad See Ew' },
  { id: 'pineapple-fried-rice',src: '/images/food/PineappleFriedRice.webp',alt: 'Pineapple Fried Rice with cashews, peas, carrots and pineapple',                      caption: 'Pineapple Fried Rice' },
  { id: 'thai-red-curry',      src: '/images/food/ThaiRedCurry.webp',      alt: 'Thai Red Curry with coconut milk, bamboo shoots and kaffir lime leaves',               caption: 'Thai Red Curry' },
]

const TRACKS = [
  { items: ALL_ITEMS.slice(0, 5),  startIdx: 0,  duration: 38, dir: 'left'  },
  { items: ALL_ITEMS.slice(5, 10), startIdx: 5,  duration: 54, dir: 'right' },
  { items: ALL_ITEMS.slice(10),    startIdx: 10, duration: 44, dir: 'left'  },
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
      aria-label={`View ${item.caption}`}
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
      <div className="gallery-caption">
        <span className="text-gold/55 text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.2em]">
          {item.caption}
        </span>
      </div>
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
            {ALL_ITEMS.length} dishes · hover to pause
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
            <button onClick={() => openLightbox(i)}>{item.caption} — {item.alt}</button>
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
          aria-label={`Photo: ${lightboxItem.caption}`}
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
              <p className="text-gold-light font-display text-xl sm:text-2xl">{lightboxItem.caption}</p>
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
