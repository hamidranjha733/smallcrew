import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { formatDate, getModified } from '@/lib/dates';
import { ogImageUrl } from '@/lib/og';
import { buildMetadata, getPageSeo } from '@/lib/seo';
import { AUTHOR_ID, AUTHOR_NAME, SITE_NAME, SITE_URL } from '@/lib/site';

const seo = getPageSeo('zenmaid-pricing');

export const metadata: Metadata = buildMetadata(seo, '/zenmaid-pricing/', 'article');

// Every figure below was read off get.zenmaid.com/pricing on this date, by
// driving the team size control through each value rather than taking the
// headline price at face value. The full reading is in data/prices.json.
const READ_ON = '2026-10-02';
const SOURCE = 'https://get.zenmaid.com/pricing';

// Base price plus a flat amount per person. Linear from 0 to 12, checked.
const TIERS = [
  {
    name: 'Starter',
    base: 19,
    perPerson: 4,
    limit: '40 appointments a month',
    suits: 'A solo cleaner testing whether software helps at all',
  },
  {
    name: 'Pro',
    base: 39,
    perPerson: 14,
    limit: 'Unlimited appointments',
    suits: 'Any crew that needs a booking form and unlimited jobs',
  },
  {
    name: 'Pro Max',
    base: 49,
    perPerson: 24,
    limit: 'Unlimited appointments',
    suits: 'Crews putting the booking form on their own website',
  },
];

const money = (n: number) => `$${n.toLocaleString('en-US')}`;
const at = (tier: (typeof TIERS)[number], people: number) => tier.base + tier.perPerson * people;

const CREWS = [1, 3, 10];

