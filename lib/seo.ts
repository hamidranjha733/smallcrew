// Per page title tags and meta descriptions.
//
// These live here rather than in frontmatter because CLAUDE.md fixes the
// content schema to seven keys. Titles are absolute, so no site name template
// is appended and the character budget below is the whole string.
//
// Rules enforced by scripts/check-seo.mjs and by the build:
//   title       leads with the target keyword, under 60 characters
//   description 140 to 160 characters, written to earn the click
//   no two pages share a title or a description

import type { Metadata } from 'next';
import { ogImageUrl, ogTitle, OG_HEIGHT, OG_WIDTH } from './og';

export type Seo = {
  title: string;
  description: string;
  keyword: string;
};

export const HOME_SEO: Seo = {
  keyword: 'cleaning business software',
  title: 'Cleaning Business Software: Real Prices, 3 Crew Sizes',
  description:
    'Cleaning business software priced on the tier that actually includes online booking, at 1, 3 and 10 users. Every figure read from a vendor page and dated.',
};

// Standalone pages that are neither the homepage, a category nor a guide.
export const PAGE_SEO: Record<string, Seo> = {
  'arborgold-pricing': {
    keyword: 'arborgold pricing',
    title: 'Arborgold Pricing 2026: What the Three Plans Really Cost',
    description:
      'Arborgold lists Starter, Professional and Enterprise at $129, $299 and $499 annually, or $149, $343 and $573 monthly. User licence costs are not published.',
  },
  'zenmaid-pricing': {
    keyword: 'zenmaid pricing',
    title: 'ZenMaid Pricing 2026: Real Cost at 1, 3 and 10 Cleaners',
    description:
      'ZenMaid pricing broken down for teams of 1, 3 and 10 cleaners, with every figure dated and taken from the live pricing page. Independent, no vendor input.',
  },
  privacy: {
    keyword: 'Small Crew privacy',
    title: 'Small Crew Privacy Policy: No Cookies and No Analytics',
    description:
      'Small Crew sets no cookies and runs no analytics or tracking scripts. The one third party is Google Fonts, which receives your IP when a page loads.',
  },
  contact: {
    keyword: 'contact Small Crew',
    title: 'Contact Small Crew, and How to Report a Wrong Price',
    description:
      'How to reach Small Crew. One address, read by one person. Corrections to a vendor price are the most useful thing you can send and get priority.',
  },
  about: {
    keyword: 'about Small Crew',
    title: 'About Small Crew and How We Price Software by Crew Size',
    description:
      'Who runs Small Crew, why every price here is the tier that includes online booking rather than the cheapest plan, how figures are dated, and how we earn.',
  },
};

export function getPageSeo(key: string): Seo {
  const seo = PAGE_SEO[key];
  if (!seo) throw new Error(`No SEO entry for page "${key}". Add one to lib/seo.ts.`);
  return seo;
}

export const CATEGORY_SEO: Record<string, Seo> = {
  cleaning: {
    keyword: 'cleaning service software',
    title: 'Cleaning Service Software Compared for Small Firms',
    description:
      'Six cleaning service software comparisons, every tool priced on the tier that includes online booking, at 1, 3 and 10 cleaners. Figures dated August 2026.',
  },
  'lawn-care': {
    keyword: 'best lawn care software',
    title: 'Best Lawn Care Software Priced at Three Crew Sizes',
    description:
      'Best lawn care software priced at 1, 3 and 10 employees, on the tier that includes online booking. Three of the six could not be priced at three staff.',
  },
  'pest-control': {
    keyword: 'pest control software',
    title: 'Pest Control Software Priced at 1, 3 and 10 Technicians',
    description:
      'Seven pest control software comparisons priced at 1, 3 and 10 technicians. Four of the best known products route every price through a sales conversation.',
  },
};

