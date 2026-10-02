import type { Metadata } from 'next';
import CategoryView from '@/components/CategoryView';
import { buildMetadata, getCategorySeo } from '@/lib/seo';
import { getTradeInfo } from '@/lib/trades';

const info = getTradeInfo('cleaning');
const seo = getCategorySeo('cleaning');

export const metadata: Metadata = buildMetadata(seo, info.href);

export default function CleaningPage() {
  return <CategoryView trade="cleaning" />;
}
