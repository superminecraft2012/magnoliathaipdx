'use client'

import type { TabId } from '@/components/TabsClient'

interface Props {
  onTabChange?: (tab: TabId) => void
}

const HOURS = [
  { days: 'Monday – Thursday', open: '11:00', close: '21:00', lunch: '11:00–15:00', dinner: '16:00–21:00' },
  { days: 'Friday', open: '11:00', close: '22:00', lunch: '11:00–15:00', dinner: '16:00–22:00' },
  { days: 'Saturday', open: '12:00', close: '22:00', lunch: null, dinner: '12:00–22:00' },
  { days: 'Sunday', open: '12:00', close: '21:00', lunch: null, dinner: '12:00–21:00' },
]

function isOpen(): { open: boolean; label: string } {
  const now = new Date()
  const day = now.getDay()
  const mins = now.getHours() * 60 + now.getMinutes()

  if (day >= 1 && day <= 4) {
    const lunch = mins >= 11 * 60 && mins < 15 * 60
    const dinner = mins >= 16 * 60 && mins < 21 * 60
    if (lunch) return { open: true, label: 'Open now · Lunch closes at 3:00 PM' }
    if (dinner) return { open: true, label: 'Open now · Closes at 9:00 PM' }
    if (mins < 11 * 60) return { open: false, label: 'Opens at 11:00 AM' }
    if (mins >= 15 * 60 && mins < 16 * 60) return { open: false, label: 'Reopens at 4:00 PM' }
    return { open: false, label: 'Closed · Opens tomorrow at 11:00 AM' }
  }
  if (day === 5) {
    const lunch = mins >= 11 * 60 && mins < 15 * 60
    const dinner = mins >= 16 * 60 && mins < 22 * 60
    if (lunch) return { open: true, label: 'Open now · Lunch closes at 3:00 PM' }
    if (dinner) return { open: true, label: 'Open now · Closes at 10:00 PM' }
    if (mins < 11 * 60) return { open: false, label: 'Opens at 11:00 AM' }
    if (mins >= 15 * 60 && mins < 16 * 60) return { open: false, label: 'Reopens at 4:00 PM' }
    return { open: false, label: 'Closed · Opens Saturday at 12:00 PM' }
  }
  if (day === 6) {
    const open = mins >= 12 * 60 && mins < 22 * 60
    return open
      ? { open: true, label: 'Open now · Closes at 10:00 PM' }
      : { open: false, label: mins < 12 * 60 ? 'Opens at 12:00 PM' : 'Closed · Opens Sunday at 12:00 PM' }
  }
  const open = mins >= 12 * 60 && mins < 21 * 60
  return open
    ? { open: true, label: 'Open now · Closes at 9:00 PM' }
    : { open: false, label: mins < 12 * 60 ? 'Opens at 12:00 PM' : 'Closed · Opens Monday at 11:00 AM' }
}

const ORDER_PLATFORMS = [
  { name: 'UberEats', href: 'https://www.ubereats.com/store/magnolia-thai-restaurant/gHxL-23vRW2gkHHSCTKZEg', color: '#06C167' },
  { name: 'DoorDash', href: 'https://www.doordash.com/store/magnolia-thai-restaurant-milwaukie-26242298/34149152/', color: '#FF3008' },
  { name: 'Grubhub', href: 'https://www.grubhub.com/restaurant/magnolia-thai-restaurant-10574-se-32nd-ave-milwaukie/7313120', color: '#F63440' },
]

