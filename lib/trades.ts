import type { Trade } from './content';

export type TradeInfo = {
  trade: Trade;
  label: string;
  href: string;
  h1: string;
  standfirst: string;
  intro: string[];
  metaTitle: string;
  metaDescription: string;
};

export const TRADES: TradeInfo[] = [
  {
    trade: 'cleaning',
    label: 'Cleaning',
    href: '/cleaning/',
    h1: 'Cleaning business software, priced for a crew under twenty',
    standfirst:
      'Residential, commercial and carpet cleaning. Every tool priced on the tier that actually includes online booking, at one, three and ten cleaners.',
    intro: [
      'Cleaning is the trade where the gap between the advertised price and the usable price is widest. Vendors put a booking form on one tier and the automated reminder that makes the booking form safe on the tier above it, and a cleaning company without reminders is a cleaning company paying someone to make confirmation calls.',
      'The other thing that decides cost here is the pricing model rather than the feature list. Flat priced tools such as ZenMaid and Launch27 cost the same at one cleaner and at ten. Per seat tools such as Jobber multiply. At ten cleaners that difference is several thousand dollars a year for software doing broadly the same job.',
    ],
    metaTitle: 'Cleaning business software compared',
    metaDescription:
      'Cleaning business software priced on the tier that includes online booking, at one, three and ten cleaners, with every figure dated.',
  },
  {
    trade: 'lawn-care',
    label: 'Lawn care',
    href: '/lawn-care/',
    h1: 'Lawn care software, priced at three crew sizes',
    standfirst:
      'Lawn care and landscape maintenance. Seasonal contracts, route density and the awkward second season of snow removal.',
    intro: [
      'Lawn care software is the category where the most recommended products refuse to tell you what they cost. Of the six tools most often put in front of a small operator, three could not be priced for a crew of three from their own published material.',
      'The two numbers that decide this trade are the customer cap on the entry plan and the cost of an additional employee. Lawn care rounds run to hundreds of properties and crews grow and shrink with the season, so a plan capped at twenty five customers is decorative and a tier that bands by headcount will step sharply the month you hire.',
    ],
    metaTitle: 'Lawn care software compared',
    metaDescription:
      'Lawn care software priced on the tier that includes online booking, at one, three and ten employees, with every figure dated.',
  },
  {
    trade: 'pest-control',
    label: 'Pest control',
    href: '/pest-control/',
    h1: 'Pest control software for an operator under twenty staff',
    standfirst:
      'Recurring service agreements, state licence records and the chemical application logs that general purpose software does not hold.',
    intro: [
      'Pest control is the trade with a genuine compliance requirement, and it is the one where general field service software quietly falls short. A chemical application record has to hold the product, the registration number, the dilution, the quantity, the technician and their licence, captured at the property and retrievable years later. Several otherwise capable tools hold none of it.',
      'It is also the category most resistant to being priced. Four of the six products most often recommended route pricing through a sales conversation, so a small operator cannot compare cost without entering a sales process first. The two that publish a figure are the only two you can budget from.',
    ],
    metaTitle: 'Pest control software compared',
    metaDescription:
      'Pest control software priced on the tier that includes online booking, at one, three and ten technicians, with every figure dated.',
  },
];

export function getTradeInfo(trade: Trade): TradeInfo {
  const found = TRADES.find((item) => item.trade === trade);
  if (!found) throw new Error(`No trade info for "${trade}".`);
  return found;
}
