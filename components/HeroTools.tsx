import type { Tool } from '@/lib/content';
import { parseMoney } from '@/lib/pricing';
import VendorLogo from './VendorLogo';

type Props = {
  tools: Tool[];
  label?: string;
};

function short(value: string): string {
  if (parseMoney(value) !== null) return value;
  if (/quote only/i.test(value)) return 'Quote';
  return 'n/a';
}

// Sits under the headline in the teal hero, filling the space beside the
// docket. Logos of the tools priced on this page, each with its cost at a crew
// of three beneath it.
export default function HeroTools({ tools, label = 'Priced on this page' }: Props) {
  return (
    <div className="hero-tools">
      <span className="label">{label}</span>
      <div className="hero-tools-row">
        {tools.map((tool) => {
          const numeric = parseMoney(tool.crew3) !== null;
          return (
            <span className="hero-tool" key={tool.tool}>
              <VendorLogo tool={tool.tool} />
              <span className={numeric ? 'hero-tool-price' : 'hero-tool-price is-text'}>
                {short(tool.crew3)}
              </span>
            </span>
          );
        })}
      </div>
      <p className="hero-tools-foot">Monthly cost at a crew of three</p>
    </div>
  );
}
