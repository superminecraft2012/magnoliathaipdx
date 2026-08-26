import { ALLDAY_CATEGORIES, type MenuItem } from '@/lib/menu-data'

/**
 * Content for the search landing pages.
 *
 * PHASE 4 CONTENT RULES — every fact on these pages traces to one of:
 *   1. lib/menu-data.ts (the proven-live menu)
 *   2. what the site already publishes (address, hours, ordering links)
 *   3. general background about the dish itself
 *
 * Deliberately absent:
 *   - Entree prices. menu-data.ts shows a flat $15 for protein-choice dishes
 *     while the printed menu prices them $15-$23 by protein. That is a real
 *     contradiction, so these pages say "priced by protein" and send people to
 *     the live ordering page instead of publishing a number that is wrong for
 *     five of six protein choices.
 *   - `Offer` / `price` structured data anywhere. Prices could not be checked
 *     against Toast (bot-protected), so none of them ship as markup.
 *   - Any dietary claim not printed on the menu. See the Khao Soi vegan FAQ:
 *     the honest answer is that it is NOT vegan, because the live description
 *     says egg noodles.
 */

export interface Faq {
  q: string
  a: string
}

export interface DishPage {
  slug: string
  /** Menu item id in lib/menu-data.ts — the single source for name + description */
  itemId: string
  title: string
  description: string
  h1: string
  /** General background about the dish itself (source 3) */
  background: string[]
  faqs: Faq[]
  /** slugs of 2-3 related dish pages */
  related: string[]
  /**
   * Optional. A photo on a dish page reads as "this is that dish", so a page
   * only gets one when a verified photograph of THAT dish exists. Every image
   * below was checked by opening the file — the alt text that shipped with
   * these photos described a different dish in all 12 cases.
   */
  image?: { src: string; alt: string }
}

/** Look an item up in the live menu. Throws at build time if it ever moves. */
export function findItem(itemId: string): MenuItem {
  for (const c of ALLDAY_CATEGORIES) {
    const hit = c.items.find((i) => i.id === itemId)
    if (hit) return hit
  }
  throw new Error(`landing-content: menu item "${itemId}" not found in menu-data.ts`)
}

export function categoryOf(itemId: string) {
  for (const c of ALLDAY_CATEGORIES) {
    if (c.items.some((i) => i.id === itemId)) return c
  }
  throw new Error(`landing-content: no category for "${itemId}"`)
}

/** Every Khao Soi variant on the live menu, read fresh from the menu data. */
export function khaoSoiItems(): MenuItem[] {
  return ALLDAY_CATEGORIES.flatMap((c) => c.items).filter((i) =>
    i.name.toLowerCase().includes('khao soi')
  )
}

