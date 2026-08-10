import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type Tool = {
  tool: string;
  bestFor: string;
  solo: string;
  crew3: string;
  crew10: string;
  watch: string;
  url: string;
};

export type Heading = {
  id: string;
  text: string;
};

export type PageMeta = {
  title: string;
  standfirst: string;
  keyword: string;
  volume: number;
  pricesChecked: string;
  toolsCompared: number;
  tools: Tool[];
};

export type Page = PageMeta & {
  slug: string;
  html: string;
  headings: Heading[];
};

function readSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}

// Affiliate and vendor links must carry the disclosure attributes. Rather than
// hand writing anchor tags in every markdown file, every link that points off
// site is rewritten here.
function markExternalLinks(html: string): string {
  return html.replace(/<a href="(https?:\/\/[^"]+)"/g, (_match, href: string) => {
    return `<a href="${href}" rel="nofollow sponsored noopener" target="_blank"`;
  });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Section headings get stable ids so the table of contents can link to them.
function addHeadingIds(html: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const seen = new Set<string>();

  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_match, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    let id = slugify(text);
    let n = 2;
    while (seen.has(id)) id = `${slugify(text)}-${n++}`;
    seen.add(id);
    headings.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  return { html: out, headings };
}

async function renderMarkdown(body: string): Promise<{ html: string; headings: Heading[] }> {
  const processed = await remark().use(remarkHtml, { sanitize: false }).process(body);
  return addHeadingIds(markExternalLinks(processed.toString()));
}

function assertMeta(slug: string, data: Record<string, unknown>): PageMeta {
  const required = [
    'title',
    'standfirst',
    'keyword',
    'volume',
    'pricesChecked',
    'toolsCompared',
    'tools',
  ];

  for (const key of required) {
    if (data[key] === undefined || data[key] === null || data[key] === '') {
      throw new Error(`content/${slug}.md is missing the "${key}" field.`);
    }
  }

  const tools = data.tools as Tool[];

  if (!Array.isArray(tools) || tools.length === 0) {
    throw new Error(`content/${slug}.md must list at least one tool.`);
  }

  // No price ships undated. This is the rule the whole site rests on, so the
  // build fails rather than publishing a table without a verification month.
  if (!/^[A-Z][a-z]+ \d{4}$/.test(String(data.pricesChecked))) {
    throw new Error(
      `content/${slug}.md has an invalid pricesChecked value. Use a month and year, for example "August 2026".`,
    );
  }

  return {
    title: String(data.title),
    standfirst: String(data.standfirst),
    keyword: String(data.keyword),
    volume: Number(data.volume),
    pricesChecked: String(data.pricesChecked),
    toolsCompared: Number(data.toolsCompared),
    tools,
  };
}

export type Trade = 'cleaning' | 'lawn-care' | 'pest-control';

export const TRADE_LABELS: Record<Trade, string> = {
  cleaning: 'Cleaning',
  'lawn-care': 'Lawn care',
  'pest-control': 'Pest control',
};

// Trade is derived from the slug rather than stored in frontmatter, which keeps
// the frontmatter schema to the seven documented keys.
export function getTrade(slug: string): Trade {
  if (slug.includes('pest')) return 'pest-control';
  if (slug.includes('lawn')) return 'lawn-care';
  return 'cleaning';
}

export function getSlugs(): string[] {
  return readSlugs();
}

export async function getPage(slug: string): Promise<Page> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const meta = assertMeta(slug, data as Record<string, unknown>);
  const { html, headings } = await renderMarkdown(content);

  return { ...meta, slug, html, headings };
}

export async function getAllPages(): Promise<Page[]> {
  const pages = await Promise.all(readSlugs().map((slug) => getPage(slug)));
  // Highest search volume first, so the homepage leads with the pages that
  // carry the most commercial weight.
  return pages.sort((a, b) => b.volume - a.volume || a.title.localeCompare(b.title));
}

// Only cells holding an actual dollar figure are comparable. Quote only,
// Could not confirm and Not published are deliberately excluded.
export function parsePrice(value: string): number | null {
  const match = /^\$([0-9,]+)$/.exec(value.trim());
  if (!match) return null;
  return Number(match[1].replace(/,/g, ''));
}

export type Extreme = {
  tool: string;
  price: number;
  slug: string;
  title: string;
  bestFor: string;
  watch: string;
  url: string;
};

export type Extremes = {
  cheapest: Extreme;
  dearest: Extreme;
  priced: number;
  total: number;
};

// The spread across the whole site at a crew of ten, which is the number that
// makes the case for reading any of this.
export function getExtremes(pages: Page[]): Extremes | null {
  const rows: Extreme[] = [];
  let total = 0;

  for (const page of pages) {
    for (const tool of page.tools) {
      total++;
      const price = parsePrice(tool.crew10);
      if (price === null) continue;
      rows.push({
        tool: tool.tool,
        price,
        slug: page.slug,
        title: page.title,
        bestFor: tool.bestFor,
        watch: tool.watch,
        url: tool.url,
      });
    }
  }

  if (rows.length === 0) return null;

  // Free tools are real but they make a dishonest headline, because nothing
  // that costs nothing is competing with the paid tools on capability.
  const paid = rows.filter((row) => row.price > 0);
  const pool = paid.length > 0 ? paid : rows;

  const cheapest = pool.reduce((a, b) => (b.price < a.price ? b : a));
  const dearest = pool.reduce((a, b) => (b.price > a.price ? b : a));

  return { cheapest, dearest, priced: rows.length, total };
}
