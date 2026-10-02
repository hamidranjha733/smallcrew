import type { Metadata } from 'next';
import CategoryView from '@/components/CategoryView';
import { buildMetadata, getCategorySeo } from '@/lib/seo';
import { getTradeInfo } from '@/lib/trades';

const info = getTradeInfo('pest-control');
const seo = getCategorySeo('pest-control');

export const metadata: Metadata = buildMetadata(seo, info.href);

export default function PestControlPage() {
  return <CategoryView trade="pest-control" />;
}
