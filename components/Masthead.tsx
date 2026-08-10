import Link from 'next/link';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site';
import { TRADES } from '@/lib/trades';

export default function Masthead() {
  return (
    <header className="masthead">
      <div className="wrapper masthead-inner">
        <Link href="/" className="wordmark">
          <span className="wordmark-mark" aria-hidden="true" />
          {SITE_NAME}
        </Link>
        <p className="masthead-tagline">{SITE_TAGLINE}</p>
        <nav className="masthead-nav" aria-label="Trades">
          {TRADES.map((trade) => (
            <Link key={trade.trade} href={trade.href}>
              {trade.label}
            </Link>
          ))}
          <Link href="/#how-we-compare">Method</Link>
        </nav>
      </div>
    </header>
  );
}