export const GUIDE_SEO: Record<string, Seo> = {
  'best-software-for-cleaning-business': {
    keyword: 'best cleaning business software',
    title: 'Best Cleaning Business Software for a Crew Under 20',
    description:
      'Six cleaning tools priced on the tier that includes online booking, not the cheapest plan. Costs at 1, 3 and 10 cleaners, every figure dated August 2026.',
  },
  'scheduling-software-for-cleaning-business': {
    keyword: 'scheduling software for cleaning business',
    title: 'Scheduling Software for Cleaning Business Compared',
    description:
      'Five cleaning service scheduling tools priced on the tier that takes customer bookings. See what each costs at 1, 3 and 10 cleaners before you commit.',
  },
  'accounting-software-for-cleaning-business': {
    keyword: 'accounting software for cleaning business',
    title: 'Accounting Software for Cleaning Business Compared',
    description:
      'Wave, FreshBooks and QuickBooks compared for cleaning firms, plus the point a cleaning app stops being a ledger. Real costs at 1, 3 and 10 cleaners.',
  },
  'carpet-cleaning-business-software': {
    keyword: 'carpet cleaning business software',
    title: 'Carpet Cleaning Business Software Priced for 1 to 10 Vans',
    description:
      'Five carpet cleaning tools priced per van as well as per seat, so you can see which billing model suits your fleet. Dated August 2026 vendor pricing.',
  },
  'commercial-cleaning-software': {
    keyword: 'commercial cleaning business software',
    title: 'Commercial Cleaning Software for Contract Work, Priced',
    description:
      'Janitorial software compared for contract billing, site check in and inspections. Swept starts at $30 a month. Real costs at 1, 3 and 10 cleaners.',
  },
  'cleaning-business-software-online-booking': {
    keyword: 'cleaning business software with online booking',
    title: 'Cleaning Business Software With Online Booking, Priced',
    description:
      'Online booking is the feature vendors put one tier above the advertised price. Five cleaning tools priced on the plan that has it, at 1, 3 and 10 users.',
  },
  'lawn-care-scheduling-software': {
    keyword: 'lawn care scheduling software',
    title: 'Lawn Care Scheduling Software Priced at Three Crew Sizes',
    description:
      'Five lawn care scheduling tools priced on the tier that takes customer bookings. LawnPro from $39, Jobber from $139, Connecteam free to ten users.',
  },
  'lawn-care-billing-software': {
    keyword: 'lawn care billing software',
    title: 'Lawn Care Billing and Accounting Software Compared',
    description:
      'Lawn care billing compared with real accounting, and the point a lawn app stops being a ledger. Monthly costs at 1, 3 and 10 employees, dated August 2026.',
  },
  'lawn-care-routing-software': {
    keyword: 'lawn care routing software',
    title: 'Lawn Care Routing Software Priced at Three Crew Sizes',
    description:
      'Routing software priced per truck as well as per person, because that one difference moves the bill by thousands a year. Costs at 1, 3 and 10 employees.',
  },
  'lawn-care-snow-removal-software': {
    keyword: 'lawn care snow removal software',
    title: 'Lawn Care and Snow Removal Software Priced by Crew Size',
    description:
      'Software for a two season business, and the finding that almost nothing under $200 a month handles per push snow billing properly. Dated vendor pricing.',
  },
  'pest-control-accounting-software': {
    keyword: 'pest control accounting software',
    title: 'Pest Control Accounting Software, Priced at 3 Crew Sizes',
    description:
      'Pest control accounting compared, including the chemical inventory and deferred revenue your field app cannot see. Costs at 1, 3 and 10 technicians.',
  },
  'pest-control-invoice-software': {
    keyword: 'pest control invoice software',
    title: 'Pest Control Invoice Software for Recurring Service Plans',
    description:
      'Five invoicing tools judged on one question: how many invoices leave the building without anyone opening anything. Costs at 1, 3 and 10 technicians.',
  },
  'pest-control-marketing-software': {
    keyword: 'pest control marketing software',
    title: 'Pest Control Marketing Software: What Actually Pays',
    description:
      'The highest return marketing feature for a small pest operator is the renewal notice, not paid ads. Five tools priced at 1, 3 and 10 technicians.',
  },
  'pest-control-lead-management-software': {
    keyword: 'pest control lead management software',
    title: 'Pest Control Lead Management Software, Priced by Size',
    description:
      'A small operator does not have a pipeline problem, they have a response time problem. Five tools priced at 1, 3 and 10 technicians, dated August 2026.',
  },
  'cloud-based-pest-control-software': {
    keyword: 'cloud based pest control software',
    title: 'Cloud Based Pest Control Software Priced at 1, 3 and 10',
    description:
      'Every product here is cloud based, so the term decides nothing. The questions that do: offline capture in a crawl space, and who holds your records.',
  },
  'free-pest-control-software': {
    keyword: 'free pest control software',
    title: 'Free Pest Control Software: What Free Really Costs',
    description:
      'No free pest control software records chemical applications. Two genuinely free tools that solve part of the job, and the point paying starts to pay.',
  },
  'pest-control-takeoff-software': {
    keyword: 'pest control takeoff software',
    title: 'Pest Control Takeoff Software: Does It Actually Exist?',
    description:
      'No field service product here performs a measured takeoff. What operators actually mean by the term, and the cheaper way to price a termite pretreat.',
  },
};

