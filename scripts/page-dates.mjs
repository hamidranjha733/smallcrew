// Works out the real last edited date for every page, from git history, and
// writes it to data/page-dates.json for the build to read.
//
//   node scripts/page-dates.mjs
//
// Run it before deploying whenever content or page metadata changes, and commit
// the result. The build cannot compute this itself: deploys upload files rather
// than git history, so there is no log to read on the build machine.
//
// What counts as an edit, and what does not.
//
// dateModified is a claim about the content of a page, so it tracks the page's
// own source and its own title and description. It deliberately ignores site
// wide template, styling and component changes, because a byline added to every
// page at once does not make twenty two pages newly written, and a crawler
// reading a fresh date on unchanged prose is being misled.
//
// It also ignores the price verification month, which is a different fact with
// its own visible stamp on the page.

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const git = (cmd) => execSync(`git ${cmd}`, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

/** Commits touching a path, oldest first, as [sha, iso date]. */
function commits(file) {
  const out = git(`log --reverse --format="%H|%cI" -- "${file}"`).trim();
  if (!out) return [];
  return out.split('\n').map((line) => line.split('|'));
}

function fileAt(rev, file) {
  try {
    return git(`show ${rev}:${file}`);
  } catch {
    return null;
  }
}

const day = (iso) => iso.slice(0, 10);

/**
 * The date a slice of a file last changed, where the slice is picked out by a
 * function. Returns null if the extractor never matched.
 */
function lastChangeOf(file, extract) {
  let previous;
  let changed = null;

  for (const [sha, iso] of commits(file)) {
    const source = fileAt(sha, file);
    if (source === null) continue;
    const value = extract(source);
    if (value === null || value === undefined) continue;
    if (value !== previous) {
      changed = iso;
      previous = value;
    }
  }

  return changed;
}

// Pulls one entry's title and description out of lib/seo.ts. Matching on the
// key keeps each page independent, so retitling one page does not move the
// date on the other twenty one.
function seoEntry(key) {
  const quoted = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `(?:'${quoted}'|\\b${quoted}):\\s*\\{\\s*\\n\\s*keyword:[^\\n]*\\n\\s*title:\\s*'([^']*)',\\s*\\n\\s*description:\\s*\\n?\\s*'([^']*)'`,
  );
  return (source) => {
    const m = source.match(re);
    return m ? `${m[1]}|${m[2]}` : null;
  };
}

const homeSeo = (source) => {
  const m = source.match(
    /HOME_SEO: Seo = \{\s*\n\s*keyword:[^\n]*\n\s*title:\s*'([^']*)',\s*\n\s*description:\s*\n?\s*'([^']*)'/,
  );
  return m ? `${m[1]}|${m[2]}` : null;
};

// The authored prose for one trade in lib/trades.ts: headline, standfirst,
// intro and pull quote.
function tradeBlock(trade) {
  const re = new RegExp(`trade: '${trade}',([\\s\\S]*?)\\n  \\},`);
  return (source) => {
    const m = source.match(re);
    return m ? m[1].replace(/\s+/g, ' ') : null;
  };
}

const latest = (...dates) => {
  const real = dates.filter(Boolean).sort();
  return real.length ? real[real.length - 1] : null;
};

// ---------- work out every route ----------

const CONTENT = 'content';
const slugs = fs
  .readdirSync(CONTENT)
  .filter((n) => n.endsWith('.md'))
  .map((n) => n.replace(/\.md$/, ''));

const TRADES = ['cleaning', 'lawn-care', 'pest-control'];

const dates = {};
const sources = {};

for (const slug of slugs) {
  const file = `content/${slug}.md`;
  const content = lastChangeOf(file, (s) => s);
  const seo = lastChangeOf('lib/seo.ts', seoEntry(slug));
  dates[`/${slug}/`] = day(latest(content, seo));
  sources[`/${slug}/`] = { content: content && day(content), seo: seo && day(seo) };
}

for (const trade of TRADES) {
  const bodyFile = `content/category/${trade}.md`;
  const body = fs.existsSync(bodyFile) ? lastChangeOf(bodyFile, (s) => s) : null;
  const prose = lastChangeOf('lib/trades.ts', tradeBlock(trade));
  const seo = lastChangeOf('lib/seo.ts', seoEntry(trade));
  dates[`/${trade}/`] = day(latest(body, prose, seo));
  sources[`/${trade}/`] = {
    body: body && day(body),
    prose: prose && day(prose),
    seo: seo && day(seo),
  };
}

const homePage = lastChangeOf('app/page.tsx', (s) => s);
const homeMeta = lastChangeOf('lib/seo.ts', homeSeo);
dates['/'] = day(latest(homePage, homeMeta));

// Standalone pages: their own route file plus their own SEO entry.
//
// Local date rather than UTC. git dates carry their own offset, so slicing one
// already gives the day it was committed where it was committed, and a UTC
// today would disagree with them by a day for anyone east of Greenwich.
const now = new Date();
const TODAY = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, '0'),
  String(now.getDate()).padStart(2, '0'),
].join('-');
for (const key of ['about', 'contact', 'privacy', 'zenmaid-pricing']) {
  const page = lastChangeOf(`app/${key}/page.tsx`, (s) => s);
  const meta = lastChangeOf('lib/seo.ts', seoEntry(key));
  const when = latest(page, meta);
  // A page added in the working tree has no commit yet, so it is dated today.
  dates[`/${key}/`] = when ? day(when) : TODAY;
}

