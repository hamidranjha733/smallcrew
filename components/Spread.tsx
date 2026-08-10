import Link from 'next/link';
import type { Extremes } from '@/lib/content';
import PriceStrip from './PriceStrip';
import VendorLogo from './VendorLogo';

type Props = {
  extremes: Extremes;
};

// The reason to read this site, stated as one number against another: what the
// same job costs at a crew of ten depending only on which tool you picked.
export default function Spread({ extremes }: Props) {
  const { cheapest, dearest, priced, total } = extremes;
  const multiple = Math.round((dearest.price / cheapest.price) * 10) / 10;
  const yearly = (dearest.price - cheapest.price) * 12;

  return (
    <div className="spread">
      <div className="spread-side cheap">
        <span className="label">Cheapest at ten users</span>
        <span className="spread-price">${cheapest.price.toLocaleString('en-US')}</span>
        <span className="spread-per">per month</span>
        <span className="spread-tool">
          <VendorLogo tool={cheapest.tool} size="lg" />
          {cheapest.tool}
        </span>
        <PriceStrip tool={cheapest.row} />
        <p className="spread-note">
          {cheapest.bestFor}. Compared on{' '}
          <Link href={`/${cheapest.slug}/`}>{cheapest.title.toLowerCase()}</Link>.
        </p>
      </div>

      <div className="spread-divider" role="presentation" />

      <div className="spread-side dear">
        <span className="label">Dearest at ten users</span>
        <span className="spread-price">${dearest.price.toLocaleString('en-US')}</span>
        <span className="spread-per">per month</span>
        <span className="spread-tool">
          <VendorLogo tool={dearest.tool} size="lg" />
          {dearest.tool}
        </span>
        <PriceStrip tool={dearest.row} />
        <p className="spread-note">
          {dearest.bestFor}. Compared on{' '}
          <Link href={`/${dearest.slug}/`}>{dearest.title.toLowerCase()}</Link>.
        </p>
      </div>

      <p className="spread-foot">
        That is a {multiple} times spread, or{' '}
        <strong>${yearly.toLocaleString('en-US')} a year</strong> between the cheapest and dearest
        way to run a ten person crew. Across {total} tool entries on this site, {priced} carry a
        published figure at ten users. The rest are quote only or could not be confirmed, which is
        itself worth knowing before you book a demo.
      </p>
    </div>
  );
}
