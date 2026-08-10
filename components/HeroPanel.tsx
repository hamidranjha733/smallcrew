import type { Tool } from '@/lib/content';
import { getBadge } from '@/lib/pricing';
import Badge from './Badge';
import PriceStrip from './PriceStrip';
import VendorLogo from './VendorLogo';

export type PanelMeta = {
  label: string;
  value: string;
  teal?: boolean;
};

type Props = {
  title: string;
  badge: string;
  meta: PanelMeta[];
  tools: Tool[];
  foot: string;
};

// Sits to the right of the headline on category and guide pages as a white card
// on the teal hero, so the first screen carries the tools, their logos, their
// cost at all three crew sizes and whether the vendor publishes a price.
export default function HeroPanel({ title, badge, meta, tools, foot }: Props) {
  return (
    <aside className="hero-panel" aria-label={title}>
      <div className="hero-panel-head">
        <span>{title}</span>
        <span>{badge}</span>
      </div>

      {meta.length > 0 && (
        <dl className="hero-panel-meta">
          {meta.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd className={item.teal ? 'teal' : undefined}>{item.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <ul>
        {tools.map((tool) => (
          <li key={tool.tool}>
            <VendorLogo tool={tool.tool} />
            <span className="hero-panel-body">
              <span className="hero-panel-top">
                <span className="hero-panel-name">{tool.tool}</span>
                <Badge kind={getBadge(tool)} />
              </span>
              <PriceStrip tool={tool} compact />
            </span>
          </li>
        ))}
      </ul>

      <p className="hero-panel-foot">{foot}</p>
    </aside>
  );
}
