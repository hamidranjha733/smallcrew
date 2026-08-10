// Technical and on-page audit of the exported site.
//
// Run after `npx next build`:  node scripts/audit.mjs
// Exits non zero if anything fails, so it can gate a deploy.

import fs from 'node:fs';
import path from 'node:path';

const OUT = 'out';
const problems = [];
const notes = [];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '_next') walk(p, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(p);
    }
  }
  return files;
}

const files = walk(OUT).sort();
const routeOf = (file) => '/' + path.relative(OUT, file).replace(/index\.html$/, '');

const NOT_FOUND = '/404/';
const isNotFound = (route) => route === '/404/' || route === '/404.html' || route === '/404';

// Next exports the 404 twice, as /404.html and /404/index.html. They are the
// same page, so the audit keeps one and ignores the duplicate.
const pages = files
  .map((file) => ({ file, route: routeOf(file), html: fs.readFileSync(file, 'utf8') }))
  .filter((page) => page.route !== '/404.html');

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};

// ---------- per page checks ----------
const titles = new Map();
const descriptions = new Map();
const rows = [];

for (const page of pages) {
  const { route, html } = page;
  const is404 = isNotFound(route);

  const title = pick(html, /<title>([^<]*)<\/title>/);
  const desc = pick(html, /<meta name="description" content="([^"]*)"/);
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);
  const ogTitle = pick(html, /<meta property="og:title" content="([^"]*)"/);
  const twitter = pick(html, /<meta name="twitter:card" content="([^"]*)"/);

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1s.length !== 1) problems.push(`${route}: ${h1s.length} h1 elements, expected exactly 1`);

  if (!title) problems.push(`${route}: no title tag`);
  if (title && title.length > 60) problems.push(`${route}: title ${title.length} chars (max 60)`);
  if (!desc) problems.push(`${route}: no meta description`);
  if (!is404 && desc && (desc.length < 140 || desc.length > 160)) {
    problems.push(`${route}: description ${desc.length} chars (want 140 to 160)`);
  }
  if (!canonical) problems.push(`${route}: no canonical`);
  if (!is404 && !ogTitle) problems.push(`${route}: no Open Graph tags`);
  if (!is404 && !twitter) problems.push(`${route}: no Twitter card`);

  if (title) {
    if (titles.has(title)) problems.push(`${route}: duplicate title, shared with ${titles.get(title)}`);
    else titles.set(title, route);
  }
  if (desc) {
    if (descriptions.has(desc)) {
      problems.push(`${route}: duplicate description, shared with ${descriptions.get(desc)}`);
    } else descriptions.set(desc, route);
  }

  // canonical must point at itself
  if (canonical && !is404) {
    const want = route.endsWith('/') ? route : `${route}/`;
    if (!canonical.endsWith(want)) {
      problems.push(`${route}: canonical points at ${canonical}, not itself`);
    }
  }

  // heading order must not skip a level
  const headings = [...html.matchAll(/<h([1-6])[^>]*>/g)].map((m) => Number(m[1]));
  for (let i = 1; i < headings.length; i++) {
    if (headings[i] > headings[i - 1] + 1) {
      problems.push(`${route}: heading jumps from h${headings[i - 1]} to h${headings[i]}`);
      break;
    }
  }

  // images need alt text
  for (const img of html.matchAll(/<img[^>]*>/g)) {
    const tag = img[0];
    const alt = tag.match(/alt="([^"]*)"/);
    if (!alt || alt[1].trim() === '') problems.push(`${route}: image without alt text`);
  }

  // structured data must parse
  let blocks = 0;
  for (const m of html.matchAll(
    /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    const raw = m[1].replace(/\\u003c/g, '<');
    try {
      const parsed = JSON.parse(raw);
      blocks += Array.isArray(parsed) ? parsed.length : 1;
    } catch (err) {
      problems.push(`${route}: JSON-LD failed to parse (${err.message})`);
    }
  }

  const types = [...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]);
  rows.push({ route, title, desc, canonical, jsonLd: blocks, types: [...new Set(types)] });
}

// ---------- link graph ----------
const routeSet = new Set(pages.map((p) => p.route));
const links = new Map();

for (const page of pages) {
  const set = new Set();
  for (const m of page.html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (href.startsWith('/_next') || href.startsWith('/logos')) continue;
    set.add(href);
    if (!routeSet.has(href) && !fs.existsSync(path.join(OUT, href))) {
      problems.push(`${page.route}: broken internal link to ${href}`);
    }
  }
  links.set(page.route, set);
}

// click depth from the homepage
const depth = new Map([['/', 0]]);
const queue = ['/'];
while (queue.length) {
  const current = queue.shift();
  for (const next of links.get(current) ?? []) {
    if (!routeSet.has(next) || depth.has(next)) continue;
    depth.set(next, depth.get(current) + 1);
    queue.push(next);
  }
}

