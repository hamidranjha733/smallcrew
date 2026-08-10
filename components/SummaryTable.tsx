'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import type { SummaryRow } from '@/lib/summary';
import { costAt, getBadge, parseMoney } from '@/lib/pricing';
import { getVendor } from '@/lib/vendors';
import Badge from './Badge';
import CrewControl from './CrewControl';
import PriceStrip from './PriceStrip';
import VendorLogo from './VendorLogo';

type Props = {
  rows: SummaryRow[];
  pricesChecked: string;
};

function priceClass(value: string): string {
  const parsed = parseMoney(value);
  if (parsed === null) return 'cell-price is-text';
  if (parsed === 0) return 'cell-price is-free';
  return 'cell-price';
}

// Cross trade summary on the homepage. Every figure is read from the guide
// named in the Trade column, never authored here. It carries the same crew
// size control as the guide tables.
export default function SummaryTable({ rows, pricesChecked }: Props) {
  const [crew, setCrew] = useState(3);
  const id = useId();

  return (
    <div className="cost-table-frame">
      <CrewControl id={id} crew={crew} onChange={setCrew} />

      <div className="cost-table-scroll">
        <table className="cost-table">
          <thead>
            <tr>
              <th scope="col">Tool</th>
              <th scope="col">Trade</th>
              <th scope="col" className="num-head">
                Solo
              </th>
              <th scope="col" className="num-head">
                Crew of 3
              </th>
              <th scope="col" className="num-head">
                Crew of 10
              </th>
              <th scope="col" className="num-head calc-head">
                At {crew}
              </th>
              <th scope="col">Watch out for</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((entry) => {
              const vendor = getVendor(entry.tool);
              const computed = costAt(entry.row, crew);
              const numeric = parseMoney(computed.text) !== null;

              return (
                <tr key={entry.tool}>
                  <th scope="row" className="cell-tool">
                    <span className="tool-id">
                      <VendorLogo tool={entry.tool} />
                      <span className="tool-id-text">
                        <a href={entry.row.url} rel="nofollow sponsored noopener" target="_blank">
                          {entry.tool}
                        </a>
                        {vendor && <span className="tool-domain">{vendor.domain}</span>}
                      </span>
                    </span>
                    <PriceStrip tool={entry.row} compact />
                    <Badge kind={getBadge(entry.row)} />
                  </th>
                  <td className="cell-trade" data-label="Trade">
                    <Link href={`/${entry.slug}/`}>{entry.trade}</Link>
                  </td>
                  <td className={priceClass(entry.row.solo)} data-label="Solo">
                    {entry.row.solo}
                  </td>
                  <td className={priceClass(entry.row.crew3)} data-label="Crew of 3">
                    {entry.row.crew3}
                  </td>
                  <td className={priceClass(entry.row.crew10)} data-label="Crew of 10">
                    {entry.row.crew10}
                  </td>
                  <td
                    className={`cell-calc${numeric ? '' : ' is-text'}`}
                    data-label={`At ${crew}`}
                  >
                    {computed.text}
                    {numeric && !computed.exact && <span className="calc-band">published band</span>}
                  </td>
                  <td className="cell-watch" data-label="Watch out for">
                    <span className="watch-flag" aria-hidden="true">
                      !
                    </span>
                    {entry.row.watch}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="cost-table-caption">
        <strong>
          Prices are the monthly cost of the lowest tier that includes online booking, not the
          cheapest tier on the vendor pricing page.
        </strong>{' '}
        Figures at one, three and ten users, billed monthly, read from each vendor pricing page in{' '}
        {pricesChecked}. Crew prices are calculated from a published base rate plus a published per
        seat or per schedule rate and are not quotes. Each row links to the full comparison it came
        from. Small Crew has not used this software.
      </p>
    </div>
  );
}
