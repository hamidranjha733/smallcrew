import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CostStrip from '@/components/CostStrip';
import CostTable from '@/components/CostTable';
import Disclosure from '@/components/Disclosure';
import PullQuote from '@/components/PullQuote';
import TearLine from '@/components/TearLine';
import Toc from '@/components/Toc';
import VendorLogo from '@/components/VendorLogo';
import { getAllPages, getPage, getSlugs, getTrade, TRADE_LABELS } from '@/lib/content';

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
  const related = all
    .filter((item) => item.slug !== slug && getTrade(item.slug) === trade)
    .slice(0, 4);

  const topPick = page.tools[0];

  return (
    <article>
      <div className="wrapper page-head">
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
            <h2>More {TRADE_LABELS[trade].toLowerCase()} comparisons</h2>
            <ul className="guide-list">
              {related.map((item) => (
                <li key={item.slug} className="guide-item">
                  <Link className="guide-link" href={`/${item.slug}/`}>
                    <h3>{item.title}</h3>
                    <p>{item.standfirst}</p>
                    <span className="guide-logos">
                      {item.tools.slice(0, 6).map((tool) => (
                        <VendorLogo key={tool.tool} tool={tool.tool} />
                      ))}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
