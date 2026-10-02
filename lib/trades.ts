import type { Trade } from './content';

export type TradeInfo = {
  trade: Trade;
  label: string;
  href: string;
  h1: string;
  standfirst: string;
  intro: string[];
  // One short sentence, lifted out of the intro and set large in the accent
  // colour. It is not repeated in `intro`, so it never prints twice.
  pullquote: string;
  // Optional single pointer to a page that is not one of this trade's guides,
  // such as a deep dive on one vendor's pricing. Rendered under the intro.
  spotlight?: { href: string; label: string; note: string };
};

export const TRADES: TradeInfo[] = [
  {
    trade: 'cleaning',
    label: 'Cleaning',
    href: '/cleaning/',
    h1: 'Cleaning service software compared for small firms',
    standfirst:
      'Residential, commercial and carpet cleaning. Every tool priced on the tier that actually includes online booking, at one, three and ten cleaners.',
    intro: [
      'Cleaning is the trade where the gap between the advertised price and the usable price is widest. Vendors put a booking form on one tier, then put the automated reminder that makes the booking form safe on the tier above it.',
      'The other thing that decides cost here is the pricing model rather than the feature list. Launch27 is genuinely flat and costs the same at one cleaner and at ten. ZenMaid looks flat and is not, because it adds a fixed amount for every person on the team. Jobber bands by team size, holding flat inside a band and stepping at its edge. At ten cleaners those differences run to thousands of dollars a year for software doing broadly the same job.',
    ],
    pullquote:
      'A cleaning company without reminders is a cleaning company paying someone to make confirmation calls.',
    spotlight: {
      href: '/zenmaid-pricing/',
      label: 'ZenMaid pricing, at 1, 3 and 10 cleaners',
      note: 'The advertised $39 is the price before any staff are added. What it actually costs a crew.',
    },
  },
  {
    trade: 'lawn-care',
    label: 'Lawn care',
    href: '/lawn-care/',
    h1: 'The best lawn care software, priced at three crew sizes',
    standfirst:
      'Lawn care and landscape maintenance. Seasonal contracts, route density and the awkward second season of snow removal.',
    intro: [
      'The best lawn care software for a crew under twenty is LawnPro at $39 a month for three employees, the cheapest published price in the category that includes a client portal and unlimited customers, or Jobber at $139 rising to $299 at ten if you quote a lot of new work. Three of the six products most often recommended here, Service Autopilot, Aspire and Yardbook, could not be priced for a crew of three from their own published material in August 2026.',
      'The two numbers that decide this trade are the customer cap on the entry plan and the cost of an additional employee. Lawn care rounds run to hundreds of properties and crews grow and shrink with the season, so a plan capped at twenty five customers is decorative and a tier that bands by headcount will step sharply the month you hire. Half the category declines to publish either number.',
    ],
    pullquote:
      'Three of the six tools most often put in front of a small operator could not be priced for a crew of three.',
  },
  {
    trade: 'pest-control',
    label: 'Pest control',
    href: '/pest-control/',
    h1: 'Pest control software compared for operators under twenty staff',
    standfirst:
      'Recurring service agreements, state licence records and the chemical application logs that general purpose software does not hold.',
    intro: [
      'Pest control software costs $99 a month at one technician on GorillaDesk Pro and $139 on Jobber Connect, the only two of the six products compared below that publish a price at all. At ten technicians the published figures run from $249 to $549, and which end you land on is decided by how many vehicles leave your yard rather than how many people you employ. The other four route every price through a sales conversation.',
      'This is also the trade with a genuine compliance requirement, and the one where general field service software quietly falls short. A chemical application record has to hold the product, the registration number, the dilution, the quantity, the technician and their licence, captured at the property and retrievable years later. One of the two products you can price holds none of it, which is the trade off this page exists to set out.',
    ],
    pullquote: 'The two products that publish a figure are the only two you can budget from.',
  },
];

export function getTradeInfo(trade: Trade): TradeInfo {
  const found = TRADES.find((item) => item.trade === trade);
  if (!found) throw new Error(`No trade info for "${trade}".`);
  return found;
}
