import Link from 'next/link';
import { PRICING_PAGE_LINK_TEXT, getPricingPage } from '@/lib/vendors';

type Props = {
  tool: string;
  /** The route the table is on, so a page never links to itself. */
  currentRoute?: string;
};

/**
 * The link to this site's own breakdown of a vendor, under the vendor name in a
 * table cell.
 *
 * It sits beside the outbound vendor link and never replaces or wraps it. For
 * the vendors with no breakdown page, which is most of them, it renders
 * nothing and the cell is unchanged.
 *
 * The visible text is the same for every vendor on purpose. The accessible name
 * carries the vendor as well, because a screen reader reading a list of links
 * out of context would otherwise hear the same phrase several times on one
 * page with nothing to tell them apart. The visible text is contained in the
 * accessible name, so the two still agree.
 */
export default function VendorBreakdownLink({ tool, currentRoute }: Props) {
  const href = getPricingPage(tool, currentRoute);
  if (!href) return null;

  return (
    <Link className="tool-breakdown" href={href} aria-label={`${tool}, ${PRICING_PAGE_LINK_TEXT}`}>
      {PRICING_PAGE_LINK_TEXT}
    </Link>
  );
}
