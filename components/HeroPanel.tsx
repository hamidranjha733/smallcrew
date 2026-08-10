import { parsePrice } from '@/lib/content';
import VendorLogo from './VendorLogo';

export type PanelTool = {
  tool: string;
  price: string;
};

export type PanelMeta = {
  label: string;
  value: string;
  teal?: boolean;
};

type Props = {
  title: string;
  badge: string;
  meta: PanelMeta[];
  tools: PanelTool[];
  foot: string;
};

// Sits to the right of the headline on category and guide pages, so the first
// screen carries the tools and their prices rather than a headline and one
// paragraph. This is also what puts vendor logos above the fold.
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
        {tools.map((entry) => {
          const numeric = parsePrice(entry.price) !== null;
          return (
            <li key={entry.tool}>
              <VendorLogo tool={entry.tool} />
              <span className="hero-panel-name">{entry.tool}</span>
              <span className={numeric ? 'hero-panel-price' : 'hero-panel-price is-text'}>
                {entry.price}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="hero-panel-foot">{foot}</p>
    </aside>
  );
}
