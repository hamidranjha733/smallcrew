// Reports which vendor prices a fetch can verify, and which it cannot.
//
//   node scripts/check-prices.mjs
//
// This script does not drive pricing calculators and will not be made to. Two
// vendors were published wrong on the same day because their prices are
// computed in JavaScript and never appear in the HTML a fetch returns. A
// checker that half works on those pages is how that happened: it returns
// green, and the green is meaningless.
//
// So the rule here is that a vendor marked pricingIsDynamic in
// data/prices.json cannot be checked by this script at all, and the script says
// so loudly rather than skipping it quietly. Those vendors need a person with a
// browser who moves the control.
//
// Exits non zero if any dynamic vendor is overdue, so it can gate a deploy.

import fs from 'node:fs';

const MAX_AGE_DAYS = 120;

const data = JSON.parse(fs.readFileSync('data/prices.json', 'utf8'));
const observations = data.observations ?? [];

// Latest reading per vendor.
const latest = new Map();
for (const o of observations) {
  const prev = latest.get(o.vendor);
  if (!prev || o.readOn > prev.readOn) latest.set(o.vendor, o);
}

const today = new Date();
// Clamped at zero: readings are dated in local time and 'today' is UTC here,
// so a reading made this evening can otherwise report as minus one day old.
const ageDays = (iso) => Math.max(0, Math.floor((today - new Date(iso)) / 86400000));

const dynamic = [];
const fetchable = [];
for (const o of latest.values()) (o.pricingIsDynamic ? dynamic : fetchable).push(o);

const bar = '='.repeat(72);

console.log(bar);
console.log('PRICES THIS SCRIPT CANNOT CHECK. A HUMAN WITH A BROWSER MUST.');
console.log(bar);

if (dynamic.length === 0) {
  console.log('  none recorded');
} else {
  for (const o of dynamic.sort((a, b) => a.readOn.localeCompare(b.readOn))) {
    const age = ageDays(o.readOn);
    console.log(`\n  ${o.vendor}`);
    console.log(`    ${o.source}`);
    console.log(`    last read by hand ${o.readOn}, ${age} days ago`);
    console.log(`    why: ${o.model.split('.')[0]}.`);
    if (o.attachedTo) console.log(`    the figure is: ${o.attachedTo}`);
    console.log(
      '    The figures are computed in the page and are absent from the HTML,',
    );
    console.log('    so fetching this url proves nothing. Open it and move the control.');
  }
}

console.log(`\n${bar}`);
console.log('PRICES A FETCH CAN AT LEAST SEE');
console.log(bar);
for (const o of fetchable.sort((a, b) => a.vendor.localeCompare(b.vendor))) {
  console.log(`  ${o.vendor.padEnd(12)} ${o.readOn}  ${o.source}`);
  if (o.attachedTo) console.log(`${' '.repeat(16)}${o.attachedTo}`);
}

// A value with nothing saying what it is a price for cannot be checked by
// anyone later. Three vendors were published wrong exactly this way.
const unattached = [...latest.values()].filter((o) => !o.attachedTo);
if (unattached.length > 0) {
  console.log(`\n${bar}`);
  console.log('RECORDED WITHOUT SAYING WHAT THE FIGURE IS ATTACHED TO');
  console.log(bar);
  console.log('  ' + unattached.map((o) => o.vendor).join('\n  '));
}

// Vendors the site prices but the log has never recorded at all.
const priced = new Set();
for (const dir of ['content', 'content/category']) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter((n) => n.endsWith('.md'))) {
    const src = fs.readFileSync(`${dir}/${file}`, 'utf8');
    for (const m of src.matchAll(/^ {2}- tool: (.+)$/gm)) priced.add(m[1].trim());
  }
}
const unlogged = [...priced].filter((v) => !latest.has(v)).sort();
if (unlogged.length > 0) {
  console.log(`\n${bar}`);
  console.log('PRICED ON THE SITE, NEVER RECORDED HERE');
  console.log(bar);
  console.log('  ' + unlogged.join('\n  '));
  console.log('\n  These carry whatever date their page states and nothing in this log.');
}

const overdue = dynamic.filter((o) => ageDays(o.readOn) > MAX_AGE_DAYS);
console.log();
if (overdue.length > 0) {
  console.log(
    `FAIL: ${overdue.map((o) => o.vendor).join(', ')} last read by hand more than ${MAX_AGE_DAYS} days ago.`,
  );
  process.exit(1);
}
console.log(`OK: every dynamically priced vendor read by hand within ${MAX_AGE_DAYS} days.`);
