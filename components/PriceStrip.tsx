import type { Tool } from '@/lib/content';
import { parseMoney } from '@/lib/pricing';

type Props = {
  tool: Tool;
  compact?: boolean;
};

function short(value: string): string {
  if (parseMoney(value) !== null) return value;
  if (/quote only/i.test(value)) return 'Quote';
  return 'n/a';
}

// The premise of the whole site, repeated wherever a tool is named: what it
// costs at one, three and ten. No competitor shows cost by crew size, so it
// belongs everywhere the reader looks, not only in the table.
export default function PriceStrip({ tool, compact = false }: Props) {
  return (
    <span className={compact ? 'price-strip price-strip-compact' : 'price-strip'}>
      <span className="price-strip-cell">
        <span className="price-strip-key">1</span>
        {short(tool.solo)}
      </span>
      <span className="price-strip-cell">
        <span className="price-strip-key">3</span>
        {short(tool.crew3)}
      </span>
      <span className="price-strip-cell">
        <span className="price-strip-key">10</span>
        {short(tool.crew10)}
      </span>
    </span>
  );
}
