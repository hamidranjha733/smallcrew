import Link from 'next/link';
import GuideCard from './GuideCard';
import TearLine from './TearLine';
import { getAllPages, getTrade } from '@/lib/content';
import { getTradeInfo, TRADES } from '@/lib/trades';
import type { Trade } from '@/lib/content';

type Props = {
  trade: Trade;
};

// Shared body for the three category pages. Each route file is a thin wrapper
// so the routes stay static and the metadata stays per page.
export default async function CategoryView({ trade }: Props) {
  const info = getTradeInfo(trade);
  const pages = await getAllPages();
  const tradePages = pages.filter((page) => getTrade(page.slug) === trade);
  const others = TRADES.filter((item) => item.trade !== trade);

  const toolEntries = tradePages.reduce((sum, page) => sum + page.tools.length, 0);
  const checked = tradePages[0]?.pricesChecked ?? 'Not published';

  return (
    <>
      <div className="wrapper page-head">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Small Crew</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{info.label}</span>
        </nav>
        <h1>{info.h1}</h1>
        <p className="page-standfirst">{info.standfirst}</p>
        <ul className="cost-strip category-strip">
          <li>
            <span className="cost-strip-key">Guides</span>
            <span className="cost-strip-value">{tradePages.length}</span>
          </li>
          <li>
            <span className="cost-strip-key">Tool entries</span>
            <span className="cost-strip-value">{toolEntries}</span>
          </li>
          <li>
            <span className="cost-strip-key">Prices checked</span>
            <span className="cost-strip-value cost-strip-checked">{checked}</span>
          </li>
        </ul>
      </div>

      <div className="wrapper">
        <div className="category-intro">
          {info.intro.map((para) => (
            <p key={para.slice(0, 32)}>{para}</p>
          ))}
        </div>
      </div>

      <TearLine />

      <section className="wrapper section" aria-labelledby="guides-heading">
        <div className="section-head">
          <span className="eyebrow">{info.label}</span>
          <h2 id="guides-heading">All {tradePages.length} comparisons</h2>
        </div>
        <ul className="guide-list">
          {tradePages.map((page) => (
            <GuideCard key={page.slug} page={page} />
          ))}
        </ul>
      </section>

      <TearLine />

      <section className="wrapper section" aria-labelledby="other-trades">
        <div className="section-head">
          <span className="eyebrow">Other trades</span>
          <h2 id="other-trades">Not what you do?</h2>
        </div>
        <div className="trade-links">
          {others.map((item) => (
            <Link key={item.trade} href={item.href} className="trade-link">
              <span className="trade-link-label">{item.label}</span>
              <span className="trade-link-note">{item.standfirst}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
