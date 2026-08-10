import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrapper footer-grid">
        <div>
          <span className="label">About {SITE_NAME}</span>
          <p>
            Small Crew compares software for cleaning, lawn care and pest control companies in the
            United States with one to twenty staff. Every price on this site is the monthly cost of
            the lowest tier that includes online booking, recorded from the vendor pricing page and
            dated on the page it appears on.
          </p>
          <p>
            Small Crew has not used this software. Nothing here is a hands on test, a benchmark or a
            trial report. Every claim describes documented pricing and published features. Vendor
            pricing changes several times a year, so check the date on the page and confirm the
            current figure with the vendor before you buy.
          </p>
          <p>
            Some links earn a commission at no cost to you. Commission does not affect which tools
            appear or the order they appear in.
          </p>
        </div>
        <div>
          <span className="label">Sections</span>
          <ul className="footer-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/#cleaning">Cleaning software</Link>
            </li>
            <li>
              <Link href="/#lawn-care">Lawn care software</Link>
            </li>
            <li>
              <Link href="/#pest-control">Pest control software</Link>
            </li>
            <li>
              <Link href="/#how-we-compare">How we compare</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
