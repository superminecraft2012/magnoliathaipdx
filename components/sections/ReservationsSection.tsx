'use client'

import { useState, type FormEvent } from 'react'
import type { TabId } from '@/components/TabsClient'

interface Props {
  onTabChange?: (tab: TabId) => void
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

// Generate 30-min time slots
function generateTimeSlots(): string[] {
  const slots: string[] = []
  for (let h = 11; h <= 22; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
    if (h < 22) slots.push(`${String(h).padStart(2, '0')}:30`)
  }
  return slots
}

const TIME_SLOTS = generateTimeSlots()
const PARTY_SIZES = ['1', '2', '3', '4', '5', '6', '7', '8+']

// Min date = today
function todayISO(): string {
  return new Date().toISOString().split('T')[0]
}

export default function ReservationsSection({ onTabChange }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: '2',
    requests: '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    // Simulated async submit — replace with your booking API / Netlify Forms
    setTimeout(() => {
      setStatus('success')
    }, 1200)
  }

  if (status === 'success') {
    return (
      <section
        className="min-h-full flex items-center justify-center px-6 py-16 bg-bg-primary"
        aria-live="polite"
        aria-label="Reservation confirmed"
      >
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full border border-gold-muted flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-gold-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="font-display text-gold-light text-3xl uppercase tracking-wider mb-3">
            Reservation Requested
          </h2>
          <p className="text-gold/65 text-base font-sans font-light leading-relaxed mb-6">
            Thank you, {form.firstName}. We have received your request for{' '}
            <strong className="text-gold/80">{form.partySize} guests</strong> on{' '}
            <strong className="text-gold/80">{form.date}</strong> at{' '}
            <strong className="text-gold/80">{form.time}</strong>.
            <br /><br />
            A confirmation will be sent to {form.email} shortly.
          </p>
          <button
            onClick={() => { setStatus('idle'); setForm({ ...form, date: '', time: '', requests: '' }) }}
            className="btn-ghost text-sm px-8 py-3"
          >
            Make another reservation
          </button>
        </div>
      </section>
    )
  }

  return (
    <section
      className="min-h-full bg-bg-primary"
      aria-label="Order online or book a table at Magnolia Thai Restaurant"
    >
      <div className="max-w-2xl mx-auto px-6 py-10 md:py-14">

        {/* ── Order Online ── */}
        <div className="mb-10 text-center">
          <p className="text-gold/45 text-[11px] uppercase tracking-[0.3em] font-sans mb-3">
            10574 SE 32nd Ave · Milwaukie, OR 97222
          </p>
          <h1 className="section-heading text-3xl md:text-4xl mb-2">Order Online</h1>
          <div className="gold-divider mt-4 max-w-xs mx-auto mb-6" />
          <p className="text-gold/50 text-sm font-sans font-light mb-6">
            Order delivery or pickup through your preferred platform
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {[
              { name: 'UberEats', href: 'https://www.ubereats.com/store/magnolia-thai-restaurant/gHxL-23vRW2gkHHSCTKZEg', color: '#06C167' },
              { name: 'DoorDash', href: 'https://www.doordash.com/store/magnolia-thai-restaurant-milwaukie-26242298/34149152/', color: '#FF3008' },
              { name: 'Grubhub', href: 'https://www.grubhub.com/restaurant/magnolia-thai-restaurant-10574-se-32nd-ave-milwaukie/7313120', color: '#F63440' },
            ].map((platform) => (
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
          <div className="gold-divider max-w-xs mx-auto mb-10" />
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="section-heading text-3xl md:text-4xl">Reserve a Table</h2>
          <div className="gold-divider mt-5 max-w-xs mx-auto" />
          <p className="text-gold/55 text-sm font-sans mt-4 font-light">
            For parties of 9 or more, please call us on{' '}
            <a href="tel:+15036590149" className="text-gold hover:text-gold-light transition-colors" data-track="call_click">
              (503) 659-0149
            </a>
          </p>
        </div>

        {/* Hours summary */}
        <div className="grid grid-cols-3 gap-px border border-gold-muted rounded-lg overflow-hidden mb-8 text-center text-sm">
          {[
            { days: 'Mon – Thu', hours: '11 AM – 9 PM' },
            { days: 'Fri', hours: '11 AM – 10 PM' },
            { days: 'Sat – Sun', hours: '12 PM – 9/10 PM' },
          ].map((h) => (
            <div key={h.days} className="bg-bg-secondary px-3 py-3">
              <div className="text-gold/50 text-[10px] uppercase tracking-wider font-sans">{h.days}</div>
              <div className="text-gold/80 text-sm font-sans mt-0.5">{h.hours}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Reservation form"
          className="space-y-5"
        >

          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-[11px] uppercase tracking-wider text-gold/55 mb-1.5 font-sans">
                First Name <span className="text-gold/40">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Somchai"
                className="form-input"
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-[11px] uppercase tracking-wider text-gold/55 mb-1.5 font-sans">
                Last Name <span className="text-gold/40">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Prasert"
                className="form-input"
                aria-required="true"
              />
            </div>
          </div>

          {/* Contact row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-[11px] uppercase tracking-wider text-gold/55 mb-1.5 font-sans">
                Email <span className="text-gold/40">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="form-input"
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-[11px] uppercase tracking-wider text-gold/55 mb-1.5 font-sans">
                Phone <span className="text-gold/40">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="(503) 555-0123"
                className="form-input"
                aria-required="true"
              />
            </div>
          </div>

          {/* Booking details row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="date" className="block text-[11px] uppercase tracking-wider text-gold/55 mb-1.5 font-sans">
                Date <span className="text-gold/40">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                min={todayISO()}
                value={form.date}
                onChange={handleChange}
                className="form-input"
                aria-required="true"
                style={{ colorScheme: 'dark' }}
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-[11px] uppercase tracking-wider text-gold/55 mb-1.5 font-sans">
                Time <span className="text-gold/40">*</span>
              </label>
              <select
                id="time"
                name="time"
                required
                value={form.time}
                onChange={handleChange}
                className="form-input"
                aria-required="true"
              >
                <option value="" disabled>Select time</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="partySize" className="block text-[11px] uppercase tracking-wider text-gold/55 mb-1.5 font-sans">
                Guests <span className="text-gold/40">*</span>
              </label>
              <select
                id="partySize"
                name="partySize"
                required
                value={form.partySize}
                onChange={handleChange}
                className="form-input"
                aria-required="true"
              >
                {PARTY_SIZES.map((n) => (
                  <option key={n} value={n}>{n} {n === '1' ? 'guest' : 'guests'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Special requests */}
          <div>
            <label htmlFor="requests" className="block text-[11px] uppercase tracking-wider text-gold/55 mb-1.5 font-sans">
              Special Requests or Dietary Requirements
            </label>
            <textarea
              id="requests"
              name="requests"
              rows={3}
              value={form.requests}
              onChange={handleChange}
              placeholder="Allergies, celebration, high chair, wheelchair access…"
              className="form-input resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-cta w-full sm:w-auto px-12 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
              aria-busy={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending…' : 'Request Reservation'}
            </button>
          </div>

          {status === 'error' && (
            <p className="text-red-400/80 text-sm font-sans" role="alert">
              Something went wrong. Please call us on{' '}
              <a href="tel:+15036590149" className="text-gold hover:text-gold-light">
                (503) 659-0149
              </a>
              .
            </p>
          )}
        </form>

        <div className="h-12" />
      </div>
    </section>
  )
}
