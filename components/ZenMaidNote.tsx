import Link from 'next/link';
import type { Tool } from '@/lib/content';

// ZenMaid is the one tool on this site whose published price is not the price
// anyone pays, because the figure on its pricing page is the cost at a team of
// nobody. Wherever its numbers appear, this says what they mean. Rendered from
// the tool list rather than written into each page, so a table that gains
// ZenMaid gains the note with it.
export function hasZenMaid(tools: Tool[]): boolean {
  return tools.some((tool) => tool.tool === 'ZenMaid');
}

export default function ZenMaidNote() {
  return (
    <p className="vendor-note">
      <span className="vendor-note-label">On the ZenMaid figures</span>
      ZenMaid charges per person on the team and counts office staff too, so a three cleaner
      company with an office manager is four people and pays $95 on Pro. The column above counts
      only people who need a login. Prices here are the Pro tier at every crew size: Starter is
      cheaper but capped at forty appointments a month, which a crew of ten passes easily, so
      quoting it in a ten cleaner column would flatter it. These ZenMaid figures were read on 2
      October 2026, which is later than the date on the rest of this table. The{' '}
      <Link href="/zenmaid-pricing/">full ZenMaid pricing breakdown</Link> shows every tier at
      every size.
    </p>
  );
}
