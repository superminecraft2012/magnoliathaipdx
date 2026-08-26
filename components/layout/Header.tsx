'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Tab, TabId } from '@/components/TabsClient'

interface HeaderProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  tabs: Tab[]
}

const NAV_TAB_IDS: TabId[] = ['menu', 'about', 'gallery', 'contact']

export default function Header({ activeTab, onTabChange, tabs }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navTabs = tabs
    .filter((t) => NAV_TAB_IDS.includes(t.id))
    .sort((a, b) => NAV_TAB_IDS.indexOf(a.id) - NAV_TAB_IDS.indexOf(b.id))

  return (
    <header
      className="flex-shrink-0 bg-bg-primary/95 backdrop-blur-sm sticky top-0 z-50"
      role="banner"
    >
      <div className="px-6 md:px-12 h-[72px] flex items-center justify-between">

        {/* ── Logo / Home button ── */}
        <button
          onClick={() => { onTabChange('home'); setMobileOpen(false) }}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
          aria-label="Magnolia Thai Restaurant — return to home"
        >
          <div className="relative w-44 h-14 flex-shrink-0">
            <Image
              src="/images/newlogo.webp"
              alt="Magnolia Thai Restaurant — authentic Thai cuisine in Milwaukie, Oregon"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </button>

        {/* ── Desktop nav ── */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10"
          role="tablist"
          aria-label="Site navigation"
        >
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tab-panel-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className="nav-link"
              {...(tab.id === 'menu' ? { 'data-track': 'menu_click' } : {})}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <span
            className={`block h-[1.5px] bg-gold transition-all duration-300 origin-center ${
              mobileOpen ? 'rotate-45 translate-y-[6.5px] w-6' : 'w-6'
            }`}
          />
          <span
            className={`block h-[1.5px] bg-gold transition-all duration-300 ${
              mobileOpen ? 'opacity-0 w-4' : 'w-4'
            }`}
          />
          <span
            className={`block h-[1.5px] bg-gold transition-all duration-300 origin-center ${
              mobileOpen ? '-rotate-45 -translate-y-[6.5px] w-6' : 'w-6'
            }`}
          />
        </button>
      </div>

      {/* ── Gold hairline ── */}
      <div className="gold-divider" aria-hidden="true" />

      {/* ── Mobile dropdown ── */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 border-b border-gold-muted' : 'max-h-0'
        }`}
      >
        <nav
          className="flex flex-col bg-bg-secondary py-2"
          role="tablist"
          aria-label="Mobile navigation"
        >
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => { onTabChange(tab.id); setMobileOpen(false) }}
              className={[
                'px-8 py-3.5 text-left nav-link text-sm hover:bg-bg-tertiary',
                activeTab === tab.id ? 'text-gold-light bg-bg-tertiary' : '',
              ].join(' ')}
              {...(tab.id === 'menu' ? { 'data-track': 'menu_click' } : {})}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
