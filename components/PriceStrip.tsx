import type { Tool } from '@/lib/content';
import { parseMoney } from '@/lib/pricing';

type Props = {
  tool: Tool;
  compact?: boolean;
};

// Non numeric cells keep the exact wording the tables use. No abbreviations
// and no n/a, because a reader should never meet a term here that appears
// nowhere else on the site.
function cell(value: string): { text: string; numeric: boolean } {
  const numeric = parseMoney(value) !== null;
  return { text: value, numeric };
}

// The premise of the whole site, repeated wherever a tool is named: what it
// costs at one, three and ten. No competitor shows cost by crew size, so it
// belongs everywhere the reader looks, not only in the table.
export default function PriceStrip({ tool, compact = false }: Props) {
  return (
    <span className={compact ? 'price-strip price-strip-compact' : 'price-strip'}>
      {(
        [
          ['1', tool.solo],
          ['3', tool.crew3],
          ['10', tool.crew10],
        ] as const
      ).map(([key, value]) => {
        const { text, numeric } = cell(value);
        return (
          <span
            className={numeric ? 'price-strip-cell' : 'price-strip-cell is-text'}
            key={key}
          >
            <span className="price-strip-key">{key}</span>
            {text}
          </span>
        );
      })}
    </span>
  );
}
