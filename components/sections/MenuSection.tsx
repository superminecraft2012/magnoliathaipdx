'use client'

import { useState } from 'react'
import Image from 'next/image'
import { LUNCH_CATEGORIES, ALLDAY_CATEGORIES, PROTEIN_OPTIONS, type MenuCategory } from '@/lib/menu-data'
import type { TabId } from '@/components/TabsClient'

const IMG = '/thai-magnolia-assets/assets/menu-items'

const DISH_IMAGES: Record<string, string> = {
  // Appetizers — professional shots take priority over UUID scraped images
  'fried-spring-rolls': '/images/8.png',      // crispy spring rolls, peanut sauce, orchid garnish
  'fried-tofu': `${IMG}/e61fcb98-70ba-45e8-9e80-8fae5b8959ff.png`,
  'pot-sticker': '/images/9.png',              // pan-fried pot stickers with dipping sauce
  'chicken-satay': `${IMG}/46c98e8a-495c-490f-92bb-64eb5aa40f1b.png`,
  'coconut-shrimp': `${IMG}/edc87de6-e136-45f9-9d9b-e0e8f9c3b27e.png`,
  'crab-puffs': '/images/4.png',              // star-shaped crab puffs, sweet/sour dipping sauce
  'combo-mixed-appetizer': `${IMG}/084c7c9e-c90e-4917-a83e-ef74fba1146e.png`,
  'shrimp-tempura': `${IMG}/191a8cee-be2b-4bf6-9016-00fc00189370.png`,
  'grilled-pork-skewers': `${IMG}/bd7ea305-9b2f-456f-b00a-1e6ead86a7d7.png`,
  // Salads
  'chicken-larb': `${IMG}/2722a0c8-1c64-40b4-bd7e-996a33e50232.png`,
  // Soups
  'tom-kha': `${IMG}/9663fed0-988b-4184-bdcc-77bddf5a8d08.png`,
  'tom-yum': `${IMG}/2117e2f9-8bf8-42a8-b70b-c972e233c879.png`,
  'wonton-soup': `${IMG}/ba0407cc-3b84-48bd-b693-ccae780e6045.png`,
  // Noodle Soups
  'beef-noodles': `${IMG}/244835fd-2488-4d80-9145-568ddd2d1c8d.png`,
  'chicken-noodle-soup': `${IMG}/e4959b5c-5fb0-4a19-b627-689201b464ce.png`,
  // Grilled
  'honey-lemongrass-chicken': `${IMG}/d05addb5-239d-4e07-865f-a814d8c61817.png`,
  'lemongrass-chicken': `${IMG}/9e352cfc-a568-44fb-8c07-69c670562b12.png`,
  // Stir Fry
  'king-rama': '/images/10.png',               // beef broccoli garlic black pepper brown sauce
  'cashew-nut': `${IMG}/eb869656-84b8-4fae-9613-64a57f0708a6.jpg`,
  'sweet-eggplant': `${IMG}/794bb56f-f4b9-4323-88fb-edf0aadeeee1.png`,
  'garlic-black-pepper': `${IMG}/3130aa86-0dc4-4453-9fbf-55984450a917.png`,
  'sweet-basil': `${IMG}/c4795b5c-6c04-460f-837e-21a6dce3437d.png`,
  'pad-prik-khing': `${IMG}/588a0755-a69c-4878-bd0a-54b8cb6cb7ad.png`,
  // Noodles
  'pad-thai': '/images/5.png',                 // pad thai — classic white plate, lime, peanuts
  'pad-see-ew': '/images/food/PadSeeEw.webp',
  'pad-drunken-noodles': '/images/3.png',      // drunken noodles — wide flat noodles, shrimp+beef, bell peppers
  // Curry
  'red-curry': `${IMG}/item-1400000000714846160_1753339042.jpg`,
  'yellow-curry': `${IMG}/item-1400000000714846162_1753339069.jpg`,
  'pumpkin-curry': `${IMG}/e52daec7-c9f5-4363-9766-6d0a0aad607f.jpg`,
  'massaman': `${IMG}/c0272c0d-42c1-4702-bb6b-f1512046852d.png`,
  'mango-curry': `${IMG}/a5970d51-10d2-4cd8-9eed-b3d7c2336792.png`,
  'panang-curry': '/images/1.png',             // panang curry — beef, green beans, red curry sauce
  // Fried Rice
  'pineapple-fried-rice': `${IMG}/7014c7c2-1cd3-4466-8fd0-19bc05d06a74.png`,
  'basil-fried-rice': `${IMG}/b6817ff7-c66b-466c-96f4-777c5faaa9da.png`,
  'duck-fried-rice': `${IMG}/8f5b18a4-a677-4d6b-b85d-314e1f0b797a.png`,
  // Specials
  's5-duck-curry': '/images/2.png',            // roasted duck in red curry, grapes, basil, black bowl
  's6-salmon-pumpkin-curry': '/images/6.png',  // grilled salmon on pumpkin in curry, broccoli, peas
  's7-crispy-duck-ginger': `${IMG}/f1348e8d-cca9-4489-bda9-000430f3ade5.jpg`,
  's8-peanut-lovers': `${IMG}/edc31a13-8275-4155-b241-9b9974f962ee.png`,
  's10-pad-thai-duck': `${IMG}/95373e1b-fca7-4b8c-8e41-746ca0b4b644.png`,
  's18-salmon-teriyaki': `${IMG}/96b4c56b-fcaf-416b-b4ba-9a90132c25d5.png`,
  // Chef Recommend
  'crispy-pork-belly-side': `${IMG}/86fb886f-8f38-48d0-86a3-fd8148cd0018.png`,
  'massaman-beef-curry': `${IMG}/c0272c0d-42c1-4702-bb6b-f1512046852d.png`,
  // Sides
  'sticky-rice': `${IMG}/9be020d8-3282-4e2b-b7f3-3ced5efc50c0.png`,
  'jasmine-rice-l': `${IMG}/c5354e92-c0b0-430b-a805-da55393960b1.png`,
  'jasmine-rice-s': `${IMG}/c5354e92-c0b0-430b-a805-da55393960b1.png`,
  'brown-rice': `${IMG}/1e554138-82ef-4a83-a220-bc640fbbb717.jpg`,
  'steamed-veggies': `${IMG}/569084ca-aee1-4847-9bd5-e76f8ef1e6fb.png`,
  'steamed-noodles': `${IMG}/764bd0cb-086a-4a72-a65e-22b52077c883.png`,
  'peanut-sauce-l': `${IMG}/03ac2235-dd23-414c-8b56-f8347898cc76.png`,
  'peanut-sauce-s': `${IMG}/03ac2235-dd23-414c-8b56-f8347898cc76.png`,
  // Salads
  'fresh-garden-rolls': `${IMG}/ed882ce3-b2f4-4eae-8b6d-2c45ca2075e7.png`,
  // Beverages
  'thai-iced-tea': `${IMG}/d467f29d-f740-4415-b4f9-5fa6da78c226.jpg`,
  'thai-iced-coffee': `${IMG}/868d3cf0-3cbb-4616-a5d5-49b9e7742430.png`,
  'mango-juice': `${IMG}/af882bfd-f605-44dd-8490-732929a98c93.png`,
  'strawberry-lemonade': `${IMG}/item-1400000000714855344_1753339369.jpg`,
  'lemonade': `${IMG}/d5573947-636b-454f-bd09-afc1181a42b3.png`,
  // ── Lunch items — reuse all-day dish photos ──
  'l1-wonton-soup': `${IMG}/ba0407cc-3b84-48bd-b693-ccae780e6045.png`,
  'l3-red-curry': `${IMG}/item-1400000000714846160_1753339042.jpg`,
  'l4-yellow-curry': `${IMG}/item-1400000000714846162_1753339069.jpg`,
  'l5-panang-curry': '/images/1.png',
  'l7-massaman': `${IMG}/c0272c0d-42c1-4702-bb6b-f1512046852d.png`,
  'l8-teriyaki': `${IMG}/a79fd1b3-8e80-4cf2-be95-9b4a0b8b8185.png`,
  'l9-sweet-basil': `${IMG}/c4795b5c-6c04-460f-837e-21a6dce3437d.png`,
  'l10-king-rama': '/images/10.png',
  'l11-cashew': `${IMG}/eb869656-84b8-4fae-9613-64a57f0708a6.jpg`,
  'l13-garlic-pepper': `${IMG}/3130aa86-0dc4-4453-9fbf-55984450a917.png`,
  'l14-pad-thai': '/images/5.png',
  'l15-pad-see-ew': '/images/food/PadSeeEw.webp',
  'l16-drunken-noodle': '/images/3.png',
  'l18-pineapple-fried-rice': `${IMG}/7014c7c2-1cd3-4466-8fd0-19bc05d06a74.png`,
  'l19-basil-fried-rice': `${IMG}/b6817ff7-c66b-466c-96f4-777c5faaa9da.png`,
}

