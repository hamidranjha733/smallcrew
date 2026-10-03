import type { MetadataRoute } from 'next';
import { getAllPages } from '@/lib/content';
import { getModified } from '@/lib/dates';
import { checkedToIso } from '@/lib/seo';
import { TRADES } from '@/lib/trades';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

// lastmod and the dateModified in page schema are the same claim made twice, so
// they read the same source. That source is the per page edit date worked out
// from git by scripts/page-dates.mjs, never the price verification month, which
// is a different fact with its own visible stamp on the page.
//
// This file used to date every url from the verification month, which put
// 1 August on twenty four urls including two pages that did not exist then.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages();

  // Only ever used if a route is missing from the date map. It is the oldest
  // honest date we hold, so a gap understates freshness rather than inventing
  // it.
  const checkedFallback = pages
    .map((page) => checkedToIso(page.pricesChecked))
    .sort()
    .reverse()[0];

  const entry = (
    route: string,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number,
    fallbackIso = checkedFallback,
  ) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(getModified(route, fallbackIso)),
    changeFrequency,
    priority,
  });

  return [
    entry('/', 'weekly', 1),
    entry('/about/', 'monthly', 0.5),
    entry('/contact/', 'yearly', 0.4),
    entry('/privacy/', 'yearly', 0.3),
    entry('/zenmaid-pricing/', 'monthly', 0.8),
    entry('/arborgold-pricing/', 'monthly', 0.8),
    entry('/service-autopilot-pricing/', 'monthly', 0.8),
    entry('/janitorial-bidding-software/', 'monthly', 0.8),
    ...TRADES.map((trade) => entry(trade.href, 'weekly', 0.9)),
    ...pages.map((page) =>
      entry(`/${page.slug}/`, 'monthly', 0.8, checkedToIso(page.pricesChecked)),
    ),
  ];
}
