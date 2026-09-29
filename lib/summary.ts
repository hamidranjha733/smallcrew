import { getCategoryBody, type Page, type Tool, type Trade } from './content';

// The homepage summary table. Each row names the guide it is taken from, and
// the cells are read straight out of that guide's frontmatter, so the homepage
// can never disagree with the page it links to and no new price is authored.

export type SummaryRow = {
  tool: string;
  trade: string;
  /** Where the row links, which is the page the figures were read from. */
  href: string;
  row: Tool;
};

// A pick names either a guide slug or a trade whose category page carries its
// own priced table. Either way the cells come from that page's frontmatter, so
// the homepage cannot disagree with the page it links to.
type Pick = { tool: string; trade: string } & (
  | { slug: string; category?: never }
  | { category: Trade; slug?: never }
);

const PICKS: Pick[] = [
  { tool: 'Connecteam', trade: 'All trades', slug: 'best-software-for-cleaning-business' },
  { tool: 'Swept', trade: 'Commercial cleaning', slug: 'best-software-for-cleaning-business' },
  { tool: 'ZenMaid', trade: 'Cleaning', slug: 'best-software-for-cleaning-business' },
  { tool: 'Launch27', trade: 'Cleaning', slug: 'best-software-for-cleaning-business' },
  { tool: 'Housecall Pro', trade: 'Cleaning', slug: 'best-software-for-cleaning-business' },
  { tool: 'LawnPro', trade: 'Lawn care', category: 'lawn-care' },
  { tool: 'GorillaDesk', trade: 'Pest control', category: 'pest-control' },
  { tool: 'Arborgold', trade: 'Lawn care', category: 'lawn-care' },
  { tool: 'Jobber', trade: 'All trades', slug: 'best-software-for-cleaning-business' },
];

export async function getSummaryRows(pages: Page[]): Promise<SummaryRow[]> {
  const rows: SummaryRow[] = [];

  for (const pick of PICKS) {
    let tools: Tool[];
    let href: string;
    let source: string;

    if (pick.category) {
      const body = await getCategoryBody(pick.category);
      if (!body) {
        throw new Error(`Summary row points at a category with no body: ${pick.category}`);
      }
      tools = body.tools;
      href = `/${pick.category}/`;
      source = `content/category/${pick.category}.md`;
    } else {
      const page = pages.find((item) => item.slug === pick.slug);
      if (!page) throw new Error(`Summary row points at a missing guide: ${pick.slug}`);
      tools = page.tools;
      href = `/${pick.slug}/`;
      source = `content/${pick.slug}.md`;
    }

    const row = tools.find((tool) => tool.tool === pick.tool);
    if (!row) throw new Error(`Summary row "${pick.tool}" is not in ${source}`);

    rows.push({ tool: pick.tool, trade: pick.trade, href, row });
  }

  return rows;
}
