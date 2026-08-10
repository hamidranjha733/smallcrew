import type { Metadata } from 'next';
import Link from 'next/link';
import TearLine from '@/components/TearLine';
import { TRADES } from '@/lib/trades';

export const metadata: Metadata = {
  title: { absolute: 'Page not found | Small Crew' },
  description:
    'That page is not here. Every Small Crew comparison prices software on the tier that includes online booking, at one, three and ten users, with dated figures.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <div className="wrapper page-head">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Small Crew</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Not found</span>
        </nav>
        <h1>That page is not here</h1>
        <p className="page-standfirst">
          The link is wrong or the page has moved. Nothing has been deleted, so the comparison you
          wanted is almost certainly one of the three trades below.
        </p>
      </div>

      <TearLine />

      <section className="wrapper section" aria-labelledby="nf-heading">
        <div className="section-head">
          <span className="eyebrow">Pick up where you left off</span>
          <h2 id="nf-heading">Where to go instead</h2>
        </div>
        <div className="trade-links">
          {TRADES.map((trade) => (
            <Link key={trade.trade} href={trade.href} className="trade-link">
              <span className="trade-link-label">{trade.label} software</span>
              <span className="trade-link-note">{trade.standfirst}</span>
            </Link>
          ))}
          <Link href="/" className="trade-link">
            <span className="trade-link-label">Start at the beginning</span>
            <span className="trade-link-note">
              What cleaning business software costs at one, three and ten users, with the summary
              table across all three trades.
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
