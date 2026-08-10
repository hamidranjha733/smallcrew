import type { MetadataRoute } from 'next';
import { getSlugs } from '@/lib/content';
import { TRADES } from '@/lib/trades';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = TRADES.map((trade) => ({
    url: `${SITE_URL}${trade.href}`,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const guides = getSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...categories,
    ...guides,
  ];
}
