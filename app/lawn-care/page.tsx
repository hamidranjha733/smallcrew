import type { Metadata } from 'next';
import CategoryView from '@/components/CategoryView';
import { buildMetadata, getCategorySeo } from '@/lib/seo';
import { getTradeInfo } from '@/lib/trades';

const info = getTradeInfo('lawn-care');
const seo = getCategorySeo('lawn-care');

export const metadata: Metadata = buildMetadata(seo, info.href);

export default function LawnCarePage() {
  return <CategoryView trade="lawn-care" />;
}
