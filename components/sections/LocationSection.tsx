'use client'

import type { TabId } from '@/components/TabsClient'
import { BUSINESS, DELIVERY_PLATFORMS, HOURS, ORDER_URL } from '@/lib/site'

interface Props {
  onTabChange?: (tab: TabId) => void
}


const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function toMins(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

function to12h(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return m === 0 ? `${hour}:00 ${period}` : `${hour}:${String(m).padStart(2, '0')} ${period}`
}

/** Service periods for a given JS day index, read from the shared HOURS table. */
function periodsFor(day: number) {
  const name = DAY_NAMES[day]
  return HOURS.find((row) => row.schemaDays.includes(name))?.service ?? []
}

/**
 * Live open/closed status, derived entirely from the shared HOURS constant in
 * lib/site.ts. Previously this hard-coded a third copy of the schedule
 * alongside the visible table and the JSON-LD; all three now share one source.
 */
function isOpen(): { open: boolean; label: string } {
  const now = new Date()
  const day = now.getDay()
  const mins = now.getHours() * 60 + now.getMinutes()
  const today = periodsFor(day)

  const current = today.find((p) => mins >= toMins(p.opens) && mins < toMins(p.closes))
  if (current) {
    return { open: true, label: `Open now · Closes at ${to12h(current.closes)}` }
  }

  const nextToday = today.find((p) => mins < toMins(p.opens))
  if (nextToday) {
    const verb = today.some((p) => mins >= toMins(p.closes)) ? 'Reopens' : 'Opens'
    return { open: false, label: `${verb} at ${to12h(nextToday.opens)}` }
  }

  // Closed for the rest of today — find the next day that has any service.
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7
    const periods = periodsFor(d)
    if (periods.length) {
      const when = i === 1 ? 'tomorrow' : DAY_NAMES[d]
      return { open: false, label: `Closed · Opens ${when} at ${to12h(periods[0].opens)}` }
    }
  }
  return { open: false, label: 'Closed' }
}


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
          href={BUSINESS.mapUrl}
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

        <h2 className="anim-fade-up delay-100 section-heading text-3xl md:text-4xl mb-1">Find Us</h2>
        <div className="gold-divider max-w-[120px] mt-3 mb-7 anim-line delay-200" />

        {/* Order Online */}
        <div className="mb-8">
          <p className="text-gold/40 text-[10px] uppercase tracking-[0.3em] font-sans mb-3">Order Online</p>
          <p className="text-gold/55 text-sm font-sans mb-4">
            Order delivery or pickup through your preferred platform
          </p>
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta w-full mb-3"
            aria-label="Order directly from Magnolia Thai"
            data-track="order_click"
          >
            Order Online
          </a>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 anim-stagger">
            {DELIVERY_PLATFORMS.map((platform) => (
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
          <p className="text-gold/70 text-sm font-sans mt-1">{BUSINESS.streetAddress}</p>
          <p className="text-gold/70 text-sm font-sans">
            {BUSINESS.addressLocality}, {BUSINESS.addressRegion} {BUSINESS.postalCode}
          </p>
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
              {BUSINESS.telephoneDisplay}
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
                    {h.service.map((p) => `${p.label} ${p.opens}–${p.closes}`).join(' · ')}
                  </p>
                </div>
                <p className="text-gold/60 text-sm font-sans text-right">
                  {h.service[0].opens} – {h.service[h.service.length - 1].closes}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
