import { BADGE_LABEL, type BadgeKind } from '@/lib/pricing';

type Props = {
  kind: BadgeKind;
};

// Turns pricing transparency into a visible verdict. Teal where the vendor
// publishes a figure, orange where they route you to sales, grey where we
// could not reach a price at all.
export default function Badge({ kind }: Props) {
  return <span className={`badge badge-${kind}`}>{BADGE_LABEL[kind]}</span>;
}
