// Re verification pass, vendor pricing pages read 24 August 2026.
//
// Four vendors moved or were mis read in the first pass:
//
//   Jobber         Connect is banded as well as per seat. The ten user band is
//                  $299, so the old $400 (one user plan plus nine seats) was
//                  the most expensive path, not the cheapest.
//   Housecall Pro  seat counts and extra seat prices are now on the page, so
//                  the two Not published cells can be filled.
//   Arborgold      $129 is the annual rate. This site quotes monthly billing,
//                  which is $149.
//   ZenMaid        figure unchanged, but the $19 Starter tier now needs naming
//                  and excluding explicitly rather than being passed over.
//
// Run: node scripts/reverify-2026-08-24.mjs

import fs from 'node:fs';
import path from 'node:path';

const DIR = 'content';

const VENDORS = {
  Jobber: {
    solo: '$139',
    crew3: '$197',
    crew10: '$299',
    watch:
      'Connect is banded as well as per seat, so ten users is $299 on the ten user band, not the $400 that adding nine seats to the one user plan costs',
  },
  'Housecall Pro': {
    solo: '$79',
    crew3: '$189',
    crew10: '$479',
    watch:
      'Basic covers one user only, so a crew needs Essentials at $189. At ten, MAX plus two seats is $479 against $689 on Essentials plus five, so the dearer tier is cheaper',
  },
  Arborgold: {
    solo: '$149',
    watch:
      'The $129 headline is the annual rate. Paying monthly is $149, and office and mobile licences are still quoted separately',
  },
  ZenMaid: {
    watch:
      'Starter at $19 has no booking form and caps you at forty appointments a month, so Pro at $39 is the real entry price',
  },
};

let entries = 0;
let files = 0;

for (const name of fs.readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  const file = path.join(DIR, name);
  const lines = fs.readFileSync(file, 'utf8').split('\n');

  let fence = 0;
  let current = null;
  let touched = false;

  const out = lines.map((line) => {
    if (line === '---') {
      fence++;
      if (fence === 2) current = null;
      return line;
    }
    if (fence !== 1) return line;

    const tool = line.match(/^ {2}- tool: (.+)$/);
    if (tool) {
      current = VENDORS[tool[1].trim()] ? tool[1].trim() : null;
      if (current) {
        entries++;
        touched = true;
      }
      return line;
    }
    if (!current) return line;

    const field = line.match(/^ {4}(solo|crew3|crew10|watch): (.*)$/);
    if (!field) return line;

    const value = VENDORS[current][field[1]];
    if (value === undefined) return line;
    return `    ${field[1]}: ${/: /.test(value) ? JSON.stringify(value) : value}`;
  });

  if (touched) {
    fs.writeFileSync(file, out.join('\n'));
    files++;
  }
}

console.log(`Rewrote ${entries} tool entries across ${files} files.`);
