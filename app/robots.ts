import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

// The site is live and open to crawlers. The pre launch block that used to sit
// here has been lifted, together with the matching noindex in app/layout.tsx.
// Those two must always agree, because either one alone keeps the site out of
// the index.
//
// The sitemap and host both read SITE_URL, so the hostname advertised here can
// never drift from the one in the canonical tags.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
