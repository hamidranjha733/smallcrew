import Link from 'next/link';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site';

export default function Masthead() {
  return (
    <header className="masthead">
      <div className="wrapper masthead-inner">
        <Link href="/" className="wordmark">
          {SITE_NAME}
        </Link>
        <p className="masthead-tagline">{SITE_TAGLINE}</p>
        <nav className="masthead-nav" aria-label="Trades">
          <Link href="/#cleaning">Cleaning</Link>
          <Link href="/#lawn-care">Lawn care</Link>
          <Link href="/#pest-control">Pest control</Link>
          <Link href="/#how-we-compare">Method</Link>
        </nav>
      </div>
    </header>
  );
}
