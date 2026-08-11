import type { Tool } from './content';

// Everything here is derived from the three figures already in frontmatter.
// Nothing invents a price: where a vendor's model is not a simple base plus per
// seat rate, the calculator falls back to the published band rather than
// interpolating a number no vendor has ever quoted.

export type PriceModel =
  | { kind: 'flat'; value: number }
  | { kind: 'linear'; base: number; rate: number }
  | { kind: 'banded'; solo: number | null; crew3: number | null; crew10: number | null }
  | { kind: 'unpriced'; label: string };

export function parseMoney(value: string): number | null {
  const match = /^\$([0-9,]+)$/.exec(value.trim());
  if (!match) return null;
  return Number(match[1].replace(/,/g, ''));
}

export function deriveModel(tool: Tool): PriceModel {
  const solo = parseMoney(tool.solo);
  const crew3 = parseMoney(tool.crew3);
  const crew10 = parseMoney(tool.crew10);

  // Nothing numeric at all. Keep the vendor's own label.
  if (solo === null && crew3 === null && crew10 === null) {
    return { kind: 'unpriced', label: tool.solo };
  }

  if (solo !== null && crew3 !== null && crew10 !== null) {
    if (solo === crew3 && crew3 === crew10) {
      return { kind: 'flat', value: solo };
    }

    // A base plus a per seat rate fits all three points exactly.
    const rate = (crew10 - crew3) / 7;
    if (Number.isInteger(rate) && Math.abs(solo + 2 * rate - crew3) < 0.01) {
      return { kind: 'linear', base: solo, rate };
    }
  }

  // Banded or per schedule pricing. Report the published band, never a
  // number between two of them.
  return { kind: 'banded', solo, crew3, crew10 };
}

export type Computed = {
  text: string;
  /** True when the figure is calculated or published for exactly this size. */
  exact: boolean;
};

export function costAt(tool: Tool, crew: number): Computed {
  const model = deriveModel(tool);
  const size = Math.min(20, Math.max(1, Math.round(crew)));

  if (model.kind === 'unpriced') {
    return { text: model.label, exact: false };
  }

  if (model.kind === 'flat') {
    return { text: `$${model.value.toLocaleString('en-US')}`, exact: true };
  }

  if (model.kind === 'linear') {
    const total = model.base + (size - 1) * model.rate;
    return { text: `$${total.toLocaleString('en-US')}`, exact: true };
  }

  // Banded: use the published figure for the band this crew size falls in.
  // At exactly one, three or ten that figure is the vendor published price,
  // so it is not flagged as a band.
  const band = size <= 1 ? model.solo : size <= 3 ? model.crew3 : model.crew10;
  const label = size <= 1 ? tool.solo : size <= 3 ? tool.crew3 : tool.crew10;
  const onPublishedPoint = size === 1 || size === 3 || size === 10;

  if (band === null) return { text: label, exact: false };
  return { text: `$${band.toLocaleString('en-US')}`, exact: onPublishedPoint };
}

// ---------- pricing transparency verdict ----------

export type BadgeKind = 'published' | 'quote' | 'unpublished';

export const BADGE_LABEL: Record<BadgeKind, string> = {
  published: 'Published',
  quote: 'Quote only',
  unpublished: 'Not published',
};

export function getBadge(tool: Tool): BadgeKind {
  const cells = [tool.solo, tool.crew3, tool.crew10];

  if (cells.some((cell) => /quote only/i.test(cell))) return 'quote';
  if (cells.some((cell) => parseMoney(cell) !== null)) return 'published';
  return 'unpublished';
}

export function badgeSummary(tools: Tool[]) {
  const published: Tool[] = [];
  const quote: Tool[] = [];
  const unpublished: Tool[] = [];

  for (const tool of tools) {
    const kind = getBadge(tool);
    const bucket = kind === 'published' ? published : kind === 'quote' ? quote : unpublished;
    if (!bucket.some((entry) => entry.tool === tool.tool)) bucket.push(tool);
  }

  return { published, quote, unpublished };
}
