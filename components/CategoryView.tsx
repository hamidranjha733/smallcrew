import Link from 'next/link';
import GuideCard from './GuideCard';
import HeroPanel from './HeroPanel';
import JsonLd from './JsonLd';
import StatsBand from './StatsBand';
import { getAllPages, getExtremes, getTrade } from '@/lib/content';
import { getCategorySeo } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';
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
  const extremes = getExtremes(tradePages);

  const seo = getCategorySeo(trade);
  const url = `${SITE_URL}${info.href}`;

  // One row per distinct vendor in this trade, priced at a crew of three from
  // the first guide that covers it.
  const panelTools: { tool: string; price: string }[] = [];
  for (const page of tradePages) {
    for (const tool of page.tools) {
      if (!panelTools.some((entry) => entry.tool === tool.tool)) {
        panelTools.push({ tool: tool.tool, price: tool.crew3 });
      }
    }
  }

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': `${url}#collection`,
            name: seo.title,
            description: seo.description,
            about: seo.keyword,
            inLanguage: 'en-US',
            url,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            publisher: { '@id': `${SITE_URL}/#organization` },
            hasPart: tradePages.map((page) => ({
              '@type': 'Article',
              '@id': `${SITE_URL}/${page.slug}/#article`,
              headline: page.title,
              url: `${SITE_URL}/${page.slug}/`,
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumbs`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: `${info.label} software`, item: url },
            ],
          },
        ]}
      />

      <div className="wrapper page-head">
        <div>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Small Crew</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{info.label}</span>
          </nav>
          <h1>{info.h1}</h1>
          <p className="page-standfirst">{info.standfirst}</p>
        </div>

        <HeroPanel
          title={`${info.label} tools priced`}
          badge={checked}
          meta={[
            { label: 'Guides', value: String(tradePages.length) },
            { label: 'Tool entries', value: String(toolEntries) },
            { label: 'Checked', value: checked, teal: true },
          ]}
          tools={panelTools}
          foot="Monthly cost at a crew of three, lowest tier with online booking"
        />
      </div>

      <StatsBand
        stats={[
          { label: 'Tools priced', value: String(toolEntries), note: `${info.label} entries` },
          { label: 'Guides', value: String(tradePages.length), note: 'In this category' },
          {
            label: 'Price range',
            value: extremes ? `$${extremes.cheapest.price} to $${extremes.dearest.price}` : 'Varies',
            note: 'Per month at ten users',
            teal: true,
          },
          { label: 'Prices checked', value: checked, note: 'Re verified quarterly' },
        ]}
      />

      <div className="band band-white">
        <section className="wrapper section">
          <div className="category-intro">
            {info.intro.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
          <blockquote className="lift-quote">
            <p>{info.pullquote}</p>
          </blockquote>
        </section>
      </div>

      <div className="band band-surface">
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
      </div>

      <div className="band band-white">
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
      </div>
    </>
  );
}
