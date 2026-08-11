import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import StatsBand from '@/components/StatsBand';
import { getAllPages, getExtremes } from '@/lib/content';
import { getPageSeo } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { TRADES } from '@/lib/trades';

const seo = getPageSeo('about');

export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: '/about/' },
  openGraph: {
    type: 'website',
    title: seo.title,
    description: seo.description,
    url: '/about/',
  },
  twitter: {
    card: 'summary',
    title: seo.title,
    description: seo.description,
  },
};

export default async function AboutPage() {
  const pages = await getAllPages();
  const extremes = getExtremes(pages);
  const toolEntries = pages.reduce((sum, page) => sum + page.tools.length, 0);
  const checked = pages[0]?.pricesChecked ?? 'Not published';
  const url = `${SITE_URL}/about/`;

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            '@id': `${url}#about`,
            name: seo.title,
            description: seo.description,
            url,
            inLanguage: 'en-US',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumbs`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'About', item: url },
            ],
          },
        ]}
      />

      <div className="hero-band hero-band-short">
        <div className="wrapper page-head">
          <div>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Small Crew</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">About</span>
            </nav>
            <h1>About Small Crew</h1>
            <p className="page-standfirst">
              An independent site that prices software for cleaning, lawn care and pest control
              companies with one to twenty staff, on the tier a working crew would actually buy.
            </p>
          </div>
        </div>
      </div>

      <StatsBand
        stats={[
          { label: 'Guides', value: String(pages.length), note: 'Across three trades' },
          { label: 'Tool entries priced', value: String(toolEntries), note: 'Every price dated' },
          {
            label: 'Price range',
            value: extremes ? `$${extremes.cheapest.price} to $${extremes.dearest.price}` : 'Varies',
            note: 'Booking systems at ten users',
            teal: true,
          },
          { label: 'Prices checked', value: checked, note: 'Re verified quarterly' },
        ]}
      />

      <div className="band band-white">
        <section className="wrapper section">
          <div className="article-body">
            <h2 id="who">Who runs Small Crew</h2>
            <p>
              Small Crew is published by Hamid Ranjha. It is an independent one person project, not
              a company, not an agency and not a division of anything larger. There is no editorial
              team, no staff writers and no sponsored contributors. If something on this site is
              wrong, one person got it wrong.
            </p>
            <p>
              No vendor named on this site has any say in what appears here. None has reviewed a
              page before publication, none pays for placement, and none has been given advance
              notice of what a comparison says about them.
            </p>

            <h2 id="why">Why this site exists</h2>
            <p>
              Every comparison page in this category quotes the cheapest plan on the vendor pricing
              page. Almost nobody buys that plan. Online booking, automated reminders and card
              payments sit a tier higher, and a cleaning company that cannot take a booking online
              is not running software, it is running a phone.
            </p>
            <p>
              So every price on this site is the lowest tier that includes online booking, quoted at
              one, three and ten users, with per seat costs added in rather than left in a footnote.
              That single decision is the reason the site exists. On Jobber it is the difference
              between the advertised $49 and the usable $139.
            </p>

            <h2 id="not-tested">What we have not done</h2>
            <p>
              <strong>Small Crew has not used this software.</strong> Nothing here is a hands on
              test, a benchmark, a trial report or a review in the sense of having lived with a
              product. No page claims otherwise, and if you find one that implies it, that is a
              mistake and we want to hear about it.
            </p>
            <p>
              What this site does is read vendor pricing pages carefully, price the tier a real
              business would need, and say plainly where a tool is the wrong choice. That is a
              narrower claim than a review and it is one we can actually stand behind.
            </p>

            <h2 id="method">How the prices are gathered</h2>
            <p>
              Every figure comes from a vendor pricing page opened and read directly. Nothing is
              copied from another comparison site, an affiliate feed or a press release.
            </p>
            <p>
              Where a vendor publishes a base price and a per seat rate, the cost at three and ten
              users is calculated from those two published numbers and the calculation is shown in
              the Watch out for column. Where pricing is banded or charged per route, the published
              band is shown rather than a number invented between two of them.
            </p>
            <p>
              Where a vendor routes pricing through a sales conversation, the cell reads Quote only.
              Where a pricing page could not be reached at all, it reads Could not confirm. Neither
              is padded out with a figure from a third party review site. Every tool also carries a
              badge stating whether the vendor publishes a price, so the transparency of a vendor is
              itself part of the comparison.
            </p>

            <h2 id="dates">How the dates work</h2>
            <p>
              No price ships undated. Every guide carries the month and year its figures were read,
              currently {checked}, and the build fails if a page is missing that date. Vendor
              pricing in this category changes several times a year, so a comparison page with no
              date on it is a guess dressed up as research.
            </p>
            <p>
              Any page whose date is more than four months old is treated as stale and re verified
              before anything else is done to it. Check the date before you trust the number, and
              confirm the current figure with the vendor before you buy.
            </p>

            <h2 id="money">How we make money</h2>
            <p>
              Some links on this site earn a commission if you sign up. It costs you nothing and the
              price you pay is the same either way.
            </p>
            <p>
              Commission does not decide which tools appear, what is said about them, or the order
              of any table. Tables are ordered by how well a tool fits a crew under twenty people.
              Several tools recommended ahead of the commission paying ones, including ZenMaid,
              Launch27 and Connecteam, pay nothing at all, and the tools that do pay are frequently
              recommended against at larger crew sizes on cost grounds. If that ever stops being
              true, the site has stopped being worth reading.
            </p>

            <h2 id="corrections">Correcting a mistake</h2>
            <p>
              If a price is wrong, out of date, or a vendor has changed a plan, that is worth fixing
              quickly and the correction will be dated like everything else. The same applies to any
              claim about what a product does or does not do.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-surface">
        <section className="wrapper section" aria-labelledby="about-trades">
          <div className="section-head">
            <span className="eyebrow">Start reading</span>
            <h2 id="about-trades">The three trades</h2>
          </div>
          <div className="trade-links">
            {TRADES.map((trade) => (
              <Link key={trade.trade} href={trade.href} className="trade-link">
                <span className="trade-link-label">{trade.label} software</span>
                <span className="trade-link-note">{trade.standfirst}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