export default function LocationSection({ onTabChange }: Props) {
  const status = isOpen()

  return (
    <section
      className="flex flex-col lg:flex-row bg-bg-primary"
      style={{ minHeight: 'calc(100dvh - 73px)' }}
      aria-label="Magnolia Thai Restaurant contact, ordering, and location"
    >

      {/* ── Map panel ── */}
      <div className="anim-fade-in relative h-[280px] flex-shrink-0 lg:h-auto lg:flex-1 border-b lg:border-b-0 lg:border-r border-gold-muted overflow-hidden">
        <iframe
          src="https://maps.google.com/maps?q=Magnolia+Thai+Restaurant+10574+SE+32nd+Ave+Milwaukie+OR+97222&output=embed"
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map showing Magnolia Thai Restaurant location"
          aria-label="Google Maps showing Magnolia Thai Restaurant"
        />

        <a
          href="https://www.google.com/maps/place/Magnolia+Thai+Restaurant/@45.4492,-122.6364,17z"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 btn-ghost text-[10px] px-4 py-2 bg-bg-primary/80 backdrop-blur-sm z-10"
          aria-label="Open Magnolia Thai Restaurant in Google Maps"
        >
          Open in Maps →
        </a>
      </div>

      {/* ── Info panel ── */}
      <div className="lg:flex-1 overflow-y-auto px-5 sm:px-8 md:px-12 py-8 sm:py-10 flex flex-col justify-center anim-fade-up">

        {/* Live open/closed badge */}
        <div className="flex items-center gap-2 mb-6">
          <span
            className={`inline-block w-2 h-2 rounded-full ${status.open ? 'bg-emerald-400' : 'bg-red-500/70'}`}
            aria-hidden="true"
          />
          <span
            className={`text-[11px] uppercase tracking-wider font-sans ${status.open ? 'text-emerald-400/80' : 'text-red-400/70'}`}
            aria-live="polite"
          >
            {status.label}
          </span>
        </div>

        <h1 className="anim-fade-up delay-100 section-heading text-3xl md:text-4xl mb-1">Find Us</h1>
        <div className="gold-divider max-w-[120px] mt-3 mb-7 anim-line delay-200" />

        {/* Order Online */}
        <div className="mb-8">
          <p className="text-gold/40 text-[10px] uppercase tracking-[0.3em] font-sans mb-3">Order Online</p>
          <p className="text-gold/55 text-sm font-sans mb-4">
            Order delivery or pickup through your preferred platform
          </p>
          <a
            href="https://www.toasttab.com/local/order/magnoliathaipdx"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta w-full mb-3"
            aria-label="Order directly from Magnolia Thai"
            data-track="order_click"
          >
            Order Online
          </a>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 anim-stagger">
            {ORDER_PLATFORMS.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-bg-secondary border border-gold-muted rounded-lg px-5 py-4 text-gold/80 font-sans font-semibold text-sm hover:border-gold/50 hover:text-gold-light transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40"
                aria-label={`Order from Magnolia Thai on ${platform.name}`}
                data-track="order_click"
              >
                <span
                  className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: platform.color }}
                  aria-hidden="true"
                />
                {platform.name}
              </a>
            ))}
          </div>
        </div>

        {/* Address */}
        <address className="not-italic mb-8">
          <p className="text-gold/40 text-[10px] uppercase tracking-[0.3em] font-sans mb-2">Address</p>
          <p className="font-display text-gold-light text-xl leading-tight">
            Magnolia Thai Restaurant
          </p>
          <p className="text-gold/70 text-sm font-sans mt-1">10574 SE 32nd Ave</p>
          <p className="text-gold/70 text-sm font-sans">Milwaukie, OR 97222</p>
        </address>

        {/* Contact */}
        <div className="mb-8">
          <p className="text-gold/40 text-[10px] uppercase tracking-[0.3em] font-sans mb-3">Phone & Social</p>
          <div className="space-y-2">
            <a
              href="tel:+15036590149"
              className="flex items-center gap-2 text-gold/75 hover:text-gold transition-colors font-sans text-sm"
              aria-label="Call Magnolia Thai Restaurant"
              data-track="call_click"
            >
              <span className="text-gold/40 text-xs" aria-hidden="true">✆</span>
              (503) 659-0149
            </a>
            <a
              href="https://www.facebook.com/Magnoliathaipdx/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gold/75 hover:text-gold transition-colors font-sans text-sm"
              aria-label="Visit Magnolia Thai on Facebook"
            >
              <span className="text-gold/40 text-xs" aria-hidden="true">f</span>
              facebook.com/Magnoliathaipdx
            </a>
          </div>
        </div>

        {/* Opening hours */}
        <div className="mb-8">
          <p className="text-gold/40 text-[10px] uppercase tracking-[0.3em] font-sans mb-3">Opening Hours</p>
          <div className="space-y-3">
            {HOURS.map((h) => (
              <div key={h.days} className="grid grid-cols-[1fr_auto] items-start gap-4">
                <div>
                  <p className="text-gold/75 text-sm font-sans">{h.days}</p>
                  <p className="text-gold/35 text-[11px] font-sans">
                    {h.lunch ? `Lunch ${h.lunch} · Dinner ${h.dinner}` : `Open ${h.dinner}`}
                  </p>
                </div>
                <p className="text-gold/60 text-sm font-sans text-right">
                  {h.open} – {h.close}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
