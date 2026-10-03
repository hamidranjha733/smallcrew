// Technical and on-page audit of the exported site.
//
// Run after `npx next build`:  node scripts/audit.mjs
// Exits non zero if anything fails, so it can gate a deploy.

import fs from 'node:fs';
import path from 'node:path';

const OUT = 'out';
const problems = [];
const notes = [];

// The canonical base url has one definition, in lib/site.ts. This script is
// plain node and cannot import a TypeScript module, so it reads the constant
// out of the source rather than holding a second copy of the hostname that
// could fall out of step with the one the site actually builds with.
const SITE_URL = (() => {
  const source = fs.readFileSync('lib/site.ts', 'utf8');
  const match = source.match(/export const SITE_URL = '([^']+)'/);
  if (!match) throw new Error('could not read SITE_URL out of lib/site.ts');
  return match[1];
})();

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

// Guides are every route that is not the homepage, a category, a standalone
// page or the 404. Only guides carry the sibling linking requirement.
const CATEGORY_ROUTES = ['/cleaning/', '/lawn-care/', '/pest-control/'];
const STANDALONE_ROUTES = ['/about/', '/contact/', '/privacy/', '/zenmaid-pricing/', '/arborgold-pricing/', '/service-autopilot-pricing/', '/janitorial-bidding-software/'];

const guideRoutes = [...routeSet].filter(
  (r) =>
    r !== '/' &&
    !isNotFound(r) &&
    !CATEGORY_ROUTES.includes(r) &&
    !STANDALONE_ROUTES.includes(r),
);
for (const route of guideRoutes) {
  const out = links.get(route) ?? new Set();
  const cat = [...out].filter((l) => CATEGORY_ROUTES.includes(l));
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

// lastmod and the dateModified in page schema are the same claim made twice.
// They drifted once already, when dateModified was corrected and lastmod was
// left dating every url to the price verification month, so both are now
// checked against the committed per page edit dates.
const pageDates = JSON.parse(fs.readFileSync('data/page-dates.json', 'utf8'));
const staleLastmod = [];
const missingFromMap = [];

for (let i = 0; i < locs.length; i++) {
  const route = locs[i].replace(SITE_URL, '');
  const real = pageDates[route];
  if (!real) {
    missingFromMap.push(route);
    continue;
  }
  if (lastmods[i].slice(0, 10) < real) {
    staleLastmod.push(`${route} lastmod ${lastmods[i].slice(0, 10)}, real edit ${real}`);
  }
}

if (missingFromMap.length > 0) {
  problems.push(
    `sitemap urls absent from data/page-dates.json, so undatable: ${missingFromMap.join(', ')}`,
  );
}
if (staleLastmod.length > 0) {
  problems.push(`sitemap lastmod older than the real edit: ${staleLastmod.join('; ')}`);
} else {
  notes.push(`every sitemap lastmod is at or after the page's real last edit`);
}

// The same date must reach the page itself, not just the sitemap.
const schemaDrift = [];
for (const page of pages) {
  if (isNotFound(page.route)) continue;
  const real = pageDates[page.route];
  if (!real) continue;
  for (const block of page.html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    let parsed;
    try {
      parsed = JSON.parse(block[1]);
    } catch {
      continue;
    }
    for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
      if (!node || !node.dateModified) continue;
      if (String(node.dateModified).slice(0, 10) < real) {
        schemaDrift.push(`${page.route} dateModified ${node.dateModified}, real edit ${real}`);
      }
    }
  }
}
if (schemaDrift.length > 0) {
  problems.push(`schema dateModified older than the real edit: ${schemaDrift.join('; ')}`);
}

// The site is live, so the audit asserts it is crawlable and that every
// hostname it advertises is the canonical one. A canonical tag on one host and
// a sitemap on another is worse than either alone, so these are checked in one
// place and both are failures.
const robots = fs.readFileSync(path.join(OUT, 'robots.txt'), 'utf8');
if (/^\s*Disallow:\s*\/\s*$/m.test(robots)) {
  problems.push('robots.txt still disallows all crawling');
}
if (!/^\s*Allow:\s*\/\s*$/m.test(robots)) {
  problems.push('robots.txt does not allow crawling');
}
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
  problems.push(`robots.txt does not point at ${SITE_URL}/sitemap.xml`);
} else {
  notes.push(`robots.txt allows all crawling and points at ${SITE_URL}/sitemap.xml`);
}