// Existing dates are authoritative. git cannot tell a rewritten page from a
// route file touched by a refactor, and it reads only committed state, so
// recomputing freely moves dates that nothing published changed. A metadata
// pass that touches all nine route files must not restamp nine pages as
// rewritten today.
//
// So: new routes are added, existing ones are left alone, and moving one is a
// deliberate act.
//
//   node scripts/page-dates.mjs                       add new routes only
//   node scripts/page-dates.mjs --refresh /a/ /b/     also move these
//   node scripts/page-dates.mjs --refresh-all         move everything git says

const argv = process.argv.slice(2);
const refreshAll = argv.includes('--refresh-all');
const refresh = new Set(argv.filter((a) => a.startsWith('/')));

const DATES_FILE = path.join('data', 'page-dates.json');
const existing = fs.existsSync(DATES_FILE)
  ? JSON.parse(fs.readFileSync(DATES_FILE, 'utf8'))
  : {};

const final = {};
const added = [];
const moved = [];
const held = [];

for (const [route, computed] of Object.entries(dates)) {
  const current = existing[route];
  if (!current) {
    final[route] = computed;
    added.push(`${route} -> ${computed}`);
  } else if (refreshAll || refresh.has(route)) {
    // A deliberate refresh dates the page today, because the edit being
    // recorded is the uncommitted one in the working tree.
    final[route] = TODAY;
    if (TODAY !== current) moved.push(`${route} ${current} -> ${TODAY}`);
    else final[route] = current;
  } else {
    final[route] = current;
    if (computed !== current) held.push(`${route} held at ${current}, git says ${computed}`);
  }
}

// A route that disappeared from the site keeps no date.
for (const route of Object.keys(existing)) {
  if (!(route in dates)) console.log(`dropped  ${route}`);
}

const ordered = Object.fromEntries(Object.entries(final).sort(([a], [b]) => a.localeCompare(b)));

fs.mkdirSync('data', { recursive: true });
fs.writeFileSync(DATES_FILE, JSON.stringify(ordered, null, 2) + '\n');

if (added.length) console.log('\nadded:\n  ' + added.join('\n  '));
if (moved.length) console.log('\nmoved:\n  ' + moved.join('\n  '));
if (held.length) {
  console.log('\nheld (pass --refresh <route> if the content really changed):\n  ' + held.join('\n  '));
}

for (const [route, date] of Object.entries(ordered)) {
  const why = sources[route];
  const detail = why
    ? '  ' +
      Object.entries(why)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k} ${v}`)
        .join('  ')
    : '';
  console.log(`${date}  ${route.padEnd(44)}${detail}`);
}
console.log(`\n${Object.keys(ordered).length} routes written to data/page-dates.json`);
