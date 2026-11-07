// Vendor identity, used for the logo mark beside every tool name.
//
// Logos are stored locally in /public/logos rather than hot linked, so the
// static export has no runtime dependency on a third party and no request
// leaves the reader's browser to a domain they did not choose to visit.
//
// The key must match the `tool:` value in the markdown frontmatter exactly.

// What the product actually is, which decides whether it belongs in a like for
// like price comparison.
//
//   system      takes a booking, holds a schedule and invoices. This is what
//               the site means by the system a business runs on, and only
//               these are compared against each other on price
//   accounting  a ledger or an invoicing tool. No booking, no schedule
//   workforce   rosters or manages staff. No customer booking, no invoicing
export type VendorKind = 'system' | 'accounting' | 'workforce';

export type Vendor = {
  logo: string;
  domain: string;
  kind: VendorKind;
};

export const VENDORS: Record<string, Vendor> = {
  Jobber: { logo: '/logos/jobber.png', domain: 'getjobber.com', kind: 'system' },
  'Housecall Pro': {
    logo: '/logos/housecallpro.png',
    domain: 'housecallpro.com',
    kind: 'system',
  },
  ZenMaid: { logo: '/logos/zenmaid.png', domain: 'zenmaid.com', kind: 'system' },
  Launch27: { logo: '/logos/launch27.png', domain: 'launch27.com', kind: 'system' },
  Maidily: { logo: '/logos/maidily.png', domain: 'maidily.com', kind: 'system' },
  LawnPro: { logo: '/logos/lawnpro.png', domain: 'lawnprosoftware.com', kind: 'system' },
  Yardbook: { logo: '/logos/yardbook.png', domain: 'yardbook.com', kind: 'system' },
  'Service Autopilot': {
    logo: '/logos/serviceautopilot.png',
    domain: 'serviceautopilot.com',
    kind: 'system',
  },
  Arborgold: { logo: '/logos/arborgold.png', domain: 'arborgold.com', kind: 'system' },
  Aspire: { logo: '/logos/aspire.png', domain: 'youraspire.com', kind: 'system' },
  GorillaDesk: { logo: '/logos/gorilladesk.png', domain: 'gorilladesk.com', kind: 'system' },
  PestPac: { logo: '/logos/pestpac.png', domain: 'workwave.com', kind: 'system' },
  FieldRoutes: { logo: '/logos/fieldroutes.png', domain: 'fieldroutes.com', kind: 'system' },
  'ServSuite by FieldRoutes': {
    logo: '/logos/fieldroutes.png',
    domain: 'fieldroutes.com',
    kind: 'system',
  },
  Briostack: { logo: '/logos/briostack.png', domain: 'briostack.com', kind: 'system' },

  // Snow removal. All three snow specific tools include unlimited users, so
  // they are compared on sites and flat rate rather than on headcount.
  'SnowPilot Pro': { logo: '/logos/snowpilotpro.png', domain: 'snowpilotpro.com', kind: 'system' },
  'Yeti Software': { logo: '/logos/yetisoftware.png', domain: 'yetisoftware.com', kind: 'system' },
  'Aurora Suite': { logo: '/logos/aurorasuite.png', domain: 'aurorasuite.ca', kind: 'system' },
  'Service Fusion': { logo: '/logos/servicefusion.png', domain: 'servicefusion.com', kind: 'system' },

  // Ledgers and invoicing tools. No booking form, no schedule, no job record,
  // so they are never compared on price against a full system.
  FreshBooks: { logo: '/logos/freshbooks.png', domain: 'freshbooks.com', kind: 'accounting' },
  Wave: { logo: '/logos/wave.png', domain: 'waveapps.com', kind: 'accounting' },
  'QuickBooks Online': {
    logo: '/logos/quickbooks.png',
    domain: 'quickbooks.intuit.com',
    kind: 'accounting',
  },

  // Staff tools. Connecteam cannot take a customer booking or invoice. Swept
  // manages janitorial sites and crews and does not bill a contract.
  Connecteam: { logo: '/logos/connecteam.png', domain: 'connecteam.com', kind: 'workforce' },
  Swept: { logo: '/logos/swept.png', domain: 'sweptworks.com', kind: 'workforce' },
};

// Vendors this site has published its own pricing breakdown for.
//
// The site exists to price vendors, so a reader looking at a vendor row should
// be able to reach our working of that vendor from the row itself rather than
// finding it through a category page. This is a navigation aid, not a price,
// and it is deliberately separate from the outbound vendor link beside it.
//
// Adding a fourth vendor is one line. The key must match the `tool:` value in
// the markdown frontmatter exactly, as with VENDORS above.
export const VENDOR_PRICING_PAGES: Record<string, string> = {
  ZenMaid: '/zenmaid-pricing/',
  Arborgold: '/arborgold-pricing/',
  'Service Autopilot': '/service-autopilot-pricing/',
};

// One wording for this link everywhere, rather than a variant per vendor.
export const PRICING_PAGE_LINK_TEXT = 'our pricing breakdown';

/**
 * The internal pricing page for a vendor, if there is one.
 *
 * `currentRoute` suppresses a link to the page the table is already on, so a
 * breakdown page that lists its own vendor can never link to itself. No page
 * does that today, because the three breakdowns are standalone routes rather
 * than markdown guides, but the guard means adding a fourth vendor stays a
 * one line change even if that one is a guide.
 */
export function getPricingPage(tool: string, currentRoute?: string): string | undefined {
  const href = VENDOR_PRICING_PAGES[tool];
  if (!href || href === currentRoute) return undefined;
  return href;
}

export function isSystem(tool: string): boolean {
  return VENDORS[tool]?.kind === 'system';
}

export function getVendor(tool: string): Vendor | undefined {
  return VENDORS[tool];
}

// Used as the fallback tile when a vendor has no usable mark.
export function monogram(tool: string): string {
  return tool.replace(/[^A-Za-z]/g, '').charAt(0).toUpperCase() || '?';
}
