// Vendor identity, used for the logo mark beside every tool name.
//
// Logos are stored locally in /public/logos rather than hot linked, so the
// static export has no runtime dependency on a third party and no request
// leaves the reader's browser to a domain they did not choose to visit.
//
// The key must match the `tool:` value in the markdown frontmatter exactly.

export type Vendor = {
  logo: string;
  domain: string;
};

export const VENDORS: Record<string, Vendor> = {
  Jobber: { logo: '/logos/jobber.png', domain: 'getjobber.com' },
  'Housecall Pro': { logo: '/logos/housecallpro.png', domain: 'housecallpro.com' },
  ZenMaid: { logo: '/logos/zenmaid.png', domain: 'zenmaid.com' },
  Connecteam: { logo: '/logos/connecteam.png', domain: 'connecteam.com' },
  Launch27: { logo: '/logos/launch27.png', domain: 'launch27.com' },
  Swept: { logo: '/logos/swept.png', domain: 'sweptworks.com' },
  LawnPro: { logo: '/logos/lawnpro.png', domain: 'lawnprosoftware.com' },
  Yardbook: { logo: '/logos/yardbook.png', domain: 'yardbook.com' },
  'Service Autopilot': { logo: '/logos/serviceautopilot.png', domain: 'serviceautopilot.com' },
  Arborgold: { logo: '/logos/arborgold.png', domain: 'arborgold.com' },
  Aspire: { logo: '/logos/aspire.png', domain: 'youraspire.com' },
  GorillaDesk: { logo: '/logos/gorilladesk.png', domain: 'gorilladesk.com' },
  PestPac: { logo: '/logos/pestpac.png', domain: 'workwave.com' },
  FieldRoutes: { logo: '/logos/fieldroutes.png', domain: 'fieldroutes.com' },
  'ServSuite by FieldRoutes': { logo: '/logos/fieldroutes.png', domain: 'fieldroutes.com' },
  Briostack: { logo: '/logos/briostack.png', domain: 'briostack.com' },
  FreshBooks: { logo: '/logos/freshbooks.png', domain: 'freshbooks.com' },
  Wave: { logo: '/logos/wave.png', domain: 'waveapps.com' },
  'QuickBooks Online': { logo: '/logos/quickbooks.png', domain: 'quickbooks.intuit.com' },
};

export function getVendor(tool: string): Vendor | undefined {
  return VENDORS[tool];
}

// Used as the fallback tile when a vendor has no usable mark.
export function monogram(tool: string): string {
  return tool.replace(/[^A-Za-z]/g, '').charAt(0).toUpperCase() || '?';
}
