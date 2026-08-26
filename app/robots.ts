import type { MetadataRoute } from 'next'
import { SITE_ORIGIN } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Raw content sources and camera originals that Netlify serves at 200.
        // They duplicate the rendered menu; keeping them reachable but
        // unindexed avoids breaking any link that was texted or QR-coded.
        disallow: ['/menu/Magnolia_Menu.md', '/thai-magnolia-assets/'],
      },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  }
}
