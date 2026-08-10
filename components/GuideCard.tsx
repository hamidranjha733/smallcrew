import Link from 'next/link';
import type { Page } from '@/lib/content';
import VendorLogo from './VendorLogo';

type Props = {
  page: Page;
};

// One comparison in the card layout, used on the category pages and at the
// bottom of every guide.
export default function GuideCard({ page }: Props) {
  return (
    <li className="guide-item">
      <Link className="guide-link" href={`/${page.slug}/`}>
        <h3>{page.title}</h3>
        <p>{page.standfirst}</p>
        <span className="guide-meta">
          <span className="guide-logos">
            {page.tools.map((tool) => (
              <VendorLogo key={tool.tool} tool={tool.tool} />
            ))}
          </span>
          <span className="guide-count">{page.toolsCompared} tools priced</span>
        </span>
      </Link>
    </li>
  );
}
