import type { Page, Tool } from './content';

// The homepage summary table. Each row names the guide it is taken from, and
// the cells are read straight out of that guide's frontmatter, so the homepage
// can never disagree with the page it links to and no new price is authored.

export type SummaryRow = {
  tool: string;
  trade: string;
  slug: string;
  row: Tool;
};

const PICKS: { tool: string; trade: string; slug: string }[] = [
  { tool: 'Connecteam', trade: 'All trades', slug: 'best-software-for-cleaning-business' },
  { tool: 'Swept', trade: 'Commercial cleaning', slug: 'best-software-for-cleaning-business' },
  { tool: 'ZenMaid', trade: 'Cleaning', slug: 'best-software-for-cleaning-business' },
  { tool: 'Launch27', trade: 'Cleaning', slug: 'best-software-for-cleaning-business' },
  { tool: 'Housecall Pro', trade: 'Cleaning', slug: 'best-software-for-cleaning-business' },
  { tool: 'LawnPro', trade: 'Lawn care', slug: 'best-lawn-care-software' },
  { tool: 'GorillaDesk', trade: 'Pest control', slug: 'best-pest-control-software' },
  { tool: 'Arborgold', trade: 'Lawn care', slug: 'best-lawn-care-software' },
  { tool: 'Jobber', trade: 'All trades', slug: 'best-software-for-cleaning-business' },
];

export function getSummaryRows(pages: Page[]): SummaryRow[] {
  const rows: SummaryRow[] = [];

  for (const pick of PICKS) {
    const page = pages.find((item) => item.slug === pick.slug);
    if (!page) throw new Error(`Summary row points at a missing guide: ${pick.slug}`);

    const row = page.tools.find((tool) => tool.tool === pick.tool);
    if (!row) {
      throw new Error(`Summary row "${pick.tool}" is not in content/${pick.slug}.md`);
    }

    rows.push({ tool: pick.tool, trade: pick.trade, slug: pick.slug, row });
  }

  return rows;
}