interface Props {
  onTabChange?: (tab: TabId) => void
}

type MenuMode = 'all-day' | 'lunch'
type FilterId = string

function SpiceDots({ level }: { level?: 1 | 2 | 3 }) {
  if (!level) return null
  return (
    <span className="flex gap-0.5 items-center" aria-label={`Spice level: ${level} of 3`}>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`inline-block w-1.5 h-1.5 rounded-full transition-opacity ${
            n <= level ? 'bg-red-500/80' : 'bg-red-900/30'
          }`}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

function MenuCard({ item, categoryName, imgSrc }: { item: MenuCategory['items'][0]; categoryName: string; imgSrc?: string }) {
  return (
    <article
      className={`menu-card ${item.isOutOfStock ? 'opacity-50' : ''}`}
      aria-label={`${item.name} — $${item.price}`}
    >
      {/* Dish image slot */}
      <div className="relative h-36 overflow-hidden">
        {imgSrc ? (
          <>
            <Image
              src={imgSrc}
              alt={item.seoAlt}
              fill
              className="object-cover"
              sizes="(max-width:768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/20 to-transparent" />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg,#281e08 0%,#1c1c1c 100%)' }}
              role="img"
              aria-label={item.seoAlt}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gold/10 text-[10px] uppercase tracking-widest font-sans text-center px-2">
                {item.name}
              </span>
            </div>
          </>
        )}
        {/* Signature badge */}
        {item.isSignature && (
          <div className="absolute top-2 left-2 bg-gold/90 text-bg-primary text-[9px] uppercase tracking-widest px-2 py-0.5 font-sans font-bold rounded-sm">
            Signature
          </div>
        )}
        {/* Out of stock badge */}
        {item.isOutOfStock && (
          <div className="absolute top-2 right-2 bg-red-900/80 text-red-200 text-[9px] uppercase tracking-widest px-2 py-0.5 font-sans font-bold rounded-sm">
            Out of Stock
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <h3 className="font-display text-gold-light text-base leading-tight">{item.name}</h3>
            {item.itemNumber && (
              <p className="text-gold/40 text-[11px] font-sans mt-0.5">#{item.itemNumber}</p>
            )}
          </div>
          <span className="font-display text-gold text-base flex-shrink-0">
            {item.price > 0 ? `$${item.price}` : 'Ask'}
          </span>
        </div>

        <p className="text-gold/60 text-[13px] font-sans font-light leading-relaxed mt-2 mb-3">
          {item.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <SpiceDots level={item.spice} />
          {item.isVegan && (
            <span className="tag-pill text-emerald-400/70 border-emerald-900/60">V</span>
          )}
          {item.isGlutenFree && (
            <span className="tag-pill text-sky-400/70 border-sky-900/60">GF</span>
          )}
          {item.proteinOptions && (
            <span className="text-gold/35 text-[10px] font-sans uppercase tracking-wider">
              Choose protein
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default function MenuSection({ onTabChange }: Props) {
  const [menuMode, setMenuMode] = useState<MenuMode>('all-day')
  const [activeFilter, setActiveFilter] = useState<FilterId>(() =>
    ALLDAY_CATEGORIES[0]?.id ?? ''
  )

  const categories = menuMode === 'lunch' ? LUNCH_CATEGORIES : ALLDAY_CATEGORIES

  const filters: { id: FilterId; label: string }[] = categories.map((c) => ({ id: c.id, label: c.name }))

  const visibleCategories = categories.filter((c) => c.id === activeFilter)

  return (
    <section className="min-h-full bg-bg-primary" aria-label="Magnolia Thai Restaurant menu">
      {/* Header bar */}
      <div className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm border-b border-gold-muted">
        <div className="px-4 sm:px-6 md:px-12 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="anim-slide-left section-heading text-xl sm:text-2xl md:text-3xl">Our Menu</h1>
              <p className="anim-fade-up delay-100 text-gold/45 text-[11px] sm:text-[12px] font-sans uppercase tracking-widest mt-1">
                Authentic Thai cuisine crafted with tradition
              </p>
            </div>
            <button
              onClick={() => onTabChange?.('contact')}
              className="btn-cta text-[10px] sm:text-[11px] px-5 py-2.5 sm:px-6 sm:py-3 self-start sm:self-auto"
              aria-label="Order online from Magnolia Thai Restaurant"
            >
              Order Online
            </button>
          </div>

          {/* Menu mode toggle */}
          <div className="flex gap-2 mt-3 sm:mt-4">
            {[
              { mode: 'all-day' as MenuMode, label: 'All Day', onSwitch: () => { setMenuMode('all-day'); setActiveFilter(ALLDAY_CATEGORIES[0].id) } },
              { mode: 'lunch' as MenuMode, label: 'Lunch', onSwitch: () => { setMenuMode('lunch'); setActiveFilter(LUNCH_CATEGORIES[0].id) } },
            ].map(({ mode, label, onSwitch }) => (
              <button
                key={mode}
                onClick={onSwitch}
                className={[
                  'px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-sans border rounded-sm transition-all duration-200',
                  menuMode === mode
                    ? 'bg-gold-light text-bg-primary border-gold-light font-bold'
                    : 'border-gold-muted text-gold/70 hover:border-gold/50 hover:text-gold',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Category filter tabs — horizontally scrollable */}
          <div
            className="flex gap-1 mt-2 sm:mt-3 overflow-x-auto pb-px scrollbar-none"
            role="tablist"
            aria-label="Menu categories"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={activeFilter === f.id}
                onClick={() => setActiveFilter(f.id)}
                className={[
                  'flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.18em] font-sans',
                  'border transition-all duration-200 rounded-sm focus:outline-none',
                  'focus-visible:ring-1 focus-visible:ring-gold whitespace-nowrap',
                  activeFilter === f.id
                    ? 'bg-gold-light text-bg-primary border-gold-light font-bold'
                    : 'border-gold-muted text-gold/70 hover:border-gold/50 hover:text-gold',
                ].join(' ')}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu content */}
      <div className="px-4 sm:px-6 md:px-12 py-6 sm:py-8 space-y-10 sm:space-y-12 anim-fade-up">
        {visibleCategories.map((category) => (
          <div key={category.id}>
            <div className="mb-6">
              <h2 className="anim-slide-left font-display text-gold-light text-2xl uppercase tracking-wider">
                {category.name}
              </h2>
              <p className="anim-fade-up delay-100 text-gold/45 text-sm font-sans mt-1">{category.description}</p>
              <div className="gold-divider mt-4 anim-line delay-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 anim-stagger">
              {category.items.map((item) => (
                <MenuCard key={item.id} item={item} categoryName={category.name} imgSrc={DISH_IMAGES[item.id]} />
              ))}
            </div>
          </div>
        ))}

        {/* Protein options note */}
        <div className="border border-gold-muted rounded-lg p-5 bg-bg-secondary">
          <h3 className="font-display text-gold-light text-base mb-2">Protein Options</h3>
          <p className="text-gold/60 text-sm font-sans mb-3">
            Dishes marked &ldquo;Choose protein&rdquo; are available with:
          </p>
          <div className="flex flex-wrap gap-2">
            {PROTEIN_OPTIONS.map((p) => (
              <span key={p} className="tag-pill text-gold/70">
                {p}
              </span>
            ))}
          </div>
          <p className="text-gold/40 text-xs font-sans mt-3">
            Please inform your server of any allergies or dietary requirements.
            V = Vegan · GF = Gluten Free
          </p>
        </div>

        {/* Bottom padding */}
        <div className="h-8" />
      </div>
    </section>
  )
}
