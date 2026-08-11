import type { Metadata } from 'next';
import Link from 'next/link';
import CrewIcon, { type CrewIconName } from '@/components/CrewIcon';
import HeroTools from '@/components/HeroTools';
import Spread from '@/components/Spread';
import StatsBand from '@/components/StatsBand';
import SummaryTable from '@/components/SummaryTable';
import VendorLogo from '@/components/VendorLogo';
import { getAllPages, getExtremes, getTrade } from '@/lib/content';
import { getSummaryRows } from '@/lib/summary';
import { TRADES } from '@/lib/trades';
import { HOME_SEO } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: HOME_SEO.title },
  description: HOME_SEO.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    url: '/',
  },
  twitter: {
    card: 'summary',
    title: HOME_SEO.title,
    description: HOME_SEO.description,
  },
};

const CREW_CELLS: {
  size: string;
  heading: string;
  icon: CrewIconName;
  breaks: string;
  href: string;
  linkText: string;
}[] = [
  {
    size: '1 person',
    heading: 'Just me',
    icon: 'solo',
    breaks:
      'The phone is the bottleneck. Every quote request arrives while you are holding a hose, and the ones you return two days later have already booked someone else.',
    href: '/cleaning-business-software-online-booking/',
    linkText: 'Online booking',
  },
  {
    size: '2 to 4 people',
    heading: 'Small crew',
    icon: 'pair',
    breaks:
      'The schedule stops living in your head. Someone else needs to see today without calling you, and a job moved in a text message is a job that gets missed.',
    href: '/scheduling-software-for-cleaning-business/',
    linkText: 'Scheduling',
  },
  {
    size: '5 to 10 people',
    heading: 'Two crews out',
    icon: 'van',
    breaks:
      'Drive time becomes the largest cost you are not measuring. Two crews crossing town twice a day is a wage bill you pay and never invoice.',
    href: '/lawn-care-routing-software/',
    linkText: 'Routing',
  },
  {
    size: '10 to 20 people',
    heading: 'Office staff now',
    icon: 'desk',
    breaks:
      'Someone is doing the books who is not you. The question stops being which app schedules jobs and becomes which app your bookkeeper will not fight every month.',
    href: '/accounting-software-for-cleaning-business/',
    linkText: 'Accounting',
  },
];

