import type { Metadata } from 'next';
import Link from 'next/link';
import CrewIcon, { type CrewIconName } from '@/components/CrewIcon';
import Spread from '@/components/Spread';
import TearLine from '@/components/TearLine';
import VendorLogo from '@/components/VendorLogo';
import {
  getAllPages,
  getExtremes,
  getTrade,
  TRADE_LABELS,
  type Trade,
} from '@/lib/content';
import { SITE_DESCRIPTION } from '@/lib/site';

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
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
    href: '/lawn-care-scheduling-software/',
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

const TRADE_ORDER: Trade[] = ['cleaning', 'lawn-care', 'pest-control'];

const TRADE_BLURBS: Record<Trade, string> = {
  cleaning:
    'Residential and commercial cleaning, including carpet. Recurring work, high cancellation rates and crews who rarely sit at a desk.',
  'lawn-care':
    'Lawn care and landscape maintenance. Seasonal contracts, route density and the awkward second season of snow removal.',
  'pest-control':
    'Pest control operators. Recurring service agreements, state licence records and chemical application logs that general purpose software does not hold.',
};

export default async function HomePage() {
  const pages = await getAllPages();
  const extremes = getExtremes(pages);
  const toolEntries = pages.reduce((sum, page) => sum + page.tools.length, 0);
  const checked = pages[0]?.pricesChecked ?? 'Not published';

  return (
    <>
      <section className="wrapper hero">
        <div>
          <span className="eyebrow eyebrow-green">
            Cleaning, lawn care and pest control. One to twenty staff.
          </span>
          <h1>Most software reviews are written for companies ten times your size.</h1>
          <p className="hero-sub">
            Every comparison page quotes the cheapest plan on the vendor pricing page. Almost nobody
            buys that plan, because online booking, automated reminders and card payments sit a tier
            higher. Small Crew prices the tier a working crew actually needs, at one, three and ten
            users, and dates every figure.
          </p>
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

      <TearLine />

      <section className="wrapper section" aria-labelledby="crew-picker">
        <div className="section-head">
          <span className="eyebrow">Start here</span>
          <h2 id="crew-picker">Pick the size you are, not the software you want</h2>
          <p>The right tool changes at every hire. What breaks at four people is not what breaks at one.</p>
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

      <TearLine />

      {extremes && (
        <section className="wrapper section" aria-labelledby="spread-heading">
          <div className="section-head">
            <span className="eyebrow">The whole argument, in two numbers</span>
            <h2 id="spread-heading">Same crew, same job, wildly different bill</h2>
            <p>
              Across every tool priced on this site, this is the cheapest and the dearest way to run
              a crew of ten on a plan that includes online booking.
            </p>
          </div>
          <Spread extremes={extremes} />
        </section>
      )}

      <TearLine />

      {TRADE_ORDER.map((trade) => {
        const tradePages = pages.filter((page) => getTrade(page.slug) === trade);

        return (
          <section
            key={trade}
            className="wrapper section"
            id={trade}
            aria-labelledby={`${trade}-heading`}
          >
            <div className="section-head">
              <span className="eyebrow">
                {TRADE_LABELS[trade]}. {tradePages.length} comparisons
              </span>
              <h2 id={`${trade}-heading`}>{TRADE_LABELS[trade]} software</h2>
              <p>{TRADE_BLURBS[trade]}</p>
            </div>
            <ul className="guide-list">
              {tradePages.map((page) => (
                <li key={page.slug} className="guide-item">
                  <Link className="guide-link" href={`/${page.slug}/`}>
                    <h3>{page.title}</h3>
                    <p>{page.standfirst}</p>
                    <span className="guide-logos">
                      {page.tools.map((tool) => (
                        <VendorLogo key={tool.tool} tool={tool.tool} />
                      ))}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <TearLine />

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
            affordable and then place online booking, automated reminders or card payments one tier
            above it. A cleaning company that cannot take a booking online is not running the
            software, it is running a phone. So every price here is the lowest tier that includes
            online booking, quoted at one, three and ten users, with per seat costs added in rather
            than hidden in a footnote.
          </p>
          <p>
            Every price is dated because vendor pricing changes several times a year. A comparison
            page with no date on it is a guess dressed up as research. Each guide carries the month
            and year its figures were read off the vendor pricing page. Where a vendor routes
            pricing through a sales call the table says so, and where we could not reach a pricing
            page at all it says that instead of guessing.
          </p>
          <p>
            We say plainly where a tool is the wrong choice. Every guide has a section on who should
            not buy each tool, and every pick names a real flaw. Small Crew has not used this
            software and does not claim to have tested it. What you are reading is documented
            pricing and published features, read carefully and compared honestly, which is a
            different thing from a review and more useful than most of them.
          </p>
        </div>
      </section>
    </>
  );
}
