import type { Metadata } from 'next';
import CategoryView from '@/components/CategoryView';
import { getCategorySeo } from '@/lib/seo';
import { getTradeInfo } from '@/lib/trades';

const info = getTradeInfo('pest-control');
const seo = getCategorySeo('pest-control');

export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: info.href },
  openGraph: {
    type: 'website',
    title: seo.title,
    description: seo.description,
    url: info.href,
  },
  twitter: {
    card: 'summary',
    title: seo.title,
    description: seo.description,
  },
};

export default function PestControlPage() {
  return <CategoryView trade="pest-control" />;
}
