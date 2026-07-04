'use client'

import { useState, useEffect } from 'react'

/**
 * Holiday notice that only appears on July 4, 2026, Pacific time.
 * The date is evaluated in the America/Los_Angeles timezone so it shows on
 * the correct day for every visitor regardless of their local timezone.
 */
export default function ClosedJuly4Popup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const pacificDate = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date())

    if (pacificDate === '2026-07-04') {
      setOpen(true)
    }
  }, [])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="closed-july4-title"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative max-w-sm w-full rounded-2xl border border-gold/30 bg-bg-primary px-8 py-10 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-gold/50 transition-colors hover:text-gold-light"
        >
          &times;
        </button>
        <div className="font-display text-gold-light text-3xl mb-2">Magnolia</div>
        <div className="text-gold/50 text-[11px] uppercase tracking-[0.3em] font-sans mb-6">
          Thai Restaurant
        </div>
        <h2
          id="closed-july4-title"
          className="font-display text-gold-light text-2xl mb-3"
        >
          Closed
        </h2>
        <p className="text-gold/80 font-sans text-base">
          We are closed on
          <br />
          <span className="text-gold-light font-semibold">
            Saturday, July 4, 2026
          </span>
        </p>
        <p className="text-gold/60 font-sans text-sm mt-4">
          Happy Fourth of July! We look forward to serving you again soon.
        </p>
      </div>
    </div>
  )
}
