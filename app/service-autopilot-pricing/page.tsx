import type { Metadata } from 'next';
import Link from 'next/link';
import Disclosure from '@/components/Disclosure';
import JsonLd from '@/components/JsonLd';
import { formatDate, getModified } from '@/lib/dates';
import { ogImageUrl } from '@/lib/og';
import { buildMetadata, getPageSeo } from '@/lib/seo';
import { AUTHOR_ID, AUTHOR_NAME, SITE_NAME, SITE_URL } from '@/lib/site';

const seo = getPageSeo('service-autopilot-pricing');

export const metadata: Metadata = buildMetadata(seo, '/service-autopilot-pricing/', 'article');

// Read off serviceautopilot.com/pricing and its comparison chart on this date.
// The licence counts come from the chart, which is the only place they appear
// per tier. The full reading is in data/prices.json.
const READ_ON = '2026-10-03';
const SOURCE = 'https://www.serviceautopilot.com/pricing/';
const CHART = 'https://www.serviceautopilot.com/pricing/comparison-chart/';

const TIERS = [
  {
    name: 'Startup',
    price: '$49',
    business: 1,
    mobile: 1,
    suits: 'One person testing whether a dispatch system helps',
    adds: 'Scheduling and dispatch, invoicing and integrated payments, expense tracking, customer and lead management',
  },
  {
    name: 'Pro',
    price: '$199',
    business: 1,
    mobile: 2,
    suits: 'An office dispatching a crew on dense recurring routes',
    adds: 'Everything in Startup, plus multi day job management, route optimisation, the dispatch calendar, job costing and analysis, asset, expense and employee tracking, and customised reporting',
  },
  {
    name: 'Pro Plus',
    price: '$499',
    business: 1,
    mobile: 5,
    suits: 'An operation automating follow up and renewals',
    adds: 'Everything in Pro, plus automations, automation workflows, marketplace access and exclusive software trainings',
  },
  {
    name: 'Elite',
    price: 'Request Pricing',
    business: 2,
    mobile: 8,
    suits: 'Multi location businesses that want the gated features included',
    adds: 'Everything in Pro Plus, plus two way texting, Accelerate, email integration, Smart Maps, the client portal, QuickBooks integration, onboarding and training specialists, and multi location management',
  },
];

