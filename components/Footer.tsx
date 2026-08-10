import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';
import { TRADES } from '@/lib/trades';

type Props = {
  checked: string;
  guides: number;
  toolEntries: number;
};

// Styled as the foot of an invoice: the method statement, then a ruled total
// block carrying the counts and the verification date.
export default function Footer({ checked, guides, toolEntries }: Props) {
  return (
    <footer className="site-footer">
      <div className="wrapper">
        <div className="footer-grid">
          <div>
            <span className="label">Method</span>
            <p>
              {SITE_NAME} compares software for cleaning, lawn care and pest control companies in
              the United States with one to twenty staff. Every price is the monthly cost of the
              lowest tier that includes online booking, read from the vendor pricing page and dated
              on the page it appears on. Crew prices are calculated from published base and per seat
              rates, not quoted.
            </p>
            <p>
              {SITE_NAME} has not used this software. Nothing here is a hands on test, a benchmark
              or a trial report. Vendor pricing changes several times a year, so check the date on
              the page and confirm the current figure with the vendor before you buy. Some links
              earn a commission at no cost to you, and commission does not affect which tools appear
              or the order they appear in.
            </p>

            <dl className="invoice-total">
              <div>
                <dt>Guides</dt>
                <dd>{guides}</dd>
              </div>
              <div>
                <dt>Tool entries priced</dt>
                <dd>{toolEntries}</dd>
              </div>
              <div>
                <dt>Prices checked</dt>
                <dd className="signal">{checked}</dd>
              </div>
              <div>
                <dt>Next review due</dt>
                <dd>Within four months</dd>
              </div>
            </dl>

            <p className="footer-sign">
              Priced and dated by {SITE_NAME}. No price ships undated.
            </p>
          </div>

          <div>
            <span className="label">Sections</span>
            <ul className="footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              {TRADES.map((trade) => (
                <li key={trade.trade}>
                  <Link href={trade.href}>{trade.label} software</Link>
                </li>
              ))}
              <li>
                <Link href="/#how-we-compare">How we compare</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
