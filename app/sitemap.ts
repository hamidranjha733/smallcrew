import type { MetadataRoute } from 'next';
import { getSlugs } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getSlugs().map((slug) => ({
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
    ...pages,
  ];
}
