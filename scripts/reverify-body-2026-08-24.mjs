// Body copy pass for the 24 August 2026 re verification.
//
// The tables were corrected first. This brings the prose into line, because a
// page whose table says $299 and whose paragraph says $400 is worse than
// either number on its own.
//
// New figures, all read from vendor pages on 24 Aug 2026:
//   Jobber Connect   $139 / $197 / $299   banded, ten user band is $299
//                    annual $1,668 / $2,364 / $3,588
//   Housecall Pro    $79 / $189 / $479    annual $948 / $2,268 / $5,748
//   Arborgold        $149 monthly, $129 is the annual rate
//
// Run: node scripts/reverify-body-2026-08-24.mjs

import fs from 'node:fs';

const EDITS = [
  // ---- Jobber, the banded ten user price ----
  ['Ten users on Jobber Connect is $400 a month.', 'Ten users on Jobber Connect is $299 a month.'],
  [
    'Jobber Connect is $1,668 a year for one user and $4,800 for ten, and still needs an accounting package underneath it.',
    'Jobber Connect is $1,668 a year for one user and $3,588 for ten, and still needs an accounting package underneath it.',
  ],
  [
    'At $400 a month for ten users it is also the most expensive way on this page to produce an invoice.',
    'At $299 a month for ten users it is also the most expensive way on this page to produce an invoice.',
  ],
  ['Jobber over the same growth goes from $197 to $400, roughly double.', 'Jobber over the same growth goes from $197 to $299, about half again.'],
  [
    'A ten employee company pays $2,988 a year on LawnPro Plus and $4,800 on Jobber Connect, with Jobber Grow covering ten users at $4,128.',
    'A ten employee company pays $2,988 a year on LawnPro Plus and $3,588 on Jobber Connect.',
  ],
  [
    'At $400 a month on Connect you are paying for quoting depth that a fixed price recurring round does not use.',
    'At $299 a month on Connect you are paying for quoting depth that a fixed price recurring round does not use.',
  ],
  [
    'Note that Grow includes five users at $199, so ten users cost $344 on Grow against $400 on Connect.',
    'Note that Connect is banded, so ten users cost $299 on the ten user band against $400 if you add nine seats to the one user plan.',
  ],
  [
    'At ten users Jobber Connect is $400 and Jobber Grow is $344, because Grow includes five users in its base.',
    'At ten users Jobber Connect is $299 on its ten user band, cheaper than the $344 that Grow costs and cheaper than the $400 that adding nine seats costs.',
  ],
  [
    'Ten people working as four crews pay $2,988 on GorillaDesk against $4,800 on Jobber Connect, with Jobber Grow covering ten users at $4,128.',
    'Ten people working as four crews pay $2,988 on GorillaDesk against $3,588 on Jobber Connect.',
  ],
  [
    'Jobber charges per seat and reaches $400 a month at ten users, which is the figure that decides the question for most people.',
    'Jobber charges per seat but also bands, and reaches $299 a month at ten users, which is the figure that decides the question for most people.',
  ],
  ['Jobber is $400 a month on Connect at ten users.', 'Jobber is $299 a month on Connect at ten users.'],
  [
    "There is a wrinkle worth knowing. Jobber's Grow plan includes five users for $199 a month, so ten users on Grow costs $344 rather than the $400 that ten users on Connect costs. The higher tier is cheaper. Vendors rarely point this out.",
    'There is a wrinkle worth knowing. Connect is sold in bands as well as per seat. Ten users on the ten user band is $299, while adding nine seats to the one user plan is $400 and the Grow plan is $344. The cheapest of the three is the one the pricing page does not walk you to.',
  ],
  [
    'A ten cleaner company pays $468 on ZenMaid, $900 on Launch27, $4,800 on Jobber Connect and $4,128 on Jobber Grow.',
    'A ten cleaner company pays $468 on ZenMaid, $900 on Launch27, $5,748 on Housecall Pro MAX and $3,588 on Jobber Connect.',
  ],
  [
    "The difference between the cheapest and the most expensive is $4,332 a year, which is a used pressure washer, a month of one cleaner's wages, or the entire marketing budget of a small cleaning company.",
    "The difference between the cheapest and the most expensive is $5,280 a year, which is a used pressure washer, a month of one cleaner's wages, or the entire marketing budget of a small cleaning company.",
  ],
  [
    'At ten technicians working as four crews, which is the basis the table uses, GorillaDesk is $2,988 a year against $4,800 on Jobber Connect and $4,128 on Jobber Grow.',
    'At ten technicians working as four crews, which is the basis the table uses, GorillaDesk is $2,988 a year against $3,588 on Jobber Connect.',
  ],
  [
    'At that size you are paying $400 a month on Connect for features a $75 flat rate tool covers, and the honest comparison is $325 a month of quoting software.',
    'At that size you are paying $299 a month on Connect for features a $75 flat rate tool covers, and the honest comparison is $224 a month of quoting software.',
  ],
  ['Ten seats on Connect is $400 a month.', 'Ten users on Connect is $299 a month on its ten user band.'],
  [
    "Note that Jobber's Grow plan includes five users at $199, so ten users cost $344 on Grow against $400 on Connect.",
    'Note that Connect is banded, so ten users cost $299 on the ten user band rather than the $400 that adding nine seats to the one user plan costs.',
  ],
  ['Jobber is $400.', 'Jobber is $299.'],
  [
    'At ten cleaners it becomes $468, $900, $2,988 on GorillaDesk across four crews and $4,800 on Jobber Connect, with Jobber Grow at $4,128.',
    'At ten cleaners it becomes $468, $900, $2,988 on GorillaDesk across four crews and $3,588 on Jobber Connect.',
  ],
  [
    'The same company at ten cleaners is deciding between $468 and $4,800.',
    'The same company at ten cleaners is deciding between $468 and $3,588.',
  ],
  [
    'The usable tier is $139, and at ten users the Grow plan at $344 undercuts Connect at $400 despite being a higher tier.',
    'The usable tier is $139, and at ten users the Connect ten user band at $299 undercuts both the Grow plan at $344 and the $400 you pay by adding seats one at a time.',
  ],
  [
    'Launch27 is $75 a month flat for unlimited users and Jobber is $139 a month rising to $400 at ten users.',
    'Launch27 is $75 a month flat for unlimited users and Jobber is $139 a month rising to $299 at ten users.',
  ],
  [
    'Commercial cleaning is labour heavy by definition, and a contractor with ten cleaners servicing six buildings pays $400 a month on Connect for software whose customer count is six.',
    'Commercial cleaning is labour heavy by definition, and a contractor with ten cleaners servicing six buildings pays $299 a month on Connect for software whose customer count is six.',
  ],
  [
    'At ten cleaners the figures are nothing, $900 and $4,800, with Jobber Grow at $4,128.',
    'At ten cleaners the figures are nothing, $900 and $3,588.',
  ],
  [
    'It is priced per person and structured around the appointment, and at ten cleaners it costs $400 a month on Connect.',
    'It is priced per person and structured around the appointment, and at ten cleaners it costs $299 a month on Connect.',
  ],
  [
    'Its Grow plan includes five users at $199, so ten users cost $344 on Grow rather than $400 on Connect, which is worth knowing before you buy the cheaper sounding tier.',
    'Connect is banded, so ten users cost $299 on the ten user band rather than the $400 you pay by adding nine seats, which is worth knowing before you buy the cheaper sounding tier.',
  ],
  [
    'At ten employees the same list reads $228, $2,988 on LawnPro Plus, $1,704 on FreshBooks Plus with ten users and $4,800 on Jobber Connect.',
    'At ten employees the same list reads $228, $2,988 on LawnPro Plus, $1,704 on FreshBooks Plus with ten users and $3,588 on Jobber Connect.',
  ],
  [
    'At ten employees that pairing becomes $3,216, and Jobber Grow at $4,128 plus Wave at $228 is $4,356.',
    'At ten employees that pairing becomes $3,216, and Jobber Connect at $3,588 plus Wave at $228 is $3,816.',
  ],
  [
    'It is a field service system with strong invoicing attached, and at $400 a month for ten users on Connect it is the most expensive invoice generator on this page.',
    'It is a field service system with strong invoicing attached, and at $299 a month for ten users on Connect it is the most expensive invoice generator on this page.',
  ],
  [
    'The same nine people on Jobber Connect is $139 plus eight seats at $29, or $371 a month.',
    'The same nine people on Jobber Connect is $299 a month, because the ten user band undercuts the $371 that eight extra seats would cost.',
  ],
  [
    'A nine person operation running three trucks pays $2,388 a year on GorillaDesk with three schedules, against $4,452 on Jobber Connect with nine seats.',
    'A nine person operation running three trucks pays $2,388 a year on GorillaDesk with three schedules, against $3,588 on Jobber Connect.',
  ],
  [
    'GorillaDesk becomes $6,588 a year and Jobber Connect $4,800, with Jobber Grow at $4,128.',
    'GorillaDesk becomes $6,588 a year and Jobber Connect $3,588.',
  ],
  [
    'You are paying for quoting depth a repeating round does not use, and at ten users on Connect that is $400 a month.',
    'You are paying for quoting depth a repeating round does not use, and at ten users on Connect that is $299 a month.',
  ],
  [
    'Its Grow plan includes five users at $199, making ten users $344, so the higher tier is the cheaper purchase.',
    'Connect bands at ten users for $299, so the band is the cheaper purchase than either Grow at $344 or nine added seats at $400.',
  ],
  [
    'For a nine person, three truck operation GorillaDesk is $199 a month against $371 on Jobber Connect.',
    'For a nine person, three truck operation GorillaDesk is $199 a month against $299 on Jobber Connect.',
  ],
  ['For ten separate drivers GorillaDesk is $549 and Jobber Connect is $400.', 'For ten separate drivers GorillaDesk is $549 and Jobber Connect is $299.'],
  [
    'Every user past the first costs $29 a month on Connect, so the cost rises in even increments from $139 to $400 across ten users.',
    'Every user past the first costs $29 a month on Connect, but Connect also bands, so ten users is $299 rather than the $400 that ten single seats would cost.',
  ],
  [
    'The Grow plan includes five users at $199 a month, so ten users on Grow is $344 while ten users on Connect is $400.',
    'Connect bands as well as charging per seat, so ten users is $299 on the band, against $344 on Grow and $400 by adding nine seats.',
  ],
  [
    'A ten employee company pays nothing on Connecteam, $2,988 on LawnPro Plus and $4,800 on Jobber Connect, with Jobber Grow at $4,128 for the same ten users.',
    'A ten employee company pays nothing on Connecteam, $2,988 on LawnPro Plus and $3,588 on Jobber Connect.',
  ],
  [
    'You are paying $400 a month on Connect for quoting and reporting that a repeating route does not use.',
    'You are paying $299 a month on Connect for quoting and reporting that a repeating route does not use.',
  ],
  [
    'At ten employees it pays $2,988 on LawnPro Plus and $3,588 on Jobber Connect, with Grow at $4,128.',
    'At ten employees it pays $2,988 on LawnPro Plus and $3,588 on Jobber Connect.',
  ],
  [
    'At ten employees it pays $2,988 on LawnPro Plus and $4,800 on Jobber Connect, with Grow at $4,128.',
    'At ten employees it pays $2,988 on LawnPro Plus and $3,588 on Jobber Connect.',
  ],
  [
    'A company running four staff in summer and nine in winter pays Jobber for four seats in July and nine in January, which annualises to roughly $3,600 rather than the $4,452 that nine seats all year would cost.',
    'A company running four staff in summer and nine in winter pays Jobber for four seats in July and moves onto the ten user band in January, which annualises well below the $3,588 that the band costs all year.',
  ],
  ['Jobber Connect is $1,668, $2,364 and $4,800.', 'Jobber Connect is $1,668, $2,364 and $3,588.'],
  [
    'At ten users on Connect it is $400 a month, where its Grow plan covers ten users for $344.',
    'At ten users on Connect it is $299 a month on the ten user band, which undercuts both Grow at $344 and nine added seats at $400.',
  ],
  [
    '**Jobber is wrong** for pest control compliance, holding no chemical application log, and expensive at ten users on Connect at $400 where Grow covers ten for $344.',
    '**Jobber is wrong** for pest control compliance, holding no chemical application log, and still $299 a month at ten users on the Connect band.',
  ],
  [
    'At ten users on Connect it costs $400 a month, where its Grow plan covers ten for $344.',
    'At ten users on Connect it costs $299 a month on the ten user band, which undercuts Grow at $344.',
  ],
  ['Jobber at ten users on the Connect plan is $400 a month.', 'Jobber at ten users on the Connect plan is $299 a month.'],
  ['At ten cleaners the same list reads nothing, $468, $900 and $4,800.', 'At ten cleaners the same list reads nothing, $468, $900 and $3,588.'],
  [
    "Jobber's Grow plan brings ten users to $4,128 a year, still roughly nine times the ZenMaid figure.",
    "Jobber's own ten user band is the cheapest path at that size, and it is still nearly eight times the ZenMaid figure.",
  ],
  [
    'At ten cleaners, choosing Jobber Connect over ZenMaid costs $4,332 a year, which is close to a part time office wage.',
    'At ten cleaners, choosing Jobber Connect over ZenMaid costs $3,120 a year, which is close to a part time office wage.',
  ],
  [
    'At $400 a month on Connect you are paying for quoting and reporting depth that recurring residential work does not use.',
    'At $299 a month on Connect you are paying for quoting and reporting depth that recurring residential work does not use.',
  ],
  [
    '**Jobber is wrong** for pure route work at ten staff, at $400 a month on Connect.',
    '**Jobber is wrong** for pure route work at ten staff, at $299 a month on Connect.',
  ],
  [
    'It is the best structured of these for seasonal headcount because seats can be added and removed, and its Grow plan at $199 for five users makes ten users $344 rather than $400.',
    'It is the best structured of these for seasonal headcount because seats can be added and removed, and its ten user band at $299 beats both Grow at $344 and nine added seats at $400.',
  ],
  [
    'For a lawn care business with one to twenty staff, LawnPro is the cheapest credible option at $39 a month for three employees, and Jobber is the strongest at $139 a month for one user rising to $400 at ten.',
    'For a lawn care business with one to twenty staff, LawnPro is the cheapest credible option at $39 a month for three employees, and Jobber is the strongest at $139 a month for one user rising to $299 at ten.',
  ],

  // ---- Housecall Pro, seat counts are published now ----
  [
    'Housecall Pro publishes Basic at $79 a month billed monthly, and Basic does include online booking, automated reminders and card payments. The catch is different. The pricing page publishes three prices and no seat counts, and it does not state what an additional user costs. A solo operator can budget from that page. A crew of three cannot.',
    'Housecall Pro publishes Basic at $79 a month billed monthly, and Basic does include online booking, automated reminders and card payments. The catch is that Basic covers one user, so a crew of three is on Essentials at $189. At ten users the page rewards reading twice: Essentials plus five extra seats at $100 each is $689, while MAX plus two seats at $75 each is $479. The dearer looking tier is $210 a month cheaper.',
  ],
  [
    'A three cleaner company pays $468 on ZenMaid, $900 on Launch27 and $2,364 on Jobber Connect. Housecall Pro cannot be annualised because it publishes no seat pricing.',
    'A three cleaner company pays $468 on ZenMaid, $900 on Launch27, $2,268 on Housecall Pro Essentials and $2,364 on Jobber Connect.',
  ],
  [
    'Housecall Pro is a strong product with a pricing page that will not answer the only question a growing company has.',
    'Housecall Pro now publishes its seat counts and extra seat prices, which is what makes the MAX inversion visible at all. It is the dearest tool here at ten cleaners.',
  ],
  // Annualised roll ups that name Grow, in their several wordings.
  [
    'Jobber Connect is $1,668 and $4,800 with Grow at $4,128 for ten users.',
    'Jobber Connect is $1,668 for one user and $3,588 for ten.',
  ],
  [
    'Jobber Connect is $1,668 for one user and $4,800 for ten, with Grow at $4,128.',
    'Jobber Connect is $1,668 for one user and $3,588 for ten.',
  ],
  ['Jobber Connect is $1,668 and $4,800.', 'Jobber Connect is $1,668 for one user and $3,588 for ten.'],
  [
    'Housecall Pro includes online booking, automated reminders and card payments on Basic at $79 billed monthly, which is the most complete entry tier here. It publishes no seat limits and no additional user price, so a crew of three cannot be priced from the page.',
    'Housecall Pro includes online booking, automated reminders and card payments on Basic at $79 billed monthly, which is the most complete entry tier here. Basic covers one user, so three cleaners means Essentials at $189, and ten means MAX plus two seats at $479 rather than Essentials plus five at $689.',
  ],
  [
    '**Housecall Pro is wrong** for anyone who needs to plan cost across hires, because the pricing page publishes three prices and no seat counts.',
    '**Housecall Pro is wrong** for a ten person crew on cost, where $479 a month makes it the dearest tool on this page, and wrong on Basic for anyone with staff, because Basic covers one user.',
  ],
  [
    '**Housecall Pro is wrong** for anyone who needs to forecast cost before signing, because the published pricing does not support that.',
    '**Housecall Pro is wrong** for a ten person crew on cost, at $479 a month, and wrong on Basic for anyone with staff, because Basic covers a single user.',
  ],
  [
    '**Housecall Pro is wrong** for any carpet cleaner planning to hire, because the pricing page does not publish seat limits or the cost of an additional user, so you cannot model the cost of a second van.',
    '**Housecall Pro is wrong** for a carpet cleaner at ten technicians, where $479 a month makes it the dearest option here, though the page now publishes the seat counts you need to model a second van.',
  ],
  [
    '**Housecall Pro is wrong** for a janitorial contractor planning headcount, because its published pricing does not let you model the cost of the crew you are about to hire.',
    '**Housecall Pro is wrong** for a janitorial contractor at ten cleaners, where $479 a month is the dearest figure on this page and buys residential features a building based business will not use.',
  ],
  [
    '**Housecall Pro is wrong** for an operator who needs to model cost across hires, because the pricing page will not support it.',
    '**Housecall Pro is wrong** for an operator at ten technicians, where $479 a month makes it the dearest option on this page.',
  ],
  [
    '**Housecall Pro is wrong** for any operator who needs to plan cost across hires, because the pricing page publishes three prices and no seat counts.',
    '**Housecall Pro is wrong** for an operator at ten technicians, at $479 a month, and wrong on Basic for anyone with staff, because Basic covers one user.',
  ],
  [
    'Housecall Pro publishes Basic at $79 with online booking included, and no seat information at all.',
    'Housecall Pro publishes Basic at $79 with online booking included, and Basic covers one user, so any crew is on Essentials at $189 or MAX at $329.',
  ],
  [
    'Housecall Pro schedules well from an inbound call. Its pricing page does not publish seat limits or an additional user rate, so a growing crew cannot budget from it.',
    'Housecall Pro schedules well from an inbound call. Basic covers one user, so a growing crew moves to Essentials at $189 and then finds MAX cheaper than Essentials once past eight people.',
  ],
  [
    'Housecall Pro publishes Basic at $79 billed monthly, and publishes no seat limits at all, which for a business whose whole cost question is headcount makes the page close to useless.',
    'Housecall Pro publishes Basic at $79 billed monthly for one user, Essentials at $189 for five and MAX at $329 for eight, with extra seats at $100 and $75. For a business whose whole cost question is headcount, that is now answerable.',
  ],
  [
    "Housecall Pro publishes Basic at $79 a month billed monthly, which is the most complete entry tier here. It publishes no seat limits and no per user price, so a solo operator can budget from the page and a crew cannot.",
    "Housecall Pro publishes Basic at $79 a month billed monthly, which is the most complete entry tier here. Basic covers one user, so a crew of three is on Essentials at $189 and ten people are cheapest on MAX plus two seats at $479.",
  ],

  // ---- Arborgold, the $129 is annual ----
  [
    'Arborgold publishes plan prices of $129, $299 and $499 a month and does not publish what a user licence costs, which means the plan price is not the price.',
    'Arborgold publishes $129, $299 and $499 a month on annual billing and $149, $343 and $573 paying monthly. This site quotes monthly billing, so the entry price is $149, and licence costs are still not published, which means the plan price is not the price.',
  ],
  [
    'Arborgold publishes plan prices of $129, $299 and $499 and does not publish licence costs, so a seasonal headcount cannot be modelled from its pricing page at all.',
    'Arborgold publishes $129, $299 and $499 a month on annual billing, or $149, $343 and $573 paying monthly, and does not publish licence costs, so a seasonal headcount cannot be modelled from its pricing page at all.',
  ],
  [
    'Arborgold Starter is $1,548 a year for one user with licence costs unpublished.',
    'Arborgold Starter is $1,788 a year for one user paying monthly, or $1,548 committing annually, with licence costs unpublished.',
  ],
  [
    'A solo operator pays nothing on LawnPro Solo up to twenty five customers, $1,548 a year on Arborgold Starter and $1,668 on Jobber Connect.',
    'A solo operator pays nothing on LawnPro Solo up to twenty five customers, $1,788 a year on Arborgold Starter paying monthly and $1,668 on Jobber Connect.',
  ],
  [
    'A solo operator pays nothing on LawnPro Solo up to twenty five customers, $1,188 a year on GorillaDesk Pro and $1,668 on Jobber Connect.',
    'A solo operator pays nothing on LawnPro Solo up to twenty five customers, $1,188 a year on GorillaDesk Pro and $1,668 on Jobber Connect.',
  ],
  [
    '**Arborgold is wrong** for straightforward lawn maintenance. It is built for tree care and landscape construction where materials and job costing matter, and its licence pricing is not published.',
    '**Arborgold is wrong** for straightforward lawn maintenance. It is built for tree care and landscape construction where materials and job costing matter, its entry price paying monthly is $149 rather than the $129 the page leads with, and its licence pricing is still not published.',
  ],

  // ---- ZenMaid, name the cheaper tier ----
  [
    'ZenMaid is the clearest of the six. Starter at $19 a month has no booking form at all and caps you at forty appointments a month, which a working solo cleaner will pass in the second week. Pro at $39 a month adds the booking form. The price does not change with headcount.',
    'ZenMaid is the clearest of the six, and the one most likely to make you think this site has got it wrong. Its page leads with Starter at $19 a month. That tier has no customer booking form at all and caps you at forty appointments a month, which a working solo cleaner passes in the second week, so it fails the basis every price here is quoted on. Pro at $39 a month adds the booking form, and the price does not change with headcount.',
  ],
];

let applied = 0;
const missed = [];

for (const name of fs.readdirSync('content').filter((f) => f.endsWith('.md'))) {
  const file = `content/${name}`;
  let text = fs.readFileSync(file, 'utf8');
  let changed = false;

  for (const [find, replace] of EDITS) {
    if (text.includes(find)) {
      text = text.split(find).join(replace);
      applied++;
      changed = true;
    }
  }

  if (changed) fs.writeFileSync(file, text);
}

for (const [find] of EDITS) {
  const hit = fs
    .readdirSync('content')
    .filter((f) => f.endsWith('.md'))
    .some((f) => fs.readFileSync(`content/${f}`, 'utf8').includes(find));
  if (hit) missed.push(find.slice(0, 80));
}

console.log(`Applied ${applied} replacements.`);
if (missed.length) console.log(`STILL PRESENT (${missed.length}):\n  ` + missed.join('\n  '));
