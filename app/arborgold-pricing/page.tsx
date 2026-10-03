import type { Metadata } from 'next';
import Link from 'next/link';
import Disclosure from '@/components/Disclosure';
import JsonLd from '@/components/JsonLd';
import { formatDate, getModified } from '@/lib/dates';
import { ogImageUrl } from '@/lib/og';
import { buildMetadata, getPageSeo } from '@/lib/seo';
import { AUTHOR_ID, AUTHOR_NAME, SITE_NAME, SITE_URL } from '@/lib/site';

const seo = getPageSeo('arborgold-pricing');

export const metadata: Metadata = buildMetadata(seo, '/arborgold-pricing/', 'article');

// Every figure below was read off arborgold.com/pricing on this date, including
// operating the billing switch to see both bases. The full reading is in
// data/prices.json.
const READ_ON = '2026-10-03';
const SOURCE = 'https://arborgold.com/pricing/';

const TIERS = [
  {
    name: 'Starter',
    monthly: 149,
    annual: 129,
    blurb: "Arborgold's essential CRM, estimating, scheduling and invoicing tools.",
    suits: 'A tree or landscape firm replacing paper and spreadsheets',
    features: [
      'CRM',
      'Estimating',
      'Unlimited land measurements',
      'Drag and drop scheduling',
      'Route optimisation',
      'Job management',
      'Communications and messaging',
      'Invoicing and e-payments',
      'Reporting and analytics',
      'Crew time tracking',
      'Standard integrations',
    ],
  },
  {
    name: 'Professional',
    monthly: 343,
    annual: 299,
    blurb: 'Adds job costing, material tracking and automated renewals.',
    suits: 'Work that consumes materials and needs costing per job',
    features: [
      'Everything in Starter',
      'Job costing',
      'Renewals',
      'Material inventory management',
      'Chemical tracking',
      'Autoprice calculator',
      'Advanced resources',
      'Advanced integrations',
    ],
  },
  {
    name: 'Enterprise',
    monthly: 573,
    annual: 499,
    blurb: 'Arborgold across an entire operation.',
    suits: 'Multi crew operations running projects as well as routes',
    features: [
      'Everything in Professional',
      'Plant and tree inventory mapping',
      'Sales automation',
      'Custom templates',
      'Expense tracking',
      'Equipment maintenance tracking',
      'Project scheduling',
      'Enterprise integrations',
    ],
  },
];

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