export const DISH_PAGES: DishPage[] = [
  {
    slug: 'pad-thai',
    itemId: 'pad-thai',
    title: 'Best Pad Thai in Portland, OR | Magnolia Thai',
    description:
      'Pad Thai made to order in Milwaukie, minutes from SE Portland. Rice noodles, egg, green onions, bean sprouts and ground peanuts, with your choice of protein. Order pickup or delivery.',
    h1: 'Pad Thai in Portland, Oregon',
    background: [
      'Pad Thai is Thailand’s best known noodle dish — thin rice noodles tossed quickly over high heat with egg and a sweet, sour and salty sauce, then finished with bean sprouts, green onion and crushed peanuts. It is meant to be eaten with a wedge of lime and as much chilli as you like.',
      'The balance is the whole point. A good Pad Thai is not sweet; it is sour and savoury first, with the sugar sitting underneath. The noodles should stay separate rather than clumping, which is why it is cooked one order at a time.',
    ],
    faqs: [
      {
        q: 'What is the difference between Pad Thai and Pad See Ew?',
        a: 'They use different noodles and completely different sauces. Our Pad Thai uses thin rice noodles with egg, green onions, bean sprouts and ground peanuts. Our Pad See Ew uses wide rice noodles stir fried with egg, broccoli, carrots and our signature sauce — darker, savoury and not sour. Pad Thai is the tangy one; Pad See Ew is the savoury one.',
      },
      {
        q: 'Is Pad Thai spicy?',
        a: 'Not by default. Pad Thai is seasoned for balance rather than heat, and chilli is traditionally added at the table. Tell us how hot you would like it when you order.',
      },
      {
        q: 'What protein can I choose?',
        a: 'Pad Thai is available with chicken, beef, pork, tofu, shrimp or prawns. The price depends on which protein you choose, so the current amount is shown on our online ordering page.',
      },
      {
        q: 'Do you have a gluten-free Pad Thai?',
        a: 'Our menu lists Glass Noodles Pad Thai as gluten free. We cannot verify how any individual dish is prepared through this page, and our kitchen handles wheat, shellfish, peanuts and fish sauce. Please call us on (503) 659-0149 and tell us about your allergy before ordering.',
      },
      {
        q: 'Can I get Pad Thai delivered in the Portland area?',
        a: 'Yes. You can order pickup or delivery directly through our online ordering page, or through UberEats, DoorDash and Grubhub. We are at 10574 SE 32nd Ave in Milwaukie, just south of SE Portland.',
      },
    ],
    related: ['pad-see-ew', 'drunken-noodles', 'pineapple-fried-rice'],
    image: {
      src: '/menu/8.webp',
      alt: 'Pad Thai Duck at Magnolia Thai — Pad Thai rice noodles with crispy roasted duck, bean sprouts, ground peanuts and lime',
    },
  },
  {
    slug: 'pad-see-ew',
    itemId: 'pad-see-ew',
    title: 'Best Pad See Ew in Portland, OR | Magnolia Thai',
    description:
      'Pad See Ew in Milwaukie, minutes from SE Portland — wide rice noodles stir fried with egg, broccoli, carrots and our signature sauce, with your choice of protein.',
    h1: 'Pad See Ew in Portland, Oregon',
    background: [
      'Pad See Ew is the savoury counterpart to Pad Thai. Wide, flat rice noodles are charred quickly in a very hot wok with soy, egg and greens, so the noodles pick up a faint smokiness — the quality Thai cooks call wok hei. There is no tamarind and no peanut, so nothing tastes sour or sweet-sharp.',
      'Because the noodles are wide and soft, Pad See Ew is often the dish people order when they want something comforting rather than bright. It is a good first Thai noodle dish for children and for anyone who does not want heat.',
    ],
    faqs: [
      {
        q: 'What is Pad See Ew?',
        a: 'Wide rice noodles stir fried with egg, broccoli, carrots and our signature sauce. It is savoury and mild rather than sour or sweet, and it is cooked over very high heat so the noodles pick up a little char.',
      },
      {
        q: 'Pad See Ew vs Drunken Noodles — what is the difference?',
        a: 'Both use flat noodles, but they taste nothing alike. Pad See Ew is savoury and mild, with broccoli and carrots. Our Pad Drunken Noodles are made with bell pepper, sweet basil leaf, tomato and onion and are prepared spicy. Choose Pad See Ew if you do not want heat.',
      },
      {
        q: 'Is Pad See Ew spicy?',
        a: 'No. Pad See Ew is one of the mildest noodle dishes on our menu. If you would like heat added, tell us when you order.',
      },
      {
        q: 'Is Pad See Ew gluten free?',
        a: 'The noodles are rice noodles, but the sauce and the shared wok are the issue — our menu does not mark Pad See Ew as gluten free. Please call (503) 659-0149 and tell us about your allergy before ordering.',
      },
    ],
    related: ['pad-thai', 'drunken-noodles', 'pineapple-fried-rice'],
    image: {
      src: '/images/food/PadSeeEw.webp',
      alt: 'Pad See Ew — wide rice noodles stir fried with egg, broccoli and carrots',
    },
  },
  {
    slug: 'drunken-noodles',
    itemId: 'pad-drunken-noodles',
    title: 'Best Drunken Noodles in Portland, OR | Magnolia Thai',
    description:
      'Drunken Noodles (Pad Kee Mao) in Milwaukie, minutes from SE Portland — flat noodles with egg, bell pepper, sweet basil, tomato and onion, served with fresh bean sprouts.',
    h1: 'Drunken Noodles in Portland, Oregon',
    background: [
      'Drunken Noodles — Pad Kee Mao in Thai — are the spicy, basil-heavy member of the flat-noodle family. The name has nothing to do with alcohol in the dish; the usual explanation is that it is what you want to eat while drinking, or the morning after.',
      'What sets it apart from other stir-fried noodles is holy basil and chilli going into the wok together, so the heat arrives with a peppery, almost aniseed edge rather than as plain burn.',
    ],
    faqs: [
      {
        q: 'Are Drunken Noodles actually made with alcohol?',
        a: 'No. There is no alcohol in the dish. The Thai name Pad Kee Mao translates roughly as “drunkard’s stir fry”, and it refers to when the dish is eaten rather than what is in it.',
      },
      {
        q: 'How spicy are Drunken Noodles?',
        a: 'Our menu marks this dish as spicy — it is one of the hotter noodle dishes we make. We can adjust the heat up or down, so tell us what you want when you order.',
      },
      {
        q: 'What is in Magnolia Thai’s Drunken Noodles?',
        a: 'Flat noodles with egg, bell pepper, sweet basil leaf, tomato and onion, served with fresh bean sprouts. You choose the protein.',
      },
      {
        q: 'Drunken Noodles vs Pad Thai — which should I order?',
        a: 'Order Drunken Noodles if you want heat and basil. Order Pad Thai if you want the tangy, peanut-topped noodle dish that is not spicy. They share almost nothing beyond being noodles.',
      },
    ],
    related: ['pad-see-ew', 'pad-thai', 'pineapple-fried-rice'],
    // No image: the photo previously used here (/menu/3.webp) is fried spring
    // rolls, and there is no photograph of Drunken Noodles in the library.
    // Showing a different dish is worse than showing none. See SEO.md.
  },
  {
    slug: 'pineapple-fried-rice',
    itemId: 'pineapple-fried-rice',
    title: 'Best Pineapple Fried Rice in Portland | Magnolia Thai',
    description:
      'Thai pineapple fried rice in Milwaukie, minutes from SE Portland — fried rice with egg, cashew nuts, peas and carrots, tomatoes and pineapple, topped with cucumber and cilantro.',
    h1: 'Pineapple Fried Rice in Portland, Oregon',
    background: [
      'Thai pineapple fried rice is a mild, slightly sweet fried rice that leans on fruit and nuts rather than chilli. The pineapple goes in near the end so it keeps its shape and releases juice into the rice rather than dissolving into it.',
      'It is the fried rice most people order when they are feeding a mixed table — there is no heat to negotiate, and the cashews and cucumber give it more texture than a plain fried rice.',
    ],
    faqs: [
      {
        q: 'What is in Thai pineapple fried rice?',
        a: 'Ours is fried rice with your choice of meat, egg, cashew nuts, peas and carrots, tomatoes and pineapple, topped with cucumber and cilantro.',
      },
      {
        q: 'Is pineapple fried rice spicy?',
        a: 'No. It is one of the mildest dishes on our menu, which makes it a good choice for children or for anyone sharing a table with people who do not eat chilli.',
      },
      {
        q: 'Does it contain nuts?',
        a: 'Yes — cashew nuts are part of the dish. If you have a nut allergy please call us on (503) 659-0149 before ordering, as our kitchen also uses peanuts.',
      },
      {
        q: 'Can I get it vegetarian?',
        a: 'You choose the protein, and tofu is one of the options. We cannot confirm through this page whether every component suits a strict vegetarian or vegan diet — Thai kitchens commonly use fish sauce and oyster sauce — so please tell us when you order and we will tell you what we can do.',
      },
    ],
    related: ['pad-thai', 'pad-see-ew', 'drunken-noodles'],
    image: {
      src: '/menu/6.webp',
      alt: 'Pineapple fried rice at Magnolia Thai — Thai fried rice with pineapple, tofu, peas, carrot, tomato and cucumber',
    },
  },
]

