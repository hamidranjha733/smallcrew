import type { Metadata } from 'next';
import Link from 'next/link';
import Disclosure from '@/components/Disclosure';
import JsonLd from '@/components/JsonLd';
import { formatDate, getModified } from '@/lib/dates';
import { ogImageUrl } from '@/lib/og';
import { buildMetadata, getPageSeo } from '@/lib/seo';
import { AUTHOR_ID, AUTHOR_NAME, SITE_NAME, SITE_URL } from '@/lib/site';

const seo = getPageSeo('janitorial-bidding-software');

export const metadata: Metadata = buildMetadata(seo, '/janitorial-bidding-software/', 'article');

const READ_ON = '2026-10-03';

const TOOLS = [
  {
    name: 'Janibid',
    from: 'Free',
    basis: 'Free up to 20 active customers, then $19.99 a month per user',
    best: 'Bidding plus a CRM at the lowest published price',
    watch: 'Charges per user, so the cost follows headcount rather than bid volume',
    url: 'https://www.janibid.com/copy-of-plans',
  },
  {
    name: 'CleanlyRun',
    from: '$24.95',
    basis: 'Flat monthly, unlimited bid creation, no user count published',
    best: 'Producing proposals and nothing else',
    watch: 'Bidding only. No scheduling, invoicing or timekeeping of any kind',
    url: 'https://www.cleanlyrun.com/pricing',
  },
  {
    name: 'CleanGuru',
    from: '$79',
    basis: 'Flat monthly, 5 users included, $5 a month per additional cleaner',
    best: 'Bidding attached to invoicing, scheduling and timekeeping',
    watch: 'The $79 tier buys one module. Bidding plus anything else needs $129',
    url: 'https://www.cleanguru.com/pricing',
  },
  {
    name: 'Janitorial Manager',
    from: 'Could not confirm',
    basis: 'Pricing page not reachable from here',
    best: 'Not assessable on price',
    watch: 'Its pricing page returns a bot verification screen rather than content, so nothing is verified',
    url: 'https://www.janitorialmanager.com/pricing/',
  },
];

