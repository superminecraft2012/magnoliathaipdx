'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Header from './layout/Header'
import HomeSection from './sections/HomeSection'
import MenuSection from './sections/MenuSection'
// import ReservationsSection from './sections/ReservationsSection'
import AboutSection from './sections/AboutSection'
import LocationSection from './sections/LocationSection'
import GallerySection from './sections/GallerySection'

export type TabId = 'home' | 'menu' | 'about' | 'contact' | 'gallery'

export interface Tab {
  id: TabId
  label: string
  Component: React.ComponentType<{ onTabChange?: (tab: TabId) => void }>
}

const TABS: Tab[] = [
  { id: 'home', label: 'Home', Component: HomeSection },
  { id: 'menu', label: 'Menu', Component: MenuSection },
  { id: 'about', label: 'About Us', Component: AboutSection },
  { id: 'contact', label: 'Find Us', Component: LocationSection },
  // { id: 'gallery', label: 'Gallery', Component: GallerySection },  // hidden until real photos
]

const TAB_TITLES: Record<TabId, string> = {
  home: 'Magnolia Thai Restaurant | Authentic Thai Cuisine | Milwaukie, OR',
  menu: 'Menu | Magnolia Thai Restaurant',
  about: 'Our Story | Magnolia Thai Restaurant',
  contact: 'Contact & Order Online | Magnolia Thai Restaurant',
  gallery: 'Gallery | Magnolia Thai Restaurant',
}

const SPLASH_DURATION = 1950

export default function TabsClient() {
  const [activeTab, setActiveTab] = useState<TabId>('home')
  const [animKey, setAnimKey] = useState(0)
  const [splashVisible, setSplashVisible] = useState(true)

  const handleTabChange = useCallback((tabId: TabId) => {
    setActiveTab(tabId)
    setAnimKey((k) => k + 1)
    const hash = tabId === 'home' ? '' : `#${tabId}`
    window.history.pushState(null, '', hash || window.location.pathname)
    document.title = TAB_TITLES[tabId]
  }, [])

  useEffect(() => {
    const hash = window.location.hash.slice(1) as TabId
    if (hash && TABS.find((t) => t.id === hash)) {
      setActiveTab(hash)
      document.title = TAB_TITLES[hash]
    }

    const handlePopState = () => {
      const newHash = window.location.hash.slice(1) as TabId
      const found = TABS.find((t) => t.id === newHash)
      const next = found ? newHash : 'home'
      setActiveTab(next)
      document.title = TAB_TITLES[next]
    }

    window.addEventListener('popstate', handlePopState)

    const splashTimer = setTimeout(() => setSplashVisible(false), SPLASH_DURATION)
    return () => {
      window.removeEventListener('popstate', handlePopState)
      clearTimeout(splashTimer)
    }
  }, [])

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-bg-primary">

      {/* ── Splash screen ── */}
      {splashVisible && (
        <div
          className="splash-overlay fixed inset-0 z-[100] bg-bg-primary flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center">
            <div className="splash-logo relative w-36 h-36 sm:w-44 sm:h-44 mb-7 opacity-[0.15]">
              <Image
                src="/images/logonotext.png"
                alt=""
                fill
                className="object-contain"
                style={{ filter: 'grayscale(1) brightness(2.5) sepia(0.4)' }}
                priority
              />
            </div>
            <div className="splash-line w-20 h-px bg-gold/50 mb-5" />
            <h1 className="splash-title font-display text-gold-light text-5xl sm:text-6xl uppercase tracking-[0.15em]">
              Magnolia
            </h1>
            <p className="splash-subtitle text-gold/50 text-sm sm:text-base uppercase tracking-[0.35em] font-sans mt-2">
              Thai Restaurant
            </p>
            <p className="splash-tagline text-gold/25 text-xs uppercase tracking-[0.4em] font-sans mt-5">
              Milwaukie, Oregon · Est. 2010
            </p>
          </div>
        </div>
      )}

      <Header activeTab={activeTab} onTabChange={handleTabChange} tabs={TABS} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-bg-primary focus:text-sm focus:font-bold"
      >
        Skip to content
      </a>

      <main
        id="main-content"
        className="flex-1 relative overflow-hidden"
        role="main"
        aria-label="Restaurant content"
      >
        {TABS.map(({ id, Component }) => (
          <div
            key={id}
            id={`tab-panel-${id}`}
            role="tabpanel"
            aria-labelledby={`tab-${id}`}
            aria-hidden={activeTab !== id}
            tabIndex={activeTab === id ? 0 : -1}
            className={[
              'absolute inset-0 overflow-y-auto tab-scroll',
              'transition-all duration-500 ease-in-out',
              activeTab === id
                ? 'opacity-100 z-10 pointer-events-auto translate-y-0'
                : 'opacity-0 z-0 pointer-events-none translate-y-1',
            ].join(' ')}
            data-anim-key={activeTab === id ? animKey : undefined}
          >
            <Component onTabChange={handleTabChange} />
          </div>
        ))}
      </main>
    </div>
  )
}