const orphans = [];
for (const route of routeSet) {
  if (isNotFound(route)) continue;
  if (!depth.has(route)) orphans.push(route);
  else if (depth.get(route) > 2) {
    problems.push(`${route}: ${depth.get(route)} clicks from the homepage, max 2`);
  }
}
if (orphans.length) problems.push(`orphan pages: ${orphans.join(', ')}`);
else notes.push('no orphan pages');

// guides must link to category, 3 siblings and (cleaning only) the homepage
const guideRoutes = [...routeSet].filter(
  (r) =>
    r !== '/' &&
    !isNotFound(r) &&
    !['/cleaning/', '/lawn-care/', '/pest-control/'].includes(r),
);
for (const route of guideRoutes) {
  const out = links.get(route) ?? new Set();
  const cat = [...out].filter((l) => ['/cleaning/', '/lawn-care/', '/pest-control/'].includes(l));
  if (cat.length === 0) problems.push(`${route}: does not link to its category page`);
  const siblings = [...out].filter((l) => guideRoutes.includes(l) && l !== route);
  if (siblings.length < 3) {
    problems.push(`${route}: links to only ${siblings.length} sibling guides, need 3`);
  }
}

// ---------- sitemap and robots ----------
const sitemap = fs.readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
const lastmods = [...sitemap.matchAll(/<lastmod>([^<]*)<\/lastmod>/g)].map((m) => m[1]);
const expected = [...routeSet].filter((r) => !isNotFound(r)).length;
if (locs.length !== expected) {
  problems.push(`sitemap lists ${locs.length} urls, site has ${expected} indexable pages`);
}
if (lastmods.length !== locs.length) {
  problems.push(`sitemap has ${lastmods.length} lastmod values for ${locs.length} urls`);
}

// PRE LAUNCH: the site is deliberately blocked from search engines, so the
// audit asserts the block is intact rather than asserting it is crawlable.
// REVERSE THIS BEFORE LAUNCH, alongside app/robots.ts and app/layout.tsx.
const robots = fs.readFileSync(path.join(OUT, 'robots.txt'), 'utf8');
if (!/Disallow:\s*\/\s*$/m.test(robots)) {
  problems.push('robots.txt no longer disallows crawling (expected while pre launch)');
}
if (/Sitemap:/i.test(robots)) {
  problems.push('robots.txt still references the sitemap while the site is blocked');
}
notes.push('PRE LAUNCH: robots.txt disallows all crawling');

const unblocked = pages.filter(
  (p) => !/<meta name="robots" content="noindex[^"]*"/.test(p.html),
);
if (unblocked.length > 0) {
  problems.push(`pages missing the noindex tag: ${unblocked.map((p) => p.route).join(', ')}`);
} else {
  notes.push(`PRE LAUNCH: noindex, nofollow on all ${pages.length} pages`);
}

// 404 must link back into the site
const notFound = pages.find((p) => isNotFound(p.route));
if (!notFound) problems.push('no 404 page exported');
else if ((links.get(notFound.route) ?? new Set()).size < 3) {
  problems.push('404 page does not link back into the site');
} else {
  notes.push(`404 page links back to ${links.get(notFound.route).size} routes`);
}
void NOT_FOUND;

// ---------- semantic coverage ----------
const TERMS = [
  'cleaning service scheduling software',
  'cleaning service software',
  'cleaning company software',
  'maid service software',
  'house cleaning software',
  'residential cleaning software',
  'cleaning management system',
  'software for cleaning companies',
  'cleaning services staffing software',
  'cleaning quote software',
  'maid service scheduling software',
  'cleaning management software',
  'software for house cleaning business',
];
const corpus = pages.map((p) => p.html.replace(/<[^>]+>/g, ' ').toLowerCase()).join(' ');
const missing = TERMS.filter((t) => !corpus.includes(t));
if (missing.length) problems.push(`semantic terms not covered: ${missing.join('; ')}`);
notes.push(`semantic terms covered: ${TERMS.length - missing.length}/${TERMS.length}`);

// ---------- report ----------
console.log('PAGE INVENTORY');
console.log('route | title chars | desc chars | jsonld blocks | schema types');
for (const r of rows.sort((a, b) => a.route.localeCompare(b.route))) {
  console.log(
    [r.route, r.title?.length ?? 0, r.desc?.length ?? 0, r.jsonLd, r.types.join('+')].join(' | '),
  );
}

console.log('\nDEPTH FROM HOMEPAGE');
const byDepth = {};
for (const [route, d] of depth) byDepth[d] = (byDepth[d] ?? 0) + 1;
console.log(Object.entries(byDepth).map(([d, n]) => `${d} clicks: ${n} pages`).join(', '));

console.log('\nNOTES');
notes.forEach((n) => console.log('  ' + n));

console.log('\nRESULT');
if (problems.length === 0) {
  console.log(`  PASS. ${pages.length} pages audited, no problems.`);
} else {
  console.log(`  ${problems.length} PROBLEM(S):`);
  problems.forEach((p) => console.log('   - ' + p));
  process.exitCode = 1;
}