// The 404 is excluded because Next marks its own not found page noindex, which
// is right. A 404 in the index is a bug, not a page.
const indexable = pages.filter((p) => !isNotFound(p.route));
const blocked = indexable.filter((p) => /<meta name="robots" content="[^"]*noindex/.test(p.html));
if (blocked.length > 0) {
  problems.push(`pages still carrying noindex: ${blocked.map((p) => p.route).join(', ')}`);
} else {
  notes.push(`no noindex tag on any of the ${indexable.length} indexable pages, 404 excluded`);
}

// Hostname drift. Every absolute url this site prints about itself, in a
// canonical tag, an Open Graph url, a JSON-LD @id or the sitemap, must be on
// the canonical host. Anything else is a stale domain left behind by a move.
const CANONICAL_HOST = new URL(SITE_URL).host;
const offHost = new Set();
for (const loc of locs) {
  if (new URL(loc).host !== CANONICAL_HOST) offHost.add(new URL(loc).host);
}
for (const page of pages) {
  const own = page.html.matchAll(
    /(?:<link rel="canonical" href=|<meta property="og:url" content=|"@id":\s*|"url":\s*)"(https?:\/\/[^"]+)"/g,
  );
  for (const [, url] of own) {
    const host = new URL(url).host;
    // Vendor and affiliate urls are foreign by design. Only urls that claim to
    // be this site are checked, which is why the patterns above are specific.
    if (host !== CANONICAL_HOST) offHost.add(host);
  }
}
if (offHost.size > 0) {
  problems.push(
    `self referencing urls on a host other than ${CANONICAL_HOST}: ${[...offHost].join(', ')}`,
  );
} else {
  notes.push(`every self referencing url is on ${CANONICAL_HOST}`);
}

// ---------- share cards ----------
//
// Every page must advertise a card, the card must be absolute and on the
// canonical host, and the file must actually be in the export. A page that
// ships without one renders as a grey box everywhere it is shared, which is
// invisible from the html alone unless it is checked.
const noOgImage = [];
const badOgImage = [];
const noTwitter = [];
const missingCard = [];
const articleImageDrift = [];

for (const page of pages) {
  if (isNotFound(page.route)) continue;

  const image = pick(page.html, /<meta property="og:image" content="([^"]*)"/);
  const card = pick(page.html, /<meta name="twitter:card" content="([^"]*)"/);

  if (!image) {
    noOgImage.push(page.route);
  } else if (!image.startsWith(`${SITE_URL}/`)) {
    badOgImage.push(`${page.route} -> ${image}`);
  } else {
    const rel = image.slice(SITE_URL.length + 1);
    if (!fs.existsSync(path.join(OUT, rel))) missingCard.push(`${page.route} -> ${rel}`);
  }

  if (card !== 'summary_large_image') noTwitter.push(`${page.route} -> ${card ?? 'none'}`);

  for (const block of page.html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    let parsed;
    try {
      parsed = JSON.parse(block[1]);
    } catch {
      continue;
    }
    for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
      if (!node || node['@type'] !== 'Article') continue;
      if (node.image !== image) {
        articleImageDrift.push(`${page.route} Article image ${node.image ?? 'missing'}`);
      }
    }
  }
}

if (noOgImage.length > 0) problems.push(`pages with no og:image: ${noOgImage.join(', ')}`);
if (badOgImage.length > 0) {
  problems.push(`og:image not absolute on the canonical host: ${badOgImage.join(', ')}`);
}
if (missingCard.length > 0) {
  problems.push(`og:image points at a file not in the export: ${missingCard.join(', ')}`);
}
if (noTwitter.length > 0) {
  problems.push(`twitter:card is not summary_large_image: ${noTwitter.join(', ')}`);
}
if (articleImageDrift.length > 0) {
  problems.push(`Article image does not match og:image: ${articleImageDrift.join(', ')}`);
}
if (
  noOgImage.length + badOgImage.length + missingCard.length + noTwitter.length +
    articleImageDrift.length ===
  0
) {
  notes.push(`every page advertises a share card that exists in the export`);
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
