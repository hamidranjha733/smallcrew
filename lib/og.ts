import { SITE_URL } from './site';

// Share cards are drawn at build time by scripts/make-og.mjs and written to
// public/og, one png per route.
//
// They were specified as a dynamic route taking ?title=, which this site cannot
// serve: next.config sets output: 'export', and a route handler reading a query
// parameter has nothing to read it with once the site is a folder of files. The
// build fails outright, and forcing it static would hand all twenty four pages
// the same card. Pre rendering one file per page gives the same result, costs
// nothing to serve and can be checked by the audit, which a dynamic route
// could not be.

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/**
 * File stem for a route. The homepage has no slug of its own, so it is named.
 * scripts/make-og.mjs repeats this rule, and the audit fails the build if the
 * two ever disagree, because it checks the file each page points at exists.
 */
export function ogSlug(route: string): string {
  return route.replace(/^\/+|\/+$/g, '') || 'home';
}

/**
 * The title as it appears on the card. The wordmark is already drawn there, so
 * a brand suffix would spend the largest type on the image repeating it.
 */
export function ogTitle(title: string): string {
  return title.replace(/\s*[|–—-]\s*Small Crew\s*$/i, '').trim();
}

/** Absolute url of the card for a route. Built from SITE_URL, never hardcoded. */
export function ogImageUrl(route: string): string {
  return `${SITE_URL}/og/${ogSlug(route)}.png`;
}
