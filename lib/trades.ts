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
      'The other thing that decides cost here is the pricing model rather than the feature list. Flat priced tools such as ZenMaid and Launch27 cost the same at one cleaner and at ten. Per seat tools such as Jobber multiply. At ten cleaners that difference is several thousand dollars a year for software doing broadly the same job.',
    ],
    pullquote:
      'A cleaning company without reminders is a cleaning company paying someone to make confirmation calls.',
  },
  {
    trade: 'lawn-care',
    label: 'Lawn care',
    href: '/lawn-care/',
    h1: 'Lawn care management software compared at three crew sizes',
    standfirst:
      'Lawn care and landscape maintenance. Seasonal contracts, route density and the awkward second season of snow removal.',
    intro: [
      'Lawn care is the category where the most recommended products refuse to tell you what they cost, which makes an honest comparison harder here than in either of the other two trades.',
      'The two numbers that decide this trade are the customer cap on the entry plan and the cost of an additional employee. Lawn care rounds run to hundreds of properties and crews grow and shrink with the season, so a plan capped at twenty five customers is decorative and a tier that bands by headcount will step sharply the month you hire.',
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
      'Pest control is the trade with a genuine compliance requirement, and it is the one where general field service software quietly falls short. A chemical application record has to hold the product, the registration number, the dilution, the quantity, the technician and their licence, captured at the property and retrievable years later. Several otherwise capable tools hold none of it.',
      'It is also the category most resistant to being priced. Four of the six products most often recommended route pricing through a sales conversation, so a small operator cannot compare cost without entering a sales process first.',
    ],
    pullquote: 'The two products that publish a figure are the only two you can budget from.',
  },
];

export function getTradeInfo(trade: Trade): TradeInfo {
  const found = TRADES.find((item) => item.trade === trade);
  if (!found) throw new Error(`No trade info for "${trade}".`);
  return found;
}