export default function ArborgoldPricingPage() {
  const url = `${SITE_URL}/arborgold-pricing/`;
  const modified = getModified('/arborgold-pricing/', READ_ON);
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
            image: ogImageUrl('/arborgold-pricing/'),
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
              { '@type': 'ListItem', position: 2, name: 'Lawn care', item: `${SITE_URL}/lawn-care/` },
              { '@type': 'ListItem', position: 3, name: 'Arborgold pricing', item: url },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How does Arborgold compare to its competitors on price?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Its entry tier is dearer than most tools aimed at a small crew. Starter is $149 a month paying monthly, against $75 for Launch27 and $139 for Jobber Connect at one user. The comparison is not like for like, because Arborgold adds user licence costs it does not publish, while Launch27 includes unlimited users in its figure.',
                },
              },
              {
                '@type': 'Question',
                name: 'What does scheduling software for a service business usually cost?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For a crew under twenty staff the published entry prices on this site run from free to about $150 a month for a tier that includes online booking. At ten staff the published figures range from $75 to $299 a month. Arborgold sits at the top of the entry range before licences are added.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long has Arborgold been in business?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Its own pricing page does not state a founding date, so this page does not give one. What the page does show is a product organised around tree care, plant health and landscape work rather than general field service.',
                },
              },
              {
                '@type': 'Question',
                name: 'What do Arborgold reviews say?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Small Crew has not used Arborgold and does not aggregate review scores, so this page makes no claim about them. It compares documented pricing and published features only.',
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
              <Link href="/lawn-care/">Lawn care</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Arborgold pricing</span>
            </nav>

            <Disclosure lead />

            <h1>Arborgold Pricing: What Starter, Professional and Enterprise Cost</h1>
            <p className="page-standfirst">
              Arborgold leads with {money(129)}, {money(299)} and {money(499)} a month. Those are
              the annual billing rates. Paying monthly costs {money(149)}, {money(343)} and{' '}
              {money(573)}, an annual contract is required either way, and the user licences every
              one of those plans needs are priced only on request.
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
            <h2 id="glance">The three plans</h2>
          </div>

          <div className="cost-table-scroll">
            <table className="cost-table">
              <thead>
                <tr>
                  <th scope="col">Plan</th>
                  <th scope="col" className="num-head">
                    Paying monthly
                  </th>
                  <th scope="col" className="num-head">
                    Annual billing
                  </th>
                  <th scope="col">What it adds</th>
                  <th scope="col">Who it suits</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map((tier) => (
                  <tr key={tier.name}>
                    <th scope="row" className="cell-tool">
                      <span className="tool-id-text">{tier.name}</span>
                    </th>
                    <td className="cell-price" data-label="Paying monthly">
                      {money(tier.monthly)}
                    </td>
                    <td className="cell-price" data-label="Annual billing">
                      {money(tier.annual)}
                    </td>
                    <td data-label="What it adds">{tier.blurb}</td>
                    <td data-label="Who it suits">{tier.suits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="cost-table-caption">
            <strong>
              Both columns are monthly costs, and both require an annual contract.
            </strong>{' '}
            The page states &#8220;Annual contract required. Monthly and annual payment options
            available&#8221;, so the choice is how you pay rather than how long you commit. Neither
            column includes the user licences described below, which are not priced on the page.
            Read on {checked} from{' '}
            <a href={SOURCE} rel="nofollow sponsored noopener" target="_blank">
              arborgold.com/pricing
            </a>
            . Small Crew has not used this software.
          </p>
        </section>
      </div>

      <div className="band band-surface">
        <section className="wrapper section" aria-labelledby="covers">
          <div className="section-head">
            <span className="eyebrow">The part nobody else states</span>
            <h2 id="covers">What the published figures do and do not cover</h2>
            <p>
              Three numbers appear on every other page about Arborgold pricing. What those pages
              leave out is what the numbers are attached to.
            </p>
          </div>
          <div className="reading">
            <p>
              <strong>The headline figures are the annual billing rates.</strong> The page opens
              with a switch set to Annual, carrying the line &#8220;Save up to {money(100)}/mo&#8221;,
              and in that state the plans read {money(129)}, {money(299)} and {money(499)}. Move the
              switch to Monthly and the same three plans read {money(149)}, {money(343)} and{' '}
              {money(573)}. A comparison that quotes {money(129)} against a rival&#8217;s monthly
              price is comparing two different things.
            </p>
            <p>
              <strong>That {money(100)} claim does not survive its own figures.</strong> The actual
              gap between paying monthly and committing annually is {money(20)} on Starter,{' '}
              {money(44)} on Professional and {money(74)} on Enterprise. The largest real saving is
              {' '}{money(74)} a month, not {money(100)}.
            </p>
            <p>
              <strong>An annual contract is required on both.</strong> The footnote under all three
              plans reads &#8220;Annual contract required. Monthly and annual payment options
              available&#8221;. So the monthly column is a payment schedule, not a short commitment.
              There is no month to month option on this page at any price.
            </p>
            <p>
              <strong>None of the three figures includes a user.</strong> The plan price is step one
              of three. Step two is headed &#8220;Add Users To Your Account&#8221; and offers two
              kinds, Office Users for owners, admins and operations teams, and Mobile Users for
              estimators, salespeople and crew leads. The page says &#8220;Scalable license pricing
              and only pay for what you need&#8221; and gives no figure for either. The button says
              Request Pricing.
            </p>
            <p>
              This is why this page does not tell you what Arborgold costs at one, three and ten
              staff, which is the comparison every other page on this site makes. It cannot be done
              honestly. The plan price is published and the per person price is not, so the bill for
              any actual crew is unknown until you ask for it.
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
            {TIERS.map((tier) => (
              <div key={tier.name}>
                <h3>
                  {tier.name}, {money(tier.monthly)} a month paying monthly or {money(tier.annual)}{' '}
                  on annual billing
                </h3>
                <ul>
                  {tier.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
            <p>
              Chemical tracking sits on Professional rather than Starter, which matters for anyone
              doing plant health care, because the cheapest plan will not hold an application
              record.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-surface">
        <section className="wrapper section" aria-labelledby="withheld">
          <div className="section-head">
            <span className="eyebrow">Not published</span>
            <h2 id="withheld">What Arborgold does not publish</h2>
          </div>
          <div className="reading">
            <p>
              <strong>The cost of an office user licence.</strong> Described in detail, priced only
              on request.
            </p>
            <p>
              <strong>The cost of a mobile user licence.</strong> The same. For a field business
              this is the number that decides the bill, because crew leads and estimators are the
              people who need the app.
            </p>
            <p>
              <strong>How many users, if any, a plan includes.</strong> The page does not say
              whether {money(149)} buys one login or none, which makes the plan price impossible to
              turn into a total.
            </p>
            <p>
              <strong>The cost of onboarding.</strong> Step three offers instructor led virtual
              training and done for you data migration, with no figure against either.
            </p>
            <p>
              <strong>The length of the annual contract term and its renewal behaviour.</strong>{' '}
              The footnote requires an annual contract and says nothing about notice or renewal.
            </p>
            <p>
              Taken together, a buyer can learn the plan price and cannot learn the bill. That is a
              defensible way to sell complex software and it is worth knowing before you spend an
              hour on a demo expecting the number to be close to {money(149)}.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-white">
        <section className="wrapper section" aria-labelledby="suits">
          <div className="section-head">
            <span className="eyebrow">Verdict</span>
            <h2 id="suits">Who Arborgold suits</h2>
          </div>
          <div className="reading">
            <p>
              Tree care, plant health care and landscape construction firms whose work consumes
              materials and needs costing per job. The Professional tier is built around exactly
              that: job costing, material inventory, chemical tracking and an autoprice calculator.
              Nothing else priced on this site combines plant and tree inventory mapping with route
              based scheduling.
            </p>
            <p>
              It also suits a company large enough that a sales conversation is worth an hour.
              If you are going to end up on a call anyway, the unpublished licence cost stops being
              an obstacle and becomes one more line on a quote.
            </p>

            <h2 id="elsewhere">Who should look elsewhere</h2>
            <p>
              <strong>Straightforward lawn maintenance.</strong> A mow and go round does not use job
              costing or material inventory, and it will pay for both.{' '}
              <Link href="/lawn-care/">The lawn care comparison</Link> prices the alternatives at one,
              three and ten employees.
            </p>
            <p>
              <strong>Anyone who needs to budget before committing time.</strong> Launch27 at{' '}
              {money(75)} a month flat for unlimited users and LawnPro from free to {money(249)} by
              employee band both publish a complete price. Arborgold publishes a partial one.
            </p>
            <p>
              <strong>Anyone wanting a month to month arrangement.</strong> The annual contract is
              required on both payment options.
            </p>
            <p>
              <strong>A solo operator.</strong> At {money(149)} a month before licences, Starter is
              the dearest entry price on this site for a single person, and{' '}
              <Link href="/lawn-care-routing-software/">routing</Link> or{' '}
              <Link href="/lawn-care-scheduling-software/">scheduling</Link> alone can be had for
              much less.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-surface">
        <section className="wrapper section" aria-labelledby="faq">
          <div className="section-head">
            <span className="eyebrow">Common questions</span>
            <h2 id="faq">Arborgold pricing questions</h2>
          </div>
          <div className="reading">
            <p>
              <strong>How does Arborgold compare to its competitors on price?</strong> Its entry
              tier is dearer than most tools aimed at a small crew: {money(149)} a month paying
              monthly, against {money(75)} for Launch27 and {money(139)} for Jobber Connect at one
              user. The comparison is not like for like, because Arborgold adds licence costs it
              does not publish while Launch27 includes unlimited users in its figure.
            </p>
            <p>
              <strong>What does scheduling software for a service business usually cost?</strong>{' '}
              For a crew under twenty staff, the published entry prices on this site run from free
              to about {money(150)} a month for a tier that includes online booking, and at ten
              staff the published figures range from {money(75)} to {money(299)}. Arborgold sits at
              the top of the entry range before licences are added.
            </p>
            <p>
              <strong>How long has Arborgold been in business?</strong> Its pricing page does not
              state a founding date, so this page does not give one. What the page does show is a
              product organised around tree care, plant health and landscape work rather than
              general field service.
            </p>
            <p>
              <strong>What do Arborgold reviews say?</strong> Small Crew has not used Arborgold and
              does not aggregate review scores, so this page makes no claim about them. What is here
              is documented pricing and published features, read on {checked}.
            </p>
            <p>
              <strong>Is there a free trial?</strong> The pricing page offers Get Started buttons
              and a Request Pricing route for licences, and does not advertise a free trial. Treat
              that as unanswered rather than as a no.
            </p>
          </div>

          <p className="updated-note">
            Small Crew has not used Arborgold. Every figure on this page was read from{' '}
            <a href={SOURCE} rel="nofollow sponsored noopener" target="_blank">
              arborgold.com/pricing
            </a>{' '}
            on {checked}, including operating the billing switch to see both bases. Vendor pricing
            changes several times a year. Confirm the current figure before you buy.
          </p>
        </section>
      </div>
    </article>
  );
}
