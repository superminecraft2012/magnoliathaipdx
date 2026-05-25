import { Suspense } from 'react'
import TabsClient from '@/components/TabsClient'

export default function Home() {
  return (
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
  )
}
