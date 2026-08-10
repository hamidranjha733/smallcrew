import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CostStrip from '@/components/CostStrip';
import CostTable from '@/components/CostTable';
import Disclosure from '@/components/Disclosure';
import GuideCard from '@/components/GuideCard';
import PullQuote from '@/components/PullQuote';
import TearLine from '@/components/TearLine';
import Toc from '@/components/Toc';
import { getAllPages, getPage, getSlugs, getTrade } from '@/lib/content';
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

  if (!getSlugs().includes(slug)) {
    return {};
  }

  const page = await getPage(slug);

  return {
    title: page.title,
    description: page.standfirst,
    alternates: { canonical: `/${slug}/` },
    openGraph: {
      type: 'article',
      title: page.title,
      description: page.standfirst,
      url: `/${slug}/`,
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
  const related = all.filter((item) => item.slug !== slug && getTrade(item.slug) === trade);

  const topPick = page.tools[0];

  return (
    <article>
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
              <h2>The other {related.length} {info.label.toLowerCase()} comparisons</h2>
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