export default function JanitorialBiddingSoftwarePage() {
  const url = `${SITE_URL}/janitorial-bidding-software/`;
  const modified = getModified('/janitorial-bidding-software/', READ_ON);
  const checked = formatDate(READ_ON);

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
            about: seo.keyword,
            inLanguage: 'en-US',
            datePublished: READ_ON,
            dateModified: modified,
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            image: ogImageUrl('/janitorial-bidding-software/'),
            author: {
              '@type': 'Person',
              '@id': AUTHOR_ID,
              name: AUTHOR_NAME,
              url: `${SITE_URL}/about/`,
            },
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumbs`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Cleaning', item: `${SITE_URL}/cleaning/` },
              { '@type': 'ListItem', position: 3, name: 'janitorial bidding software', item: url },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the best bidding software for cleaning services?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For bidding alone, CleanlyRun at $24.95 a month creates unlimited proposals and does nothing else, which is the point. For bidding attached to invoicing and scheduling, CleanGuru is $129 a month for all modules. Janibid is free up to twenty active customers and $19.99 a month per user after that, and is the cheapest published option.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the best janitorial software?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'That depends on whether you need bidding or running the work. Bidding tools produce proposals. For scheduling cleaners, tracking site visits and invoicing contracts, commercial cleaning software is a different purchase and is compared separately on this site.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do you bid on a janitorial contract?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You measure the building, estimate production rates per area type, cost the labour hours that implies, add supplies, equipment and overhead, then apply your margin. Bidding software automates the arithmetic and stores your rates. It does not tell you what the local market will pay, which is the part that decides whether you win.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the four types of bidding?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'In commercial cleaning the usual division is square footage pricing, production rate pricing, time and materials, and fixed price or flat rate. Production rate pricing is what most janitorial bidding tools implement, because it converts measured areas into labour hours.',
                },
              },
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
              <Link href="/cleaning/">Cleaning</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">janitorial bidding software</span>
            </nav>

            <Disclosure lead />

            <h1>Janitorial bidding software compared for crews under twenty</h1>
            <p className="page-standfirst">
              Three of the four tools here publish a price, and they are further apart than any
              other category on this site: free, $24.95 and $79 a month to start. They are also not
              doing the same job, which is what the spread actually reflects.
            </p>
            <p className="byline">
              <span className="byline-by">By</span>{' '}
              <Link href="/about/" rel="author">
                {AUTHOR_NAME}
              </Link>
              <span className="byline-sep" aria-hidden="true">
                /
              </span>
              <span className="byline-date">Checked {checked}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="band band-white">
        <section className="wrapper section" aria-labelledby="table">
          <div className="section-head">
            <span className="eyebrow">The comparison</span>
            <h2 id="table">What each one costs</h2>
          </div>

          <div className="cost-table-scroll">
            <table className="cost-table">
              <thead>
                <tr>
                  <th scope="col">Tool</th>
                  <th scope="col" className="num-head">
                    From
                  </th>
                  <th scope="col">Basis</th>
                  <th scope="col">Best for</th>
                  <th scope="col">Watch out for</th>
                </tr>
              </thead>
              <tbody>
                {TOOLS.map((tool) => (
                  <tr key={tool.name}>
                    <th scope="row" className="cell-tool">
                      <span className="tool-id-text">
                        <a href={tool.url} rel="nofollow sponsored noopener" target="_blank">
                          {tool.name}
                        </a>
                      </span>
                    </th>
                    <td
                      className={tool.from.startsWith('$') ? 'cell-price' : 'cell-price is-text'}
                      data-label="From"
                    >
                      {tool.from}
                    </td>
                    <td data-label="Basis">{tool.basis}</td>
                    <td data-label="Best for">
                      <span className="stamp">{tool.best}</span>
                    </td>
                    <td className="cell-watch" data-label="Watch out for">
                      <span className="watch-flag" aria-hidden="true">
                        !
                      </span>
                      {tool.watch}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="cost-table-caption">
            <strong>
              Every figure is the monthly price published on the vendor&#8217;s own pricing page,
              read on {checked}.
            </strong>{' '}
            None of these vendors publishes an annual rate, and none of their pages carries a
            calculator or a billing toggle. The From column is the cheapest tier that will produce a
            bid, which is not always the cheapest tier on the page. Small Crew has not used any of
            this software, and nothing here is a test result.
          </p>
        </section>
      </div>

      <div className="band band-surface">
        <section className="wrapper section" aria-labelledby="what-it-does">
          <div className="section-head">
            <span className="eyebrow">Why this is a separate purchase</span>
            <h2 id="what-it-does">What bidding software does that scheduling software does not</h2>
          </div>
          <div className="reading">
            <p>
              A bidding tool turns a building into a number. You enter the areas, the fixture
              counts and the frequencies, it applies production rates to work out how many labour
              hours the job takes, adds supplies and overhead, applies your margin and produces a
              proposal you can send.
            </p>
            <p>
              Scheduling software starts after that number exists. It holds the route, dispatches
              the cleaner, records the visit and raises the invoice. Nothing in{' '}
              <Link href="/commercial-cleaning-software/">commercial cleaning software</Link>{' '}
              estimates a building you have not won yet, and nothing in a bidding tool runs the
              work once you have.
            </p>
            <p>
              That is why the prices here look strange next to the rest of this site. CleanlyRun at
              $24.95 is cheaper than every scheduling tool we price, because it does one job. The
              comparison that matters is not bidding tool against scheduling tool, it is whether you
              need both.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-white">
        <section className="wrapper section" aria-labelledby="each">
          <div className="section-head">
            <span className="eyebrow">Tool by tool</span>
            <h2 id="each">What each costs and what each withholds</h2>
          </div>
          <div className="reading">
            <h3>Janibid, free then $19.99 a month per user</h3>
            <p>
              The free plan covers one to twenty active customers and the page states that all plans
              include complete access to all software functions, so the free tier is not a feature
              cut, it is a customer cap. Past twenty customers the Business plan is $19.99 a month
              per user, which is the only per user price in this comparison and the thing to watch:
              three people in the office is $59.97 a month, which overtakes CleanlyRun.
            </p>
            <p>
              The site also offers a long list of free calculators, for janitorial, porter, post
              construction, window, carpet, floor strip and wax, pressure washing, house cleaning,
              event cleaning and consumables. Those are public web pages rather than part of the
              subscription.
            </p>
            <p>
              Not published: what counts as an active customer, and what the per user price buys
              beyond the free plan given that both include every function.
            </p>

            <h3>CleanlyRun, $24.95 a month</h3>
            <p>
              Three plans. Janitorial Basic at $24.95 a month creates unlimited janitorial bids.
              Janitorial Plus at $34.95 adds a specialty work screen. Janitorial Ultra lists at
              $44.95 and was displayed at $24.95 on {checked}, with the higher figure struck
              through, and adds construction and residential bid creation along with marketing
              materials and a supply sales module.
            </p>
            <p>
              Worth pausing on that: on the day this was read, the top tier and the entry tier cost
              the same. If that holds when you look, Ultra is the only sensible choice, and if it
              does not, the real decision is between $24.95 and $44.95.
            </p>
            <p>
              Every plan says unlimited bid creation, so there is no proposal cap to run into. What
              the page does not publish is any user count, so whether $24.95 covers one login or
              several is unstated.
            </p>

            <h3>CleanGuru, $79, $129 or $159 a month</h3>
            <p>
              The one tool here that is not only a bidding tool. Basic at $79 a month includes five
              users and <strong>one module</strong>. Guru at $129 and Guru Plus at $159 include all
              modules, with ten and fifteen users respectively. Additional cleaners are $5 a month
              each on any plan, and there is a fourteen day free trial.
            </p>
            <p>
              The module count is the trap. CleanGuru sells bidding, invoicing, scheduling,
              timekeeping, checklists and inspecting, and $79 buys one of them. If bidding is
              genuinely all you want, $79 works and CleanlyRun does the same job for a third of it.
              The moment you want bidding and invoicing together, the price is $129, which is the
              figure to compare against a scheduling tool rather than against a bidding one.
            </p>
            <p>
              Not published: an annual rate, and which module Basic defaults to.
            </p>

            <h3>Janitorial Manager, could not confirm</h3>
            <p>
              Its pricing page did not return content on {checked}. It answers with a bot
              verification screen reading &#8220;Please wait while your request is being
              verified&#8221; and does not resolve past it, so no figure was read and none is
              published here.
            </p>
            <p>
              This is worth distinguishing from the vendors elsewhere on this site that route
              pricing through a sales call. Janitorial Manager may well publish its prices to an
              ordinary visitor. What this page can say is only that we could not reach them, which
              is a statement about our access rather than about the vendor.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-surface">
        <section className="wrapper section" aria-labelledby="dont">
          <div className="section-head">
            <span className="eyebrow">The honest answer</span>
            <h2 id="dont">Who should not buy one of these at all</h2>
          </div>
          <div className="reading">
            <p>
              <strong>Residential cleaners.</strong> These tools estimate buildings by area and
              production rate. A house clean is priced by bedrooms, bathrooms and frequency, which
              is a rate card and a booking form rather than an estimating engine. The tools in{' '}
              <Link href="/cleaning-business-software-online-booking/">
                cleaning business software with online booking
              </Link>{' '}
              quote that automatically at the point of booking, and a bidding tool adds a second
              system for a job already done.
            </p>
            <p>
              <strong>Anyone bidding fewer than a handful of buildings a month.</strong> The
              arithmetic behind a janitorial bid is a spreadsheet, and plenty of operators run one
              well. If you bid two buildings a quarter, $24.95 a month is $300 a year to avoid
              maintaining a spreadsheet you have already built. The case for buying strengthens with
              bid volume and with how many people need to produce a consistent proposal.
            </p>
            <p>
              <strong>Anyone who has not lost a bid on presentation.</strong> The strongest argument
              for these tools is the proposal document rather than the estimate, because a tidy
              branded proposal competes better than a figure in an email. If your bids already look
              professional and you are losing on price, software does not address that.
            </p>
            <p>
              <strong>Anyone expecting the software to set the price.</strong> Every tool here
              applies your production rates and your margin. None knows what cleaners cost in your
              city or what the incumbent charges. The number it produces is as good as the rates you
              put into it.
            </p>
            <p>
              For a crew under twenty doing commercial contract work with regular bidding, the case
              is real and CleanlyRun at $24.95 is the cheapest honest entry. Below that threshold,
              not buying one is a defensible decision and this page would rather say so.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-white">
        <section className="wrapper section" aria-labelledby="faq">
          <div className="section-head">
            <span className="eyebrow">Common questions</span>
            <h2 id="faq">Janitorial bidding questions</h2>
          </div>
          <div className="reading">
            <p>
              <strong>What is the best bidding software for cleaning services?</strong> For bidding
              alone, CleanlyRun at $24.95 a month creates unlimited proposals and does nothing else,
              which is the point. For bidding attached to invoicing and scheduling, CleanGuru is
              $129 a month for all modules. Janibid is free up to twenty active customers and $19.99
              a month per user after that, and is the cheapest published option.
            </p>
            <p>
              <strong>What is the best janitorial software?</strong> That depends on whether you
              need bidding or running the work. Bidding tools produce proposals. For scheduling
              cleaners, tracking site visits and invoicing contracts, see{' '}
              <Link href="/commercial-cleaning-software/">commercial cleaning software</Link>, which
              prices that job at one, three and ten cleaners.
            </p>
            <p>
              <strong>How do you bid on a janitorial contract?</strong> You measure the building,
              estimate production rates per area type, cost the labour hours that implies, add
              supplies, equipment and overhead, then apply your margin. Bidding software automates
              the arithmetic and stores your rates. It does not tell you what the local market will
              pay, which is the part that decides whether you win.
            </p>
            <p>
              <strong>What are the four types of bidding?</strong> In commercial cleaning the usual
              division is square footage pricing, production rate pricing, time and materials, and
              fixed price or flat rate. Production rate pricing is what most janitorial bidding
              tools implement, because it converts measured areas into labour hours.
            </p>
            <p>
              <strong>How current are these figures?</strong> All were read from each vendor&#8217;s
              own pricing page on {checked}. Pricing in this category changes several times a year.
              Confirm before you buy.
            </p>
          </div>

          <p className="updated-note">
            Small Crew has not used any of this software. Every figure here was read from the
            vendor&#8217;s own pricing page on {checked} and describes documented pricing and
            published features. For the wider category see{' '}
            <Link href="/cleaning/">cleaning service software compared</Link>.
          </p>
        </section>
      </div>
    </article>
  );
}
