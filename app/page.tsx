import { Suspense } from 'react'
import TabsClient from '@/components/TabsClient'
import { structuredData } from '@/lib/structured-data'

export default function Home() {
  return (
    <>
      {/*
        The ONE canonical business entity, rendered on the home page only.
        Landing pages reference it by @id instead of redeclaring it — a second
        Restaurant node for the same address would compete with this one.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Suspense
      fallback={
        <div className="h-[100dvh] flex items-center justify-center bg-bg-primary">
          <div className="text-center">
            <div className="font-display text-gold-light text-3xl mb-1">Magnolia</div>
            <div className="text-gold/50 text-[11px] uppercase tracking-[0.3em] font-sans">
              Thai Restaurant
            </div>
          </div>
        </div>
      }
    >
        <TabsClient />
      </Suspense>
    </>
  )
}