export default async function HomePage() {
  const pages = await getAllPages();
  const extremes = getExtremes(pages);
  const summary = getSummaryRows(pages);
  const toolEntries = pages.reduce((sum, page) => sum + page.tools.length, 0);
  const checked = pages[0]?.pricesChecked ?? 'Not published';

  const trades = TRADES.map((info) => {
    const tradePages = pages.filter((page) => getTrade(page.slug) === info.trade);
    const vendors: string[] = [];
    for (const page of tradePages) {
      for (const tool of page.tools) {
        if (!vendors.includes(tool.tool)) vendors.push(tool.tool);
      }
    }
    return { info, count: tradePages.length, vendors };
  });

  return (
    <>
      <div className="hero-band">
      <section className="wrapper hero">
        <div>
          <span className="eyebrow eyebrow-signal">
            Cleaning, lawn care and pest control. One to twenty staff.
          </span>
          <h1>Cleaning business software, priced at the tier you would actually buy</h1>
          <p className="hero-sub">
            Cleaning business software is the system that takes the booking, holds the schedule,
            reminds the customer and collects the money. Expect to pay about $39 a month as a solo
            cleaner on a plan that genuinely includes online booking, and anywhere between $39 and
            $400 a month once you have ten cleaners, depending almost entirely on whether the vendor
            charges per seat.
          </p>
          <HeroTools tools={summary.map((entry) => entry.row)} />
        </div>

        <div className="docket">
          <div className="docket-head">
            <span>Docket</span>
            <span>{checked}</span>
          </div>
          <dl>
            <div className="docket-row">
              <dt>Guides</dt>
              <dd>{pages.length}</dd>
            </div>
            <div className="docket-row">
              <dt>Tool entries priced</dt>
              <dd>{toolEntries}</dd>
            </div>
            {extremes && (
              <>
                <div className="docket-row">
                  <dt>Cheapest at 10 users</dt>
                  <dd className="big">${extremes.cheapest.price}</dd>
                </div>
                <div className="docket-row">
                  <dt>Dearest at 10 users</dt>
                  <dd className="big">${extremes.dearest.price}</dd>
                </div>
              </>
            )}
            <div className="docket-row">
              <dt>Priced on</dt>
              <dd>Lowest tier with booking</dd>
            </div>
          </dl>
        </div>
      </section>
      </div>

      <StatsBand
        stats={[
          { label: 'Tools priced', value: String(toolEntries), note: 'Across three trades' },
          { label: 'Guides', value: String(pages.length), note: 'Every price dated' },
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
        <section className="wrapper section" aria-labelledby="cost-heading">
          <div className="section-head">
            <span className="eyebrow">The short answer</span>
            <h2 id="cost-heading">What does cleaning business software cost?</h2>
            <p>
              Every comparison page you will read quotes the cheapest plan on the vendor pricing
              page. Almost nobody buys that plan, because online booking, automated reminders and
              card payments sit a tier higher. These are the nine tools we price most often across
              cleaning, lawn care and pest control, quoted on the tier a working crew actually
              needs.
            </p>
          </div>
          <SummaryTable rows={summary} pricesChecked={checked} />
          <div className="reading">
            <p>
              Two things decide the bill more than any feature list. The first is which tier hides
              the booking form, which on Jobber is the difference between $49 and $139 a month. The
              second is the pricing model. Flat priced cleaning service software such as ZenMaid and
              Launch27 costs the same at one cleaner and at ten, while per seat tools multiply. That
              is why a ten person cleaning company can pay $39 a month or $400 a month for software
              doing broadly the same job.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-surface">
        <section className="wrapper section" aria-labelledby="crew-picker">
          <div className="section-head">
            <span className="eyebrow">Start here</span>
            <h2 id="crew-picker">Which tool fits the size you are now?</h2>
            <p>
              The right cleaning management system changes at every hire. What breaks at four people
              is not what breaks at one.
            </p>
          </div>
          <div className="crew-grid">
            {CREW_CELLS.map((cell) => (
              <Link key={cell.heading} href={cell.href} className="crew-cell">
                <CrewIcon name={cell.icon} />
                <span className="crew-size">{cell.size}</span>
                <h3>{cell.heading}</h3>
                <p>{cell.breaks}</p>
                <span className="crew-link">
                  <span>{cell.linkText}</span>
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="band band-white">
        <section className="wrapper section" aria-labelledby="trades-heading">
          <div className="section-head">
            <span className="eyebrow">Browse by trade</span>
            <h2 id="trades-heading">Compare software for your trade</h2>
            <p>
              Nineteen comparisons across three trades. Every guide prices the tier that includes
              online booking, at one, three and ten users, and dates the figure.
            </p>
          </div>
          <div className="trade-grid">
            {trades.map(({ info, count, vendors }) => (
              <Link key={info.trade} href={info.href} className="trade-card">
                <span className="trade-card-count">{count} comparisons</span>
                <h3>{info.label}</h3>
                <p>{info.standfirst}</p>
                <span className="guide-logos">
                  {vendors.slice(0, 8).map((tool) => (
                    <VendorLogo key={tool} tool={tool} />
                  ))}
                </span>
                <span className="trade-card-link">
                  <span>All {info.label.toLowerCase()} guides</span>
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {extremes && (
        <div className="band band-surface">
          <section className="wrapper section" aria-labelledby="spread-heading">
            <div className="section-head">
              <span className="eyebrow">The whole argument, in two numbers</span>
              <h2 id="spread-heading">Same crew, same job, wildly different bill</h2>
              <p>
                The cheapest and the dearest way to run a crew of ten, counting only tools that can
                take a booking, hold a schedule and invoice. Ledgers and staff apps are cheaper and
                are left out, because a business cannot run on one.
              </p>
            </div>
            <Spread extremes={extremes} />
          </section>
        </div>
      )}

      <div className="band band-white">
        <section
          className="wrapper section"
          id="how-we-compare"
          aria-labelledby="how-we-compare-heading"
        >
          <div className="section-head">
            <span className="eyebrow">Method</span>
            <h2 id="how-we-compare-heading">How we compare</h2>
          </div>
          <div className="reading">
            <p>
              We price the tier a real business needs. Vendors advertise an entry plan that looks
              affordable and then place online booking, automated reminders or card payments one
              tier above it. A cleaning company that cannot take a booking online is not running the
              software, it is running a phone. So every price here is the lowest tier that includes
              online booking, quoted at one, three and ten users, with per seat costs added in
              rather than hidden in a footnote.
            </p>
            <p>
              Every price is dated because vendor pricing changes several times a year. A comparison
              page with no date on it is a guess dressed up as research. Each guide carries the
              month and year its figures were read off the vendor pricing page. Where a vendor
              routes pricing through a sales call the table says so, and where we could not reach a
              pricing page at all it says that instead of guessing.
            </p>
            <p>
              We say plainly where a tool is the wrong choice. Every guide has a section on who
              should not buy each tool, and every pick names a real flaw. Small Crew has not used
              this software and does not claim to have tested it. What you are reading is documented
              pricing and published features, read carefully and compared honestly, which is a
              different thing from a review and more useful than most of them.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
