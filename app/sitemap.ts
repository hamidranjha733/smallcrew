import type { MetadataRoute } from 'next';
import { getAllPages, getTrade } from '@/lib/content';
import { checkedToIso } from '@/lib/seo';
import { TRADES } from '@/lib/trades';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages();

  // lastModified is the month the prices on that page were verified, which is
  // the only date on this site that means anything.
  const newest = pages
    .map((page) => checkedToIso(page.pricesChecked))
    .sort()
    .reverse()[0];

  const categories = TRADES.map((trade) => {
    const tradePages = pages.filter((page) => getTrade(page.slug) === trade.trade);
    const latest = tradePages
      .map((page) => checkedToIso(page.pricesChecked))
      .sort()
      .reverse()[0];

    return {
      url: `${SITE_URL}${trade.href}`,
      lastModified: new Date(latest ?? newest),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    };
  });

  const guides = pages.map((page) => ({
    url: `${SITE_URL}/${page.slug}/`,
    lastModified: new Date(checkedToIso(page.pricesChecked)),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(newest),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...categories,
    ...guides,
  ];
}
