'use client'

import { useState, useEffect, useCallback } from 'react'
import Header from './layout/Header'
import HomeSection from './sections/HomeSection'
import MenuSection from './sections/MenuSection'
import ReservationsSection from './sections/ReservationsSection'
import AboutSection from './sections/AboutSection'
import LocationSection from './sections/LocationSection'
import GallerySection from './sections/GallerySection'

export type TabId = 'home' | 'menu' | 'reservations' | 'about' | 'location' | 'gallery'

export interface Tab {
  id: TabId
  label: string
  Component: React.ComponentType<{ onTabChange?: (tab: TabId) => void }>
}

const TABS: Tab[] = [
  { id: 'home', label: 'Home', Component: HomeSection },
  { id: 'menu', label: 'Menu', Component: MenuSection },
  { id: 'reservations', label: 'Reservations', Component: ReservationsSection },
  { id: 'about', label: 'About Us', Component: AboutSection },
  { id: 'location', label: 'Location', Component: LocationSection },
  { id: 'gallery', label: 'Gallery', Component: GallerySection },
]

const TAB_TITLES: Record<TabId, string> = {
  home: 'Magnolia Thai Restaurant | Authentic Thai Cuisine | Milwaukie, OR',
  menu: 'Menu | Magnolia Thai Restaurant',
  reservations: 'Book a Table | Magnolia Thai Restaurant',
  about: 'Our Story | Magnolia Thai Restaurant',
  location: 'Find Us | Magnolia Thai Restaurant',
  gallery: 'Gallery | Magnolia Thai Restaurant',
}

export default function TabsClient() {
  const [activeTab, setActiveTab] = useState<TabId>('home')

  const handleTabChange = useCallback((tabId: TabId) => {
    setActiveTab(tabId)
    const hash = tabId === 'home' ? '' : `#${tabId}`
    window.history.pushState(null, '', hash || window.location.pathname)
    document.title = TAB_TITLES[tabId]
  }, [])

  useEffect(() => {
    // Hydrate from URL hash on first load
    const hash = window.location.hash.slice(1) as TabId
    if (hash && TABS.find((t) => t.id === hash)) {
      setActiveTab(hash)
      document.title = TAB_TITLES[hash]
    }

    // Browser back/forward support
    const handlePopState = () => {
      const newHash = window.location.hash.slice(1) as TabId
      const found = TABS.find((t) => t.id === newHash)
      const next = found ? newHash : 'home'
      setActiveTab(next)
      document.title = TAB_TITLES[next]
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-bg-primary">
      <Header activeTab={activeTab} onTabChange={handleTabChange} tabs={TABS} />

      {/* Skip to content link for accessibility */}
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
              'transition-opacity duration-300 ease-in-out',
              activeTab === id
                ? 'opacity-100 z-10 pointer-events-auto'
                : 'opacity-0 z-0 pointer-events-none',
            ].join(' ')}
          >
            <Component onTabChange={handleTabChange} />
          </div>
        ))}
      </main>
    </div>
  )
}
