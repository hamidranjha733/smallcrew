import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CostStrip from '@/components/CostStrip';
import CostTable from '@/components/CostTable';
import Disclosure from '@/components/Disclosure';
import GuideCard from '@/components/GuideCard';
import JsonLd from '@/components/JsonLd';
import PullQuote from '@/components/PullQuote';
import TearLine from '@/components/TearLine';
import Toc from '@/components/Toc';
import { getAllPages, getPage, getSlugs, getTrade } from '@/lib/content';
import { checkedToIso, getGuideSeo } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { getTradeInfo } from '@/lib/trades';

type Params = { slug: string };

// Accounting, billing and invoicing guides compare tools that have no online
// booking feature, so the table states the threshold it was actually priced on.
const LEDGER_PAGES = new Set([
  'accounting-software-for-cleaning-business',
  'lawn-care-billing-software',
  'pest-control-accounting-software',
  'pest-control-invoice-software',
]);

const LEDGER_BASIS =
  'Prices are for the lowest tier that includes recurring invoicing and card payments, not the cheapest tier on the vendor pricing page.';

export function generateStaticParams(): Params[] {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!getSlugs().includes(slug)) return {};

  const seo = getGuideSeo(slug);

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: `/${slug}/` },
    openGraph: {
      type: 'article',
      title: seo.title,
      description: seo.description,
      url: `/${slug}/`,
    },
    twitter: {
      card: 'summary',
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  if (!getSlugs().includes(slug)) {
    notFound();
  }

  const page = await getPage(slug);
  const all = await getAllPages();
  const trade = getTrade(slug);
  const info = getTradeInfo(trade);
  const seo = getGuideSeo(slug);
  const related = all.filter((item) => item.slug !== slug && getTrade(item.slug) === trade);
  const anchors = related.slice(0, 3);

  const topPick = page.tools[0];
  const iso = checkedToIso(page.pricesChecked);
  const url = `${SITE_URL}/${slug}/`;

  return (
    <article>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': `${url}#article`,
            headline: seo.title,
            description: seo.description,
            about: page.keyword,
            inLanguage: 'en-US',
            datePublished: iso,
            dateModified: iso,
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            author: { '@id': `${SITE_URL}/#organization` },
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumbs`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
              {
                '@type': 'ListItem',
                position: 2,
                name: `${info.label} software`,
                item: `${SITE_URL}${info.href}`,
              },
              { '@type': 'ListItem', position: 3, name: page.keyword, item: url },
            ],
          },
          ...(page.faqs.length > 0
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  '@id': `${url}#faq`,
                  mainEntity: page.faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
                  })),
                },
              ]
            : []),
        ]}
      />

      <div className="wrapper page-head">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Small Crew</Link>
          <span aria-hidden="true">/</span>
          <Link href={info.href}>{info.label}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{page.keyword}</span>
        </nav>
        <CostStrip
          keyword={page.keyword}
          volume={page.volume}
          toolsCompared={page.toolsCompared}
          pricesChecked={page.pricesChecked}
        />
        <h1>{page.title}</h1>
        <p className="page-standfirst">{page.standfirst}</p>
      </div>

      <div className="wrapper">
        <Disclosure />
        <CostTable
          tools={page.tools}
          pricesChecked={page.pricesChecked}
          basis={LEDGER_PAGES.has(slug) ? LEDGER_BASIS : undefined}
        />
      </div>

      <TearLine />

      <div className="wrapper">
        <div className="guide-layout">
          <Toc headings={page.headings} />

          <div>
            {topPick && <PullQuote quote={topPick.watch} tool={topPick.tool} />}
            <div className="article-body" dangerouslySetInnerHTML={{ __html: page.html }} />

            {anchors.length > 0 && (
              <p className="related-prose">
                Next, compare{' '}
                {anchors.map((item, index) => (
                  <span key={item.slug}>
                    <Link href={`/${item.slug}/`}>{item.keyword}</Link>
                    {index < anchors.length - 2 ? ', ' : index === anchors.length - 2 ? ' and ' : ''}
                  </span>
                ))}
                . For the whole category see{' '}
                <Link href={info.href}>{info.label.toLowerCase()} software compared</Link>
                {trade === 'cleaning' ? (
                  <>
                    , or start from what{' '}
                    <Link href="/">cleaning business software</Link> costs across every trade.
                  </>
                ) : (
                  '.'
                )}
              </p>
            )}

            <p className="updated-note">
              Prices on this page were read from vendor pricing pages in {page.pricesChecked}.
              Vendor pricing changes several times a year. Confirm the current figure with the
              vendor before you buy.
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <section className="more-guides">
            <div className="section-head">
              <span className="eyebrow">{info.label}</span>
              <h2>
                The other {related.length} {info.label.toLowerCase()} comparisons
              </h2>
            </div>
            <ul className="guide-list">
              {related.map((item) => (
                <GuideCard key={item.slug} page={item} />
              ))}
            </ul>
            <p className="more-guides-link">
              <Link href={info.href}>All {info.label.toLowerCase()} software compared</Link>
            </p>
          </section>
        )}
      </div>
    </article>
  );
}
