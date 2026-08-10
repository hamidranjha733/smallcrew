'use client';

import { useId, useState } from 'react';
import type { Tool } from '@/lib/content';
import { costAt, getBadge, parseMoney } from '@/lib/pricing';
import { getVendor } from '@/lib/vendors';
import Badge from './Badge';
import PriceStrip from './PriceStrip';
import VendorLogo from './VendorLogo';

type Props = {
  tools: Tool[];
  pricesChecked: string;
  // Most pages price the lowest tier that includes online booking. Accounting
  // and invoicing pages compare tools that have no booking feature at all, so
  // they state the threshold they were priced on instead.
  basis?: string;
};

const DEFAULT_BASIS =
  'Prices are for the lowest tier that includes online booking, not the cheapest tier on the vendor pricing page.';

function priceClass(value: string): string {
  const parsed = parseMoney(value);
  if (parsed === null) return 'cell-price is-text';
  if (parsed === 0) return 'cell-price is-free';
  return 'cell-price';
}

// The signature element of the site. The six published columns are unchanged.
// The crew size control adds one calculated column beside them, worked out
// from the base and per seat rates implied by those same three figures.
export default function CostTable({ tools, pricesChecked, basis }: Props) {
  const [crew, setCrew] = useState(3);
  const id = useId();

  return (
    <div className="cost-table-frame">
      <div className="crew-calc">
        <label className="crew-calc-label" htmlFor={id}>
          Your crew size
        </label>
        <input
          id={id}
          className="crew-calc-range"
          type="range"
          min={1}
          max={20}
          step={1}
          value={crew}
          onChange={(event) => setCrew(Number(event.target.value))}
        />
        <output className="crew-calc-value" htmlFor={id}>
          {crew} {crew === 1 ? 'person' : 'people'}
        </output>
        <span className="crew-calc-note">
          Calculated from each vendor published base and per seat rate. Banded and per schedule
          pricing shows the published band, never a number between two of them.
        </span>
      </div>

      <div className="cost-table-scroll">
        <table className="cost-table">
          <thead>
            <tr>
              <th scope="col">Tool</th>
              <th scope="col">Best for</th>
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
            {tools.map((row) => {
              const vendor = getVendor(row.tool);
              const computed = costAt(row, crew);
              const numeric = parseMoney(computed.text) !== null;

              return (
                <tr key={row.tool}>
                  <th scope="row" className="cell-tool">
                    <span className="tool-id">
                      <VendorLogo tool={row.tool} />
                      <span className="tool-id-text">
                        <a href={row.url} rel="nofollow sponsored noopener" target="_blank">
                          {row.tool}
                        </a>
                        {vendor && <span className="tool-domain">{vendor.domain}</span>}
                      </span>
                    </span>
                    <PriceStrip tool={row} compact />
                    <Badge kind={getBadge(row)} />
                  </th>
                  <td className="cell-best" data-label="Best for">
                    <span className="stamp">{row.bestFor}</span>
                  </td>
                  <td className={priceClass(row.solo)} data-label="Solo">
                    {row.solo}
                  </td>
                  <td className={priceClass(row.crew3)} data-label="Crew of 3">
                    {row.crew3}
                  </td>
                  <td className={priceClass(row.crew10)} data-label="Crew of 10">
                    {row.crew10}
                  </td>
                  <td
                    className={`cell-calc${numeric ? '' : ' is-text'}${
                      computed.exact ? '' : ' is-band'
                    }`}
                    data-label={`At ${crew}`}
                  >
                    {computed.text}
                    {numeric && !computed.exact && <span className="calc-band">published band</span>}
                  </td>
                  <td className="cell-watch" data-label="Watch out for">
                    <span className="watch-flag" aria-hidden="true">
                      !
                    </span>
                    {row.watch}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="cost-table-caption">
        <strong>{basis ?? DEFAULT_BASIS}</strong>{' '}
        Figures are the monthly cost at one, three and ten users, billed monthly rather than
        prepaid annually, read from each vendor pricing page in {pricesChecked}. Crew of 3 and
        Crew of 10 prices are calculated from a published base rate plus a published per seat or
        per schedule rate. They are not quotes, and the calculation for each tool is shown in the
        Watch out for column. Where a vendor routes pricing through a sales conversation the cell
        reads Quote only, and where we could not reach a pricing page at all it reads Could not
        confirm. Small Crew has not used this software. Every entry describes documented pricing
        and features.
      </p>
    </div>
  );
}
