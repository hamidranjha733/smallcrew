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

export const CATEGORY_SEO: Record<string, Seo> = {
  cleaning: {
    keyword: 'cleaning service software',
    title: 'Cleaning Service Software Compared for Small Firms',
    description:
      'Six cleaning service software comparisons, every tool priced on the tier that includes online booking, at 1, 3 and 10 cleaners. Figures dated August 2026.',
  },
  'lawn-care': {
    keyword: 'lawn care management software',
    title: 'Lawn Care Management Software Compared, 2026',
    description:
      'Five lawn care management software comparisons priced at 1, 3 and 10 employees. Several of the best known tools will not quote a small crew without a call.',
  },
  'pest-control': {
    keyword: 'pest control software',
    title: 'Pest Control Software Compared for Under 20 Staff',
    description:
      'Eight pest control software comparisons priced at 1, 3 and 10 technicians. Four of the best known products route every price through a sales conversation.',
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
    title: 'Carpet Cleaning Business Software: 5 Tools Priced',
    description:
      'Five carpet cleaning tools priced per van as well as per seat, so you can see which billing model suits your fleet. Dated August 2026 vendor pricing.',
  },
  'commercial-cleaning-software': {
    keyword: 'commercial cleaning business software',
    title: 'Commercial Cleaning Software for Contract Work',
    description:
      'Janitorial software compared for contract billing, site check in and inspections. Swept starts at $30 a month. Real costs at 1, 3 and 10 cleaners.',
  },
  'cleaning-business-software-online-booking': {
    keyword: 'cleaning business software with online booking',
    title: 'Cleaning Business Software With Online Booking',
    description:
      'Online booking is the feature vendors put one tier above the advertised price. Five cleaning tools priced on the plan that includes it, at 1, 3 and 10 users.',
  },
  'best-lawn-care-software': {
    keyword: 'lawn care software',
    title: 'Lawn Care Software Compared at Three Crew Sizes',
    description:
      'Six lawn care tools priced at 1, 3 and 10 employees. Three of the most recommended will not quote a crew of three without a sales call. Dated August 2026.',
  },
  'lawn-care-scheduling-software': {
    keyword: 'lawn care scheduling software',
    title: 'Lawn Care Scheduling Software: 5 Tools Priced',
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
    title: 'Lawn Care Routing Software Priced Per Truck',
    description:
      'Routing software priced per truck as well as per person, because that one difference moves the bill by thousands a year. Costs at 1, 3 and 10 employees.',
  },
  'lawn-care-snow-removal-software': {
    keyword: 'lawn care snow removal software',
    title: 'Lawn Care and Snow Removal Software Compared',
    description:
      'Software for a two season business, and the finding that almost nothing under $200 a month handles per push snow billing properly. Dated vendor pricing.',
  },
  'best-pest-control-software': {
    keyword: 'best pest control software',
    title: 'Best Pest Control Software for Small Operators',
    description:
      'Six pest control tools compared, of which four route pricing through a sales call. The two that publish a figure, priced at 1, 3 and 10 technicians.',
  },
  'pest-control-accounting-software': {
    keyword: 'pest control accounting software',
    title: 'Pest Control Accounting Software Compared 2026',
    description:
      'Pest control accounting compared, including the chemical inventory and deferred revenue your field app cannot see. Costs at 1, 3 and 10 technicians.',
  },
  'pest-control-invoice-software': {
    keyword: 'pest control invoice software',
    title: 'Pest Control Invoice Software for Service Plans',
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
    title: 'Pest Control Lead Management Software Compared',
    description:
      'A small operator does not have a pipeline problem, they have a response time problem. Five tools priced at 1, 3 and 10 technicians, dated August 2026.',
  },
  'cloud-based-pest-control-software': {
    keyword: 'cloud based pest control software',
    title: 'Cloud Based Pest Control Software Compared',
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
    title: 'Pest Control Takeoff Software: Does It Exist?',
    description:
      'No field service product here performs a measured takeoff. What operators actually mean by the term, and the cheaper way to price a termite pretreat.',
  },
};

// Enforced at build time. A title that creeps over 60 characters or a
// description outside 140 to 160 fails the build rather than shipping.
const TITLE_MAX = 60;
const DESC_MIN = 140;
const DESC_MAX = 160;

function validate(): void {
  const entries: [string, Seo][] = [
    ['/', HOME_SEO],
    ...Object.entries(CATEGORY_SEO).map(([k, v]): [string, Seo] => [`/${k}/`, v]),
    ...Object.entries(GUIDE_SEO).map(([k, v]): [string, Seo] => [`/${k}/`, v]),
  ];

  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();
  const problems: string[] = [];

  for (const [route, seo] of entries) {
    if (seo.title.length > TITLE_MAX) {
      problems.push(`${route} title is ${seo.title.length} chars, max ${TITLE_MAX}`);
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
