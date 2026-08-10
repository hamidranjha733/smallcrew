import type { Metadata } from 'next';
import CategoryView from '@/components/CategoryView';
import { getTradeInfo } from '@/lib/trades';

const info = getTradeInfo('lawn-care');

export const metadata: Metadata = {
  title: info.metaTitle,
  description: info.metaDescription,
  alternates: { canonical: info.href },
  openGraph: {
    type: 'website',
    title: info.metaTitle,
    description: info.metaDescription,
    url: info.href,
  },
};

export default function LawnCarePage() {
  return <CategoryView trade="lawn-care" />;
}