export function dishBySlug(slug: string) {
  return DISH_PAGES.find((d) => d.slug === slug)
}

export const KHAO_SOI_FAQS: Faq[] = [
  {
    q: 'What is Khao Soi?',
    a: 'Khao Soi is the signature noodle dish of northern Thailand — a coconut curry broth poured over soft egg noodles, topped with a nest of crisp fried egg noodles, and served with shallots and pickled mustard greens. Ours is made northern style with shallots, pickled mustard and fried shallots on top of crispy egg noodle.',
  },
  {
    q: 'What does Khao Soi taste like?',
    a: 'Rich and mildly spiced rather than fiery. The broth is coconut-heavy and slightly sweet, and the pickled mustard greens and shallots are there to cut through it. The two noodle textures — soft underneath, crisp on top — are the point of the dish.',
  },
  {
    q: 'Is Khao Soi spicy?',
    a: 'Our Khao Soi is prepared at a medium heat level. Tell us when you order if you would like it milder or hotter.',
  },
  {
    q: 'Is your Tofu Khao Soi vegan?',
    a: 'No. Khao Soi is built on egg noodles, and our Tofu Khao Soi is made with egg noodles like every other version, so it is not vegan and not egg free. It is the right choice if you do not eat meat, but please call us on (503) 659-0149 if you need us to confirm anything else about how it is prepared.',
  },
  {
    q: 'Khao Soi vs Pad Thai — what is the difference?',
    a: 'Pad Thai is a dry stir-fried noodle dish from central Thailand. Khao Soi is a northern curry noodle soup — you eat it from a bowl with a spoon. If you have only ever had Pad Thai, Khao Soi will taste like a different cuisine.',
  },
  {
    q: 'Where can I get Khao Soi near Portland?',
    a: 'We serve Khao Soi at 10574 SE 32nd Ave in Milwaukie, Oregon — just south of SE Portland and a short drive from Sellwood, Westmoreland and Oak Grove. You can also order it for pickup or delivery online.',
  },
]
