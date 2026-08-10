import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

// PRE LAUNCH: THE WHOLE SITE IS BLOCKED FROM SEARCH ENGINES.
//
// This file currently disallows all crawling for every user agent and does not
// reference the sitemap. That is deliberate while the site is unfinished.
//
// REVERSE THIS BEFORE LAUNCH. Restore:
//
//   rules:   { userAgent: '*', allow: '/' }
//   sitemap: `${SITE_URL}/sitemap.xml`
//   host:    SITE_URL
//
// and remove the matching noindex block in app/layout.tsx at the same time.
// Both changes must ship together, because either one alone still keeps the
// site out of the index.
//
// The sitemap route itself is left in place and still builds, so nothing needs
// rebuilding at launch beyond flipping these two files.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  };
}