// Enforced at build time. A title that creeps over 60 characters or a
// description outside 140 to 160 fails the build rather than shipping.
// Titles run 50 to 60. Under 50 wastes SERP width, over 60 is truncated.
const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESC_MIN = 140;
const DESC_MAX = 155;

function validate(): void {
  const entries: [string, Seo][] = [
    ['/', HOME_SEO],
    ...Object.entries(PAGE_SEO).map(([k, v]): [string, Seo] => [`/${k}/`, v]),
    ...Object.entries(CATEGORY_SEO).map(([k, v]): [string, Seo] => [`/${k}/`, v]),
    ...Object.entries(GUIDE_SEO).map(([k, v]): [string, Seo] => [`/${k}/`, v]),
  ];

  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();
  const problems: string[] = [];

  for (const [route, seo] of entries) {
    if (seo.title.length < TITLE_MIN || seo.title.length > TITLE_MAX) {
      problems.push(
        `${route} title is ${seo.title.length} chars, want ${TITLE_MIN} to ${TITLE_MAX}`,
      );
    }
    if (seo.description.length < DESC_MIN || seo.description.length > DESC_MAX) {
      problems.push(
        `${route} description is ${seo.description.length} chars, want ${DESC_MIN} to ${DESC_MAX}`,
      );
    }
    const titleOwner = titles.get(seo.title);
    if (titleOwner) problems.push(`${route} duplicates the title of ${titleOwner}`);
    titles.set(seo.title, route);

    const descOwner = descriptions.get(seo.description);
    if (descOwner) problems.push(`${route} duplicates the description of ${descOwner}`);
    descriptions.set(seo.description, route);
  }

  if (problems.length > 0) {
    throw new Error(`SEO metadata problems:\n  ${problems.join('\n  ')}`);
  }
}

validate();

export function getGuideSeo(slug: string): Seo {
  const seo = GUIDE_SEO[slug];
  if (!seo) throw new Error(`No SEO entry for guide "${slug}". Add one to lib/seo.ts.`);
  return seo;
}

export function getCategorySeo(trade: string): Seo {
  const seo = CATEGORY_SEO[trade];
  if (!seo) throw new Error(`No SEO entry for category "${trade}". Add one to lib/seo.ts.`);
  return seo;
}

// "August 2026" becomes an ISO date so Article and the sitemap can both use it.
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function checkedToIso(pricesChecked: string): string {
  const [month, year] = pricesChecked.split(' ');
  const index = MONTHS.indexOf(month);
  if (index < 0) throw new Error(`Unrecognised month in "${pricesChecked}".`);
  return `${year}-${String(index + 1).padStart(2, '0')}-01`;
}

// One place that turns an SEO entry into a page's metadata, so the share card,
// the canonical and the twitter fields are set identically on every route and
// a new page cannot quietly ship without them. Before this, each of the nine
// route files assembled its own object and none of them set an image.
export function buildMetadata(
  seo: Seo,
  route: string,
  type: 'website' | 'article' = 'website',
): Metadata {
  const image = ogImageUrl(route);

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: route },
    openGraph: {
      type,
      title: seo.title,
      description: seo.description,
      url: route,
      images: [
        {
          url: image,
          width: OG_WIDTH,
          height: OG_HEIGHT,
          alt: ogTitle(seo.title),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [image],
    },
  };
}
