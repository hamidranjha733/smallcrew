import dates from '@/data/page-dates.json';

// Real last edited dates per route, worked out from git history by
// scripts/page-dates.mjs and committed, because deploys upload files rather
// than git history and the build machine has no log to read.
//
// This is a different fact from the price verification month. That month says
// when the figures in the table were read off a vendor page, and it keeps its
// own visible stamp. This says when the page was last written.

const MODIFIED: Record<string, string> = dates;

/**
 * ISO date a route was last edited. Falls back to the verification date, which
 * is the most recent date we can honestly claim when a route is missing from
 * the map, and never returns something newer than the truth.
 */
export function getModified(route: string, fallbackIso: string): string {
  return MODIFIED[route] ?? fallbackIso;
}

/** Every route the map knows about, for the audit to check against. */
export function knownRoutes(): string[] {
  return Object.keys(MODIFIED);
}
