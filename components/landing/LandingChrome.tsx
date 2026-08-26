import Image from 'next/image'
import Link from 'next/link'
import { BUSINESS, DELIVERY_PLATFORMS, HOURS, ORDER_URL } from '@/lib/site'
import type { Faq } from '@/lib/landing-content'

/**
 * Shared server-rendered chrome for the search landing pages.
 *
 * These are real routes, NOT part of the tabbed SPA at `/`. Everything here is
 * static HTML with crawlable <a>/<Link> navigation — the SPA navigates with
 * <button> handlers, which crawlers do not follow.
 */

export function Breadcrumbs({ trail }: { trail: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[11px] font-sans text-gold/45">
      <ol className="flex flex-wrap items-center gap-x-1.5 -my-3">
        {trail.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" className="text-gold/25">/</span>}
            {i === trail.length - 1 ? (
              <span aria-current="page" className="inline-flex items-center min-h-[44px] py-3 text-gold/70">
                {c.name}
              </span>
            ) : (
              <Link
                href={c.href}
                className="inline-flex items-center min-h-[44px] py-3 hover:text-gold transition-colors underline underline-offset-4"
              >
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function LandingHeader() {
  return (
    <header className="border-b border-gold-muted bg-bg-primary/95 sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 min-h-[56px] sm:min-h-[64px] flex items-center justify-between gap-3">
        <Link
          href="/"
          aria-label="Magnolia Thai Restaurant — home"
          className="relative flex items-center h-11 w-[132px] sm:w-36 flex-shrink-0"
        >
          <Image
            src="/images/newlogo.webp"
            alt="Magnolia Thai Restaurant"
            fill
            className="object-contain object-left"
            sizes="144px"
            priority
          />
        </Link>

        {/*
          On mobile the two competing actions used to overflow a 320px viewport
          (the flex row measured 340px). Ordering moves to the thumb-reachable
          bar at the bottom of the screen, so the top bar carries the brand and
          one quiet link.
        */}
        <Link
          href="/#menu"
          className="sm:hidden inline-flex items-center min-h-11 px-3 -mr-1 text-[12px] uppercase tracking-[0.18em] font-sans text-gold/70 hover:text-gold transition-colors"
          data-track="menu_click"
        >
          Menu
        </Link>

        <div className="hidden sm:flex items-center gap-3">
          <Link href="/#menu" className="btn-ghost text-[11px] px-5 py-3" data-track="menu_click">
            Full Menu
          </Link>
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta text-[11px] px-5 py-3"
            data-track="order_click"
          >
            Order
          </a>
        </div>
      </div>
    </header>
  )
}

/**
 * Thumb-reachable ordering bar, mobile only.
 *
 * A restaurant landing page on a phone has exactly two jobs: order, or call.
 * Both sit within thumb reach rather than at the top of a long scroll, and the
 * bar clears the home indicator via env(safe-area-inset-bottom).
 */
export function MobileActionBar() {
  return (
    <div
      className="sm:hidden fixed inset-x-0 bottom-0 z-50 border-t border-gold-muted bg-bg-primary/95 backdrop-blur-sm pt-3 px-4"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-stretch gap-2.5">
        <a
          href={ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta flex-1 min-h-[48px] px-4 py-0 text-[12px]"
          data-track="order_click"
        >
          Order online
        </a>
        <a
          href={`tel:${BUSINESS.telephone}`}
          aria-label={`Call Magnolia Thai Restaurant on ${BUSINESS.telephoneDisplay}`}
          className="btn-ghost min-h-[48px] px-5 py-0 text-[12px]"
          data-track="call_click"
        >
          Call
        </a>
      </div>
    </div>
  )
}

export function OrderActions({ label = 'Order online' }: { label?: string }) {
  return (
    <div className="not-prose">
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <a
          href={ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta min-h-[52px] px-7 py-3 text-[12px] text-center"
          data-track="order_click"
        >
          {label}
        </a>
        <a
          href={`tel:${BUSINESS.telephone}`}
          className="btn-ghost min-h-[52px] px-7 py-3 text-[12px] text-center"
          data-track="call_click"
        >
          Call {BUSINESS.telephoneDisplay}
        </a>
      </div>

      {/*
        These were inline words in a sentence — 45x13px tap targets on a phone,
        for what is a primary action on a restaurant page. They are real targets
        now, and they wrap instead of stretching the row.
      */}
      <p className="text-gold/40 text-[11px] uppercase tracking-[0.22em] font-sans mt-5 mb-2">
        Or order through
      </p>
      <ul className="flex flex-wrap gap-2">
        {DELIVERY_PLATFORMS.map((p) => (
          <li key={p.name}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-lg border border-gold-muted text-gold/80 text-[13px] font-sans hover:border-gold/50 hover:text-gold-light transition-colors"
              data-track="order_click"
            >
              <span
                aria-hidden="true"
                className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: p.color }}
              />
              {p.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section aria-labelledby="faq-heading" className="mt-14">
      <h2 id="faq-heading" className="font-display text-gold-light text-2xl uppercase tracking-wider">
        Questions people ask
      </h2>
      <div className="gold-divider mt-4 mb-6" />
      <dl className="space-y-6">
        {faqs.map((f) => (
          <div key={f.q}>
            <dt className="font-display text-gold-light text-[16px] leading-snug">{f.q}</dt>
            <dd className="text-gold/65 text-[15px] font-sans font-light leading-[1.7] mt-2">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function VisitBlock() {
  return (
    <section aria-labelledby="visit-heading" className="mt-14 border border-gold-muted rounded-lg p-6 bg-bg-secondary">
      <h2 id="visit-heading" className="font-display text-gold-light text-xl uppercase tracking-wider">
        Find us
      </h2>
      <div className="gold-divider mt-3 mb-5 max-w-[120px]" />
      <div className="grid sm:grid-cols-2 gap-6">
        <address className="not-italic">
          <p className="text-gold/40 text-[10px] uppercase tracking-[0.3em] font-sans mb-2">Address</p>
          <p className="text-gold/75 text-[15px] font-sans leading-relaxed">
            {BUSINESS.name}<br />
            {BUSINESS.streetAddress}<br />
            {BUSINESS.addressLocality}, {BUSINESS.addressRegion} {BUSINESS.postalCode}
          </p>
          <a
            href={BUSINESS.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-[44px] mt-2 -ml-3 px-3 text-gold/75 hover:text-gold text-[12px] uppercase tracking-wider font-sans underline underline-offset-4"
          >
            Get directions
          </a>
        </address>
        <div>
          <p className="text-gold/40 text-[10px] uppercase tracking-[0.3em] font-sans mb-2">Hours</p>
          <ul className="space-y-1.5">
            {HOURS.map((h) => (
              <li key={h.days} className="text-gold/70 text-[14px] font-sans">
                <span className="text-gold/85">{h.days}</span>
                <span className="block text-gold/45 text-[12px] mt-0.5">
                  {h.service.map((p) => `${p.label} ${p.opens}–${p.closes}`).join(' · ')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function LandingFooter() {
  return (
    <footer className="border-t border-gold-muted mt-16 pb-[calc(72px+env(safe-area-inset-bottom))] sm:pb-0">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-10 pb-10">
        <p className="text-gold/40 text-[11px] uppercase tracking-[0.3em] font-sans mb-4">Explore</p>
        <ul className="grid sm:grid-cols-2 gap-x-8 text-[14px] font-sans -my-1">
          <li><Link href="/dishes" className="inline-flex items-center min-h-[44px] py-1 text-gold/70 hover:text-gold underline underline-offset-4 decoration-gold/30 hover:decoration-gold/70 transition-colors">Signature Thai dishes in Portland</Link></li>
          <li><Link href="/thai-khao-soi-portland" className="inline-flex items-center min-h-[44px] py-1 text-gold/70 hover:text-gold underline underline-offset-4 decoration-gold/30 hover:decoration-gold/70 transition-colors">Khao Soi in Portland, Oregon</Link></li>
          <li><Link href="/dishes/pad-thai" className="inline-flex items-center min-h-[44px] py-1 text-gold/70 hover:text-gold underline underline-offset-4 decoration-gold/30 hover:decoration-gold/70 transition-colors">Pad Thai in Portland</Link></li>
          <li><Link href="/dishes/pad-see-ew" className="inline-flex items-center min-h-[44px] py-1 text-gold/70 hover:text-gold underline underline-offset-4 decoration-gold/30 hover:decoration-gold/70 transition-colors">Pad See Ew in Portland</Link></li>
          <li><Link href="/dishes/drunken-noodles" className="inline-flex items-center min-h-[44px] py-1 text-gold/70 hover:text-gold underline underline-offset-4 decoration-gold/30 hover:decoration-gold/70 transition-colors">Drunken Noodles in Portland</Link></li>
          <li><Link href="/dishes/pineapple-fried-rice" className="inline-flex items-center min-h-[44px] py-1 text-gold/70 hover:text-gold underline underline-offset-4 decoration-gold/30 hover:decoration-gold/70 transition-colors">Pineapple Fried Rice in Portland</Link></li>
          <li><Link href="/#menu" className="inline-flex items-center min-h-[44px] py-1 text-gold/70 hover:text-gold underline underline-offset-4 decoration-gold/30 hover:decoration-gold/70 transition-colors">Full Magnolia Thai menu</Link></li>
          <li><Link href="/#contact" className="inline-flex items-center min-h-[44px] py-1 text-gold/70 hover:text-gold underline underline-offset-4 decoration-gold/30 hover:decoration-gold/70 transition-colors">Hours, directions and ordering</Link></li>
        </ul>
        <p className="text-gold/40 text-[12px] font-sans leading-relaxed mt-8">
          {BUSINESS.name} · {BUSINESS.streetAddress}, {BUSINESS.addressLocality},{' '}
          {BUSINESS.addressRegion} {BUSINESS.postalCode}
        </p>
        <a
          href={`tel:${BUSINESS.telephone}`}
          className="inline-flex items-center min-h-[44px] -ml-3 px-3 text-gold/60 hover:text-gold text-[14px] font-sans underline underline-offset-4"
          data-track="call_click"
        >
          {BUSINESS.telephoneDisplay}
        </a>
      </div>
    </footer>
  )
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