export default function ServiceAutopilotPricingPage() {
  const url = `${SITE_URL}/service-autopilot-pricing/`;
  const modified = getModified('/service-autopilot-pricing/', READ_ON);
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
            image: ogImageUrl('/service-autopilot-pricing/'),
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
              { '@type': 'ListItem', position: 3, name: 'Service Autopilot pricing', item: url },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How much does Service Autopilot cost per month?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The published plans are $49, $199 and $499 a month, and a fourth tier called Elite carries no price. Those are not month to month figures. The page states that all pricing is based on annual subscription rates, so they are annual rates expressed per month, and every tier also carries a sign up fee whose amount is not published.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much does Service Autopilot cost?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For a complete answer you have to add three things the page does not price: the sign up fee, any mobile or business licences beyond the one, two, five or eight bundled with your tier, and whichever Call for Pricing features you need. The client portal is one of those on all three published tiers.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Service Autopilot a CRM?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It includes customer and lead management from the Startup tier upward, with prospect and leads tracking listed in its comparison chart, so it carries CRM functions inside a field service system. It is sold as scheduling and dispatch software for service businesses rather than as a standalone CRM.',
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
              <span aria-current="page">Service Autopilot pricing</span>
            </nav>

            <Disclosure lead />

            <h1>Service Autopilot Pricing: What Startup, Pro and Pro Plus Cost</h1>
            <p className="page-standfirst">
              Service Autopilot publishes $49, $199 and $499 a month, plus a fourth tier that
              carries no price at all. None of those three is a monthly commitment: the page says
              all pricing is based on annual subscription rates, every tier adds a sign up fee it
              does not quantify, and the customer portal is a call for pricing item on all three.
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
            <h2 id="glance">The four tiers</h2>
          </div>

          <div className="cost-table-scroll">
            <table className="cost-table">
              <thead>
                <tr>
                  <th scope="col">Tier</th>
                  <th scope="col" className="num-head">
                    Price
                  </th>
                  <th scope="col" className="num-head">
                    Business users
                  </th>
                  <th scope="col" className="num-head">
                    Mobile licences
                  </th>
                  <th scope="col">Who it suits</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map((tier) => (
                  <tr key={tier.name}>
                    <th scope="row" className="cell-tool">
                      <span className="tool-id-text">{tier.name}</span>
                    </th>
                    <td
                      className={tier.price.startsWith('$') ? 'cell-price' : 'cell-price is-text'}
                      data-label="Price"
                    >
                      {tier.price}
                    </td>
                    <td className="cell-price" data-label="Business users">
                      {tier.business}
                    </td>
                    <td className="cell-price" data-label="Mobile licences">
                      {tier.mobile}
                    </td>
                    <td data-label="Who it suits">{tier.suits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="cost-table-caption">
            <strong>
              All three figures are annual subscription rates shown per month, in the page&#8217;s
              own words, and each carries a sign up fee that is not quantified.
            </strong>{' '}
            The licence counts come from the{' '}
            <a href={CHART} rel="nofollow sponsored noopener" target="_blank">
              comparison chart
            </a>
            , which is the only place they appear tier by tier. Read on {checked} from{' '}
            <a href={SOURCE} rel="nofollow sponsored noopener" target="_blank">
              serviceautopilot.com/pricing
            </a>
            . Small Crew has not used this software.
          </p>
        </section>
      </div>

      <div className="band band-surface">
        <section className="wrapper section" aria-labelledby="annual">
          <div className="section-head">
            <span className="eyebrow">The basis nobody states</span>
            <h2 id="annual">The figures are annual rates, not monthly commitments</h2>
          </div>
          <div className="reading">
            <p>
              One line sits above the plans: <strong>All pricing is based on annual subscription
              rates.</strong> It appears on the pricing page and again on the comparison chart, and
              it changes what the three numbers mean.
            </p>
            <p>
              $49 a month is what the Startup plan costs if you commit for a year. The page does
              not publish a month to month price for any tier, and it does not say what one would
              cost or whether one exists. So a reader comparing $49 against a rival&#8217;s monthly
              price is not comparing like with like, and a reader planning to try it for two months
              has no figure at all.
            </p>
            <p>
              <strong>Every tier also carries a sign up fee.</strong> The words &#8220;+ sign up
              fee&#8221; appear under all three published prices, and no amount is given anywhere on
              either page. For a one off charge on top of an annual commitment, that is the second
              number a buyer needs and the page does not have it.
            </p>
            <p>
              Taken together, the honest answer to what Service Autopilot costs per month is that
              the published figures are the annual rate divided by twelve, plus an unpublished
              joining fee, plus whatever the gated features below come to.
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
                  {tier.name}, {tier.price}
                </h3>
                <p>{tier.adds}</p>
                <p>
                  Bundled licences: {tier.business} business user
                  {tier.business === 1 ? '' : 's'} and {tier.mobile} mobile licence
                  {tier.mobile === 1 ? '' : 's'}.
                </p>
              </div>
            ))}
            <p>
              The licence counts are the thing to read twice. Business users, which the chart
              describes as full web based office users, stay at one all the way from Startup through
              Pro Plus and only reach two on Elite. So a $499 plan still assumes a single person in
              the office. Mobile licences, which are what a crew in the field needs, run one, two,
              five and eight.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-surface">
        <section className="wrapper section" aria-labelledby="withheld">
          <div className="section-head">
            <span className="eyebrow">Not published</span>
            <h2 id="withheld">What Service Autopilot does not publish</h2>
          </div>
          <div className="reading">
            <p>
              <strong>The Elite tier price.</strong> Elite is a fourth plan above Pro Plus, and its
              price reads Request Pricing. It is the tier that includes the features the other three
              have to ask about, so the gap between Pro Plus and Elite is the one most likely to
              matter and the one you cannot cost.
            </p>
            <p>
              <strong>The sign up fee.</strong> Charged on every published tier, quantified on none.
            </p>
            <p>
              <strong>The cost of extra licences.</strong> If your office has two people, or your
              crew has three phones on Pro, the chart tells you the bundle is exhausted and does not
              tell you what the next one costs.
            </p>
            <p>
              <strong>Twenty two features marked Call for Pricing.</strong> That is the count across
              the comparison chart. The most consequential for a small operator is the{' '}
              <strong>client portal</strong>, which is Call for Pricing on Startup, Pro and Pro Plus
              and included only on Elite. That is the component that lets a customer book and pay
              online, so the entry plan does not include customer facing booking at any published
              price. Smart Maps, email integration and Academy sit in the same position. Two way
              texting, QuickBooks integration and Accelerate are Call for Pricing on Pro and Pro
              Plus. FleetSharp GPS integration is Call for Pricing on all four, Elite included.
            </p>
            <p>
              <strong>The month to month price, if one exists.</strong> Only annual rates are shown.
            </p>
            <p>
              This is why Service Autopilot reads Not published in the cost tables across this site
              rather than carrying its $49. The plan price is published; the price of a working
              configuration is not.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-white">
        <section className="wrapper section" aria-labelledby="suits">
          <div className="section-head">
            <span className="eyebrow">Verdict</span>
            <h2 id="suits">Who Service Autopilot suits</h2>
          </div>
          <div className="reading">
            <p>
              An operation with a dispatcher and dense recurring routes, large enough that a sales
              call is a reasonable use of an hour. The Pro tier is built for exactly that: route
              optimisation, a dispatch calendar, multi day jobs, job costing and employee tracking.
              Its automations on Pro Plus are a genuine differentiator for renewals and follow up.
            </p>
            <p>
              It also suits a company that expects to land on Elite anyway. If you need the client
              portal, two way texting and QuickBooks, you are buying the tier where they are
              included rather than assembling them from call for pricing items.
            </p>

            <h2 id="elsewhere">Who should look elsewhere</h2>
            <p>
              <strong>Any crew that needs online booking at a known price.</strong> The portal is
              gated on all three published tiers.{' '}
              <Link href="/lawn-care-scheduling-software/">Lawn care scheduling software</Link>{' '}
              prices the alternatives that include customer booking in the advertised figure.
            </p>
            <p>
              <strong>A solo operator or a two person crew.</strong> Startup bundles one business
              user and one mobile licence, which is a dispatcher and one phone. LawnPro is free up
              to twenty five customers and $39 a month for three employees, and{' '}
              <Link href="/lawn-care/">the lawn care comparison</Link> prices the rest at one, three
              and ten.
            </p>
            <p>
              <strong>Anyone who wants to try before committing a year.</strong> No month to month
              figure is published.
            </p>
            <p>
              <strong>Residential cleaning.</strong> This is a route and dispatch product. For maid
              work, <Link href="/cleaning/">the cleaning comparison</Link> covers tools built around
              recurring house cleans.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-surface">
        <section className="wrapper section" aria-labelledby="faq">
          <div className="section-head">
            <span className="eyebrow">Common questions</span>
            <h2 id="faq">Service Autopilot pricing questions</h2>
          </div>
          <div className="reading">
            <p>
              <strong>How much does Service Autopilot cost per month?</strong> The published plans
              are $49, $199 and $499 a month, and a fourth tier called Elite carries no price. Those
              are not month to month figures. The page states that all pricing is based on annual
              subscription rates, so they are annual rates expressed per month, and every tier also
              carries a sign up fee whose amount is not published.
            </p>
            <p>
              <strong>How much does Service Autopilot cost in total?</strong> For a complete answer
              you have to add three things the page does not price: the sign up fee, any mobile or
              business licences beyond the one, two, five or eight bundled with your tier, and
              whichever call for pricing features you need. The client portal is one of those on all
              three published tiers.
            </p>
            <p>
              <strong>Is Service Autopilot a CRM?</strong> It includes customer and lead management
              from Startup upward, with prospect and leads tracking listed in its comparison chart,
              so it carries CRM functions inside a field service system. It is sold as scheduling
              and dispatch software for service businesses rather than as a standalone CRM.
            </p>
            <p>
              <strong>What is the Elite plan?</strong> A fourth tier above Pro Plus, priced on
              request. It bundles two business users and eight mobile licences and includes the
              client portal, two way texting, Smart Maps, email integration, QuickBooks integration,
              Accelerate, multi location management and onboarding specialists, most of which are
              call for pricing on the tiers below it.
            </p>
            <p>
              <strong>How current are these figures?</strong> They were read from{' '}
              <a href={SOURCE} rel="nofollow sponsored noopener" target="_blank">
                serviceautopilot.com/pricing
              </a>{' '}
              and its comparison chart on {checked}. Pricing in this category changes several times
              a year. Confirm before you commit.
            </p>
          </div>

          <p className="updated-note">
            Small Crew has not used Service Autopilot. Every figure on this page was read from the
            vendor&#8217;s own pricing page and comparison chart on {checked}, and describes
            documented pricing and published features.
          </p>
        </section>
      </div>
    </article>
  );
}
