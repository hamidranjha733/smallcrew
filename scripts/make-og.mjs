// Draws one share card per route into public/og.
//
//   node scripts/make-og.mjs
//
// Run it when a page title changes, and commit the result. The cards are
// static files because next.config sets output: 'export': a route handler
// reading ?title= has nothing to read it with once the site is a folder of
// files, and the build refuses it outright.
//
// Titles are read out of lib/seo.ts, which is the one place they are defined,
// so a card can never show a title the page does not have.

import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og.js';
import { ogCard, OG_HEIGHT, OG_WIDTH } from './og-card.mjs';

const FONT_DIR = path.join(process.cwd(), 'assets', 'fonts');
const OUT_DIR = path.join(process.cwd(), 'public', 'og');

const fonts = [
  { name: 'Archivo', file: 'Archivo-Regular.ttf', weight: 400, style: 'normal' },
  { name: 'Archivo', file: 'Archivo-Bold.ttf', weight: 700, style: 'normal' },
  { name: 'IBMPlexMono', file: 'IBMPlexMono-Regular.ttf', weight: 400, style: 'normal' },
].map(({ file, ...rest }) => ({ ...rest, data: fs.readFileSync(path.join(FONT_DIR, file)) }));

// ---------- read every title out of lib/seo.ts ----------

const seo = fs.readFileSync('lib/seo.ts', 'utf8');

/** Same rule as ogSlug in lib/og.ts. The audit fails if the two disagree. */
const slugFor = (route) => route.replace(/^\/+|\/+$/g, '') || 'home';

/** Same rule as ogTitle in lib/og.ts. */
const strip = (title) => title.replace(/\s*[|–—-]\s*Small Crew\s*$/i, '').trim();

function titlesIn(block) {
  const out = [];
  const re = /(?:'([^']+)'|([a-zA-Z][\w-]*)):\s*\{\s*\n\s*keyword:[^\n]*\n\s*title:\s*'([^']*)'/g;
  let m;
  while ((m = re.exec(block))) out.push([m[1] || m[2], m[3]]);
  return out;
}

function section(name) {
  const start = seo.indexOf(`export const ${name}: Record<string, Seo> = {`);
  if (start < 0) throw new Error(`${name} not found in lib/seo.ts`);
  const end = seo.indexOf('\n};', start);
  return seo.slice(start, end);
}

const routes = new Map();

const home = seo.match(/HOME_SEO: Seo = \{\s*\n\s*keyword:[^\n]*\n\s*title:\s*'([^']*)'/);
if (!home) throw new Error('HOME_SEO not found in lib/seo.ts');
routes.set('/', home[1]);

for (const [key, title] of titlesIn(section('PAGE_SEO'))) routes.set(`/${key}/`, title);
for (const [key, title] of titlesIn(section('CATEGORY_SEO'))) routes.set(`/${key}/`, title);
for (const [key, title] of titlesIn(section('GUIDE_SEO'))) routes.set(`/${key}/`, title);

// ---------- draw ----------

fs.mkdirSync(OUT_DIR, { recursive: true });

// Anything already in public/og that no longer corresponds to a route would be
// a card for a deleted page, still reachable and still wrong.
const expected = new Set([...routes.keys()].map((r) => `${slugFor(r)}.png`));
for (const file of fs.readdirSync(OUT_DIR)) {
  if (file.endsWith('.png') && !expected.has(file)) {
    fs.unlinkSync(path.join(OUT_DIR, file));
    console.log(`removed stale  ${file}`);
  }
}

let written = 0;
for (const [route, title] of routes) {
  const text = strip(title);
  const image = new ImageResponse(ogCard(text), {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts,
  });
  const buffer = Buffer.from(await image.arrayBuffer());
  const file = path.join(OUT_DIR, `${slugFor(route)}.png`);
  fs.writeFileSync(file, buffer);
  written++;
  console.log(`${String(Math.round(buffer.length / 1024)).padStart(4)}KB  ${slugFor(route)}.png  ${text}`);
}

console.log(`\n${written} cards written to public/og`);
