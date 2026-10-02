import Link from 'next/link';
import CostTable from './CostTable';
import Disclosure from './Disclosure';
import GuideCard from './GuideCard';
import HeroPanel from './HeroPanel';
import JsonLd from './JsonLd';
import PriceStrip from './PriceStrip';
import PricedStamp from './PricedStamp';
import StatsBand from './StatsBand';
import VendorNotes from './VendorNotes';
import TearLine from './TearLine';
import Toc from './Toc';
import Byline from './Byline';
import { getAllPages, getCategoryBody, getExtremes, getTrade, type Tool } from '@/lib/content';
import { badgeSummary } from '@/lib/pricing';
import { checkedToIso, getCategorySeo } from '@/lib/seo';
import { ogImageUrl } from '@/lib/og';
import { getModified } from '@/lib/dates';
import { AUTHOR_ID, AUTHOR_NAME, SITE_NAME, SITE_URL } from '@/lib/site';
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

  // Where a category carries its own comparison, it is the primary page for the
  // head term and holds a priced table and a full article of its own. Where it
  // does not, the page stays a hub for its guides and nothing below renders.
  const body = await getCategoryBody(trade);

  // No two adjacent sections may share a background. Inserting the article
  // shifts everything below it by one, so the bands after it flip together
  // rather than being hardcoded.
  const guidesBand = body ? 'band band-white' : 'band band-surface';
  const transparencyBand = body ? 'band band-surface' : 'band band-white';
  const otherTradesBand = body ? 'band band-white' : 'band band-surface';

  const toolEntries = tradePages.reduce((sum, page) => sum + page.tools.length, 0);
  const checked = tradePages[0]?.pricesChecked ?? 'Not published';
  const extremes = getExtremes(tradePages);

  const seo = getCategorySeo(trade);
  const url = `${SITE_URL}${info.href}`;
  const modified = body ? getModified(info.href, checkedToIso(body.pricesChecked)) : null;

  // One row per distinct vendor in this trade, taken from the first guide that
  // covers it so the figures stay identical to that page.
  const distinct: Tool[] = [];
  for (const page of tradePages) {
    for (const tool of page.tools) {
      if (!distinct.some((entry) => entry.tool === tool.tool)) distinct.push(tool);
    }
  }

  const verdict = badgeSummary(distinct);

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
            // The same card the page advertises in openGraph, from one source.
            image: ogImageUrl(info.href),
            // A category holding its own comparison is an authored page, so it
            // carries a real modified date and a named author.
            ...(modified
              ? {
                  dateModified: modified,
                  author: {
                    '@type': 'Person',
                    '@id': AUTHOR_ID,
                    name: AUTHOR_NAME,
                    url: `${SITE_URL}/about/`,
                  },
                }
              : {}),
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
          // A category carrying its own comparison answers questions on the
          // page, so it gets the same FAQ block a guide would.
          ...(body && body.faqs.length > 0
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  '@id': `${url}#faq`,
                  mainEntity: body.faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
                  })),
                },
              ]
            : []),
        ]}
      />

      <div className="hero-band">
        <div className="wrapper page-head">
          <div>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Small Crew</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{info.label}</span>
            </nav>
            <h1>{info.h1}</h1>
            <p className="page-standfirst">{info.standfirst}</p>
            {modified && <Byline modified={modified} />}
          </div>

          <HeroPanel
            title={`${info.label} tools priced`}
            badge={checked}
            meta={[
              { label: 'Guides', value: String(tradePages.length) },
              { label: 'Tool entries', value: String(toolEntries) },
              { label: 'Checked', value: checked, teal: true },
            ]}
            tools={distinct}
            foot="Monthly cost at one, three and ten users, lowest tier with online booking"
          />
        </div>
      </div>

      <StatsBand
        stats={[
          { label: 'Tools priced', value: String(toolEntries), note: `${info.label} entries` },
          { label: 'Guides', value: String(tradePages.length), note: 'In this category' },
          {
            label: 'Price range',
            value: extremes
              ? extremes.cheapest.price === extremes.dearest.price
                ? `$${extremes.cheapest.price}`
                : `$${extremes.cheapest.price} to $${extremes.dearest.price}`
              : 'Varies',
            note: 'Booking systems at ten users',
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
          {info.spotlight && (
            <Link href={info.spotlight.href} className="spotlight">
              <span className="spotlight-label">{info.spotlight.label}</span>
              <span className="spotlight-note">{info.spotlight.note}</span>
              <span className="spotlight-go" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          )}
        </section>
      </div>

      {body && (
        <>
          <div className="band band-surface">
            <div className="wrapper">
              <PricedStamp checked={body.pricesChecked} />
              <Disclosure />
              <CostTable tools={body.tools} pricesChecked={body.pricesChecked} />
            </div>

            <TearLine />

            <div className="wrapper">
              <div className="guide-layout">
                <Toc headings={body.headings} />
                <div className="article-body" dangerouslySetInnerHTML={{ __html: body.html }} />
              </div>

              <p className="updated-note">
                Prices on this page were read from vendor pricing pages in {body.pricesChecked}.
                Vendor pricing changes several times a year. Confirm the current figure with the
                vendor before you buy.
              </p>
            </div>
          </div>
        </>
      )}

      <div className={guidesBand}>
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

      <div className={transparencyBand}>
        <section className="wrapper section" aria-labelledby="transparency-heading">
          <div className="section-head">
            <span className="eyebrow">Pricing transparency</span>
            <h2 id="transparency-heading">Who publishes a price and who does not</h2>
            <p>
              Of the {distinct.length} vendors compared across {info.label.toLowerCase()},{' '}
              {verdict.published.length} publish a figure you can budget from. The rest need a sales
              conversation before you learn what they cost, which is a real cost in evaluation time.
            </p>
          </div>
          <div className="verdict-grid">
            <div className="verdict verdict-published">
              <span className="verdict-count">{verdict.published.length}</span>
              <span className="verdict-label">Publish a price</span>
              <ul>
                {verdict.published.map((tool) => (
                  <li key={tool.tool}>
                    <span className="verdict-name">{tool.tool}</span>
                    <PriceStrip tool={tool} compact />
                  </li>
                ))}
              </ul>
            </div>
            <div className="verdict verdict-quote">
              <span className="verdict-count">{verdict.quote.length}</span>
              <span className="verdict-label">Quote only</span>
              <ul>
                {verdict.quote.length > 0 ? (
                  verdict.quote.map((tool) => (
                    <li key={tool.tool}>
                      <span className="verdict-name">{tool.tool}</span>
                    </li>
                  ))
                ) : (
                  <li className="verdict-none">None in this trade</li>
                )}
              </ul>
            </div>
            <div className="verdict verdict-unpublished">
              <span className="verdict-count">{verdict.unpublished.length}</span>
              <span className="verdict-label">No price reachable</span>
              <ul>
                {verdict.unpublished.length > 0 ? (
                  verdict.unpublished.map((tool) => (
                    <li key={tool.tool}>
                      <span className="verdict-name">{tool.tool}</span>
                    </li>
                  ))
                ) : (
                  <li className="verdict-none">None in this trade</li>
                )}
              </ul>
            </div>
          </div>
          <VendorNotes tools={distinct} />
        </section>
      </div>

      <div className={otherTradesBand}>
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
