import type { Tool } from '@/lib/content';

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

// The signature element of the site. Six columns, one row per tool. Prices are
// the monthly cost on the lowest tier that includes online booking, at one,
// three and ten users. Never the cheapest tier on the vendor page.
export default function CostTable({ tools, pricesChecked, basis }: Props) {
  return (
    <div className="cost-table-frame">
      <div className="cost-table-scroll">
        <table className="cost-table">
          <thead>
            <tr>
              <th scope="col">Tool</th>
              <th scope="col">Best for</th>
              <th scope="col">Solo</th>
              <th scope="col">Crew of 3</th>
              <th scope="col">Crew of 10</th>
              <th scope="col">Watch out for</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((row) => (
              <tr key={row.tool}>
                <th scope="row" className="cell-tool">
                  <a href={row.url} rel="nofollow sponsored noopener" target="_blank">
                    {row.tool}
                  </a>
                </th>
                <td className="cell-best" data-label="Best for">
                  {row.bestFor}
                </td>
                <td className="cell-price" data-label="Solo">
                  {row.solo}
                </td>
                <td className="cell-price" data-label="Crew of 3">
                  {row.crew3}
                </td>
                <td className="cell-price" data-label="Crew of 10">
                  {row.crew10}
                </td>
                <td className="cell-watch" data-label="Watch out for">
                  {row.watch}
                </td>
              </tr>
            ))}
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