export default function ZenMaidPricingPage() {
  const url = `${SITE_URL}/zenmaid-pricing/`;
  const modified = getModified('/zenmaid-pricing/', READ_ON);
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
            image: ogImageUrl('/zenmaid-pricing/'),
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
              { '@type': 'ListItem', position: 3, name: 'ZenMaid pricing', item: url },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is there a free ZenMaid plan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. There is a 14 day free trial on every tier, and no free tier after it. The cheapest paid plan is Starter at $19 a month for a team of nobody, rising by $4 for each person you add.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is there a ZenMaid setup fee?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'None is published. The pricing page offers to import your existing contacts and calendar free, and states the plans are month to month with no contract and no signature.',
                },
              },
              {
                '@type': 'Question',
                name: 'What happens when the team grows past a tier?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Nothing breaks and no tier change is forced, because the tiers are not capped by headcount. The bill simply rises by $4, $14 or $24 a month for each person added, depending on the tier. The only hard limit is the 40 appointments a month on Starter, which stops you adding appointments until you upgrade.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you pay ZenMaid monthly?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Monthly is the only option published. No annual plan and no annual discount appears anywhere on the pricing page, so a yearly cost is twelve times the monthly one.',
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
              <span aria-current="page">ZenMaid pricing</span>
            </nav>

            <aside className="disclosure disclosure-lead">
              <span className="label">Affiliate disclosure</span>
              <p>
                Small Crew may earn a commission from links on this page, at no cost to you. It
                never changes which tools we cover or what we say about them.
              </p>
              <p className="disclosure-meta">
                Independent coverage for crews under 20 &#183; Every figure dated
              </p>
            </aside>

            <h1>ZenMaid Pricing: What It Costs at 1, 3 and 10 Cleaners</h1>
            <p className="page-standfirst">
              ZenMaid advertises $19, $39 and $49 a month. Those are the prices for a team of
              nobody. Every tier adds a fixed amount for each cleaner and office manager you put on
              it, so a crew of three on the plan that includes a booking form is {money(81)} a
              month, not {money(39)}.
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
        <section className="wrapper section" aria-labelledby="glance">
          <div className="section-head">
            <span className="eyebrow">At a glance</span>
            <h2 id="glance">The three tiers</h2>
          </div>

          <div className="cost-table-scroll">
            <table className="cost-table">
              <thead>
                <tr>
                  <th scope="col">Tier</th>
                  <th scope="col" className="num-head">
                    From
                  </th>
                  <th scope="col">Appointment limit</th>
                  <th scope="col">Who it suits</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map((tier) => (
                  <tr key={tier.name}>
                    <th scope="row" className="cell-tool">
                      <span className="tool-id-text">ZenMaid {tier.name}</span>
                    </th>
                    <td className="cell-price" data-label="From">
                      {money(tier.base)}
                    </td>
                    <td data-label="Appointment limit">{tier.limit}</td>
                    <td data-label="Who it suits">{tier.suits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="cost-table-caption">
            <strong>
              The From column is the price at a team of nobody, which is the figure ZenMaid
              advertises.
            </strong>{' '}
            It is not what any crew pays. Each tier adds {money(4)}, {money(14)} and {money(24)} a
            month respectively for every cleaner and office manager on the team. Checked on{' '}
            {checked} against{' '}
            <a href={SOURCE} rel="nofollow sponsored noopener" target="_blank">
              get.zenmaid.com/pricing
            </a>
            . Small Crew has not used this software.
          </p>
        </section>
      </div>

      <div className="band band-surface">
        <section className="wrapper section" aria-labelledby="crew-cost">
          <div className="section-head">
            <span className="eyebrow">The number nobody publishes</span>
            <h2 id="crew-cost">What ZenMaid costs at 1, 3 and 10 cleaners</h2>
            <p>
              ZenMaid&apos;s pricing page carries a control asking how many cleaners and office
              managers are on your team, and every tier price moves when you change it. The
              published $19, $39 and $49 are what it shows before you touch it.
            </p>
          </div>

          <div className="cost-table-scroll">
            <table className="cost-table">
              <thead>
                <tr>
                  <th scope="col">Tier</th>
                  {CREWS.map((n) => (
                    <th scope="col" className="num-head" key={n}>
                      {n} {n === 1 ? 'cleaner' : 'cleaners'}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIERS.map((tier) => (
                  <tr key={tier.name}>
                    <th scope="row" className="cell-tool">
                      <span className="tool-id-text">ZenMaid {tier.name}</span>
                    </th>
                    {CREWS.map((n) => (
                      <td className="cell-price" data-label={`${n} cleaners`} key={n}>
                        {money(at(tier, n))}
                        <span className="calc-band">{money(at(tier, n) * 12)} a year</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="reading">
            <p>
              <strong>The arithmetic, so you can check it.</strong> Pro is {money(39)} plus{' '}
              {money(14)} for each person. One cleaner is 39 plus 14, which is {money(53)} a month.
              Three cleaners is 39 plus 42, which is {money(81)}. Ten cleaners is 39 plus 140, which
              is {money(179)}. Starter adds {money(4)} a person and Pro Max adds {money(24)}, on
              bases of {money(19)} and {money(49)}.
            </p>
            <p>
              <strong>Monthly and annual are the same price.</strong> No annual plan and no annual
              discount appears anywhere on the pricing page, so the yearly column above is simply
              twelve times the monthly one. That is unusual and it is worth knowing: most tools in
              this category cut ten to twenty per cent for paying up front, so ZenMaid is cheaper
              than it looks against a rival&apos;s monthly price and dearer than it looks against a
              rival&apos;s annual one.
            </p>
            <p>
              <strong>Pro is the tier a working crew needs.</strong> Starter has no booking form at
              all and stops at 40 appointments a month, which a single cleaner on a weekly round
              passes inside a month. That makes Pro the honest entry price, and at a crew of three
              that is {money(81)} a month rather than the {money(39)} on the page.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-white">
        <section className="wrapper section" aria-labelledby="included">
          <div className="section-head">
            <span className="eyebrow">Features</span>
            <h2 id="included">What is included at each tier</h2>
          </div>
          <div className="reading">
            <h3>Starter, {money(19)} plus {money(4)} a person</h3>
            <ul>
              <li>Up to 40 appointments a month</li>
              <li>Scheduling with calendar, dispatch and map views</li>
              <li>A limited set of automated SMS and email templates</li>
              <li>Mobile app, without cleaner GPS tracking</li>
              <li>Cleaner SOS alert on the mobile apps</li>
              <li>Online payments through Stripe and Square, and invoicing</li>
              <li>Chat only support</li>
            </ul>

            <h3>Pro, {money(39)} plus {money(14)} a person</h3>
            <ul>
              <li>Everything in Starter, with unlimited appointments</li>
              <li>Booking forms for your website, carrying ZenMaid branding</li>
              <li>Mobile app with cleaner GPS tracking</li>
              <li>Digital checklists for appointments</li>
              <li>More automated SMS and email templates</li>
              <li>Reports and payroll</li>
              <li>Spotfinder, for scheduling new recurring customers</li>
              <li>QuickBooks integration, which the page marks as coming soon</li>
            </ul>

            <h3>Pro Max, {money(49)} plus {money(24)} a person</h3>
            <ul>
              <li>Everything in Starter and Pro</li>
              <li>Booking forms carrying your own branding rather than ZenMaid&apos;s</li>
              <li>Cleaner availability and paid time off tracking</li>
              <li>Service ratings, to collect customer feedback</li>
              <li>The full set of automated SMS and email templates</li>
              <li>Export of your data</li>
              <li>Integrations with Mailchimp and Zapier</li>
              <li>Priority support</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="band band-surface">
        <section className="wrapper section" aria-labelledby="not-included">
          <div className="section-head">
            <span className="eyebrow">Limits</span>
            <h2 id="not-included">What ZenMaid does not include</h2>
          </div>
          <div className="reading">
            <p>
              <strong>SMS messages are not in the price.</strong> Every tier carries a note that SMS
              charges are excluded. Automated reminders are the main reason to buy software like
              this, and the texts they send are billed on top of the subscription. The page does not
              publish a rate, so this is a real cost of unknown size.
            </p>
            <p>
              <strong>Starter has no booking form.</strong> The booking form begins on Pro. A
              cleaning company without one is taking bookings by phone, which is the problem the
              software is meant to solve, so Starter is better understood as a scheduling notebook
              than as a system.
            </p>
            <p>
              <strong>Your own branding on the form costs {money(10)} a month more per person.</strong>{' '}
              Pro puts ZenMaid&apos;s branding on the booking form embedded in your website. Removing
              it needs Pro Max, which is {money(10)} higher at the base and {money(10)} more per
              person, so at ten cleaners the difference is {money(110)} a month.
            </p>
            <p>
              <strong>It is not an accounting package.</strong> ZenMaid invoices and takes payment
              through Stripe and Square. It does not keep books, reconcile a bank feed or produce
              accounts, so most companies run it alongside a ledger. See{' '}
              <Link href="/accounting-software-for-cleaning-business/">
                accounting software for a cleaning business
              </Link>{' '}
              for what that pairing costs.
            </p>
            <p>
              <strong>It is built for maid services.</strong> ZenMaid is a residential cleaning
              product. Contract janitorial work with site level check in and inspections is a
              different job, covered in{' '}
              <Link href="/commercial-cleaning-software/">commercial cleaning software</Link>.
            </p>
            <p>
              <strong>The QuickBooks integration is not shipped.</strong> It is listed on Pro and
              marked coming soon on the pricing page. Treat it as absent until it is not.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-white">
        <section className="wrapper section" aria-labelledby="suits">
          <div className="section-head">
            <span className="eyebrow">Verdict</span>
            <h2 id="suits">Who ZenMaid suits</h2>
          </div>
          <div className="reading">
            <p>
              A residential cleaning company with one to about five cleaners that wants a booking
              form, automated reminders and a schedule its cleaners can read on a phone. At a crew
              of three, Pro at {money(81)} a month is a fair price for that, and the free contact
              import and 14 day trial make it cheap to find out.
            </p>
            <p>
              It also suits an owner who has not hired yet. A solo operator with nobody else on the
              team pays the advertised {money(39)} on Pro, which is the cheapest credible booking
              system on this site at that size.
            </p>

            <h2 id="elsewhere">Who should look elsewhere</h2>
            <p>
              <strong>Anyone at ten cleaners who only needs booking and scheduling.</strong> At ten
              people Pro is {money(179)} a month. Launch27 is flat at {money(75)} regardless of crew
              size, which is {money(104)} a month cheaper for the same core job, and the gap only
              widens as you hire. We priced both in{' '}
              <Link href="/cleaning-business-software-online-booking/">
                cleaning business software with online booking
              </Link>
              .
            </p>
            <p>
              <strong>Anyone who sends a lot of reminders.</strong> SMS is excluded from every tier
              at an unpublished rate, so a company texting every customer before every visit is
              buying an open ended cost. A tool that includes messaging in the subscription is
              easier to budget.
            </p>
            <p>
              <strong>Anyone who needs real books.</strong> If the question is bookkeeping rather
              than scheduling, a ledger is the purchase and ZenMaid is the extra.
            </p>
            <p>
              <strong>Commercial and janitorial operators.</strong> Site based contract work is not
              what this product models.
            </p>
            <p>
              For the full picture across the trade, see{' '}
              <Link href="/cleaning/">cleaning service software compared</Link>, which prices every
              tool here at the same three crew sizes.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-surface">
        <section className="wrapper section" aria-labelledby="faq">
          <div className="section-head">
            <span className="eyebrow">Common questions</span>
            <h2 id="faq">ZenMaid pricing questions</h2>
          </div>
          <div className="reading">
            <p>
              <strong>Is there a free ZenMaid plan?</strong> No. There is a 14 day free trial on
              every tier and no free tier after it. The cheapest paid plan is Starter at {money(19)}{' '}
              a month for a team of nobody, rising by {money(4)} for each person you add.
            </p>
            <p>
              <strong>Is there a ZenMaid setup fee?</strong> None is published. The pricing page
              offers to import your existing contacts and calendar free, and states the plans are
              month to month with no contract and no signature.
            </p>
            <p>
              <strong>What happens when the team grows past a tier?</strong> Nothing breaks and no
              tier change is forced, because the tiers are not capped by headcount. The bill rises
              by {money(4)}, {money(14)} or {money(24)} a month for each person added, depending on
              the tier. The one hard limit is the 40 appointments a month on Starter, which stops
              you adding appointments until you upgrade.
            </p>
            <p>
              <strong>Can you pay ZenMaid monthly?</strong> Monthly is the only option published. No
              annual plan and no annual discount appears anywhere on the pricing page, so a yearly
              cost is twelve times the monthly one.
            </p>
            <p>
              <strong>How current are these figures?</strong> They were read off{' '}
              <a href={SOURCE} rel="nofollow sponsored noopener" target="_blank">
                get.zenmaid.com/pricing
              </a>{' '}
              on {checked}, including driving the team size control through every value rather than
              taking the headline price at face value. Pricing in this category changes several
              times a year. Confirm the current figure with the vendor before you buy.
            </p>
          </div>

          <p className="updated-note">
            Small Crew has not used ZenMaid. This page describes documented pricing and published
            features, read from the vendor pricing page on {checked} and dated accordingly.
          </p>
        </section>
      </div>
    </article>
  );
}
