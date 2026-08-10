import Link from 'next/link';
import { TRADES } from '@/lib/trades';

type Props = {
  checked: string;
};

// Dark band above the footer, so the page closes on ink rather than fading out
// on a light section.
export default function ClosingBand({ checked }: Props) {
  return (
    <section className="closing-band" aria-labelledby="closing-heading">
      <div className="wrapper closing-inner">
        <div>
          <span className="label">Before you buy</span>
          <h2 id="closing-heading">Check the date on the price, then check it again</h2>
          <p>
            Every figure on this site was read from a vendor pricing page in {checked} and is the
            lowest tier that includes online booking, never the cheapest plan on the page. Vendor
            pricing changes several times a year, so confirm the current number with the vendor
            before you commit to anything.
          </p>
        </div>
        <div className="closing-links">
          {TRADES.map((trade) => (
            <Link key={trade.trade} href={trade.href}>
              {trade.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
