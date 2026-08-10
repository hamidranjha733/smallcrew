Small Crew. A static affiliate review site comparing software for small service businesses in the United States: cleaning, lawn care and pest control companies with one to twenty staff. Revenue comes from SaaS affiliate programmes.
The entire premise: competing pages quote the cheapest plan on a vendor pricing page. Real businesses never buy that plan, because online booking, automated reminders and card payments sit a tier higher. This site prices the tier a business would actually need, at three crew sizes, and dates every price.
If a change would weaken that premise, do not make it.
Commands

```
npm install
npm run dev
npx next build

```

A change is not finished until `npx next build` passes with zero errors.
Never do these

1. Never invent a price, a feature, a limit or a test result. Every factual claim must come from a page actually fetched during the session
2. Never claim hands on testing, benchmarking or trials. This site has not used the software. Frame everything as documented pricing and features
3. Never publish a price without a `pricesChecked` month and year on the same page
4. Never use em dashes in any file, including code comments and commit messages
5. Never add a dependency beyond next, react, react-dom, gray-matter, remark and remark-html without being told to
6. Never introduce Tailwind, a UI library, a CSS framework, or a second stylesheet
7. Never use localStorage, sessionStorage or any browser storage API
8. Never change the palette, the typefaces or the layout rules below
9. Never write a comparison where every option is excellent. That is a page written for the vendors
10. Never overwrite a delivered file to make a fix. Create the new version alongside it and keep the earlier one

Writing standard

* Formal English. Short paragraphs, one idea each. No filler openers
* Open every page with a direct answer paragraph before any explanation. AI summaries cite the first direct answer they find
* Every pick names a real flaw. Every guide has a section stating where each tool is the wrong choice
* Every page has a Common questions section, three to five questions, each answered directly in its first sentence
* 1,200 to 1,800 words per page
* If a fact cannot be verified, write `Not published` rather than guessing

Design, fixed

The site is a working dispatch board. Warm job sheet paper, a faint ruled grid, ledger green for anything verified and amber for anything the reader should worry about. Dense with useful information rather than airy. It should never look like a generic SaaS blog.

Design tokens, fixed

```
--ink:         #1c1714   deep warm ink, all body text
--ink-soft:    #3b3128   secondary prose
--paper:       #f2e9da   warm job sheet background
--paper-2:     #e8dbc5   masthead, footer, logo tiles
--card:        #fffdf7   raised surfaces, table rows, panels
--ledger:      #0f5132   deep accounting green, primary accent
--ledger-2:    #17714a   green hover
--ledger-tint: #e2ece4   green wash for hover and the cheap side of the spread
--amber:       #a85a11   warm amber, warnings and the Watch out for column
--amber-tint:  #f8e8cf   amber wash for pull quotes and the dear side of the spread
--rule:        #d5c7ad   hairlines
--rule-2:      #c0ae8e   heavier hairlines and tile borders
--mute:        #6d6152   labels and secondary mono

```

* Display type: Archivo, weights 500 / 700 / 800, tight tracking
* Body type: Newsreader, weights 400 / 500
* Data type: IBM Plex Mono, weights 400 / 500 / 600 / 700, for every number, label, eyebrow, table header, status readout and nav
* Wrapper 78rem, reading column 40rem
* The page background carries a ruled grid at 28px, horizontal at 4.2% ink and vertical at 2.2%. It must stay faint enough to read over
* Border radius stays 0 everywhere. Depth comes from hard offset shadows in warm ink, never blurred glows
* Gradients are allowed only for paper texture, perforated tear lines and dashed dividers. Never for decoration on a surface
* Animation is limited to a 0.12s transform or background colour change on hover. `prefers-reduced-motion` disables the transforms
* Must work down to 360px wide, keyboard focus rings in `--ledger`

Recurring elements

* **Status strip.** Ink bar directly under the masthead, mono, carrying the prices checked date as a live readout with a green dot. On every page
* **Cost table.** The product, and the visual hero. Ink header row, logo tile beside each tool name, Best for as a stamped badge rotated about one degree in `--ledger`, prices in large mono at 1.28rem right aligned, Watch out for in `--amber` on an amber wash
* **Tear line.** Perforated divider between homepage sections, drawn with a radial gradient. Not a plain rule
* **Docket panel.** Bordered panel beside the homepage headline carrying counts and the cheapest and dearest figures, so the fold shows data rather than whitespace
* **Vendor logos.** Every tool name in a cost table, pick section or guide card carries its mark from `/public/logos`. Never hot link a logo, always store it locally
* **Footer.** Styled as the foot of an invoice, with the method statement and a ruled total block carrying the counts and the checked date

`--amber` appears only in the Watch out for column, pull quotes, the dear side of the spread and warning callouts. `--ledger` should appear on every screen. If amber starts appearing as decoration, that is drift, remove it.
Content system
One markdown file per page in `/content`. Filename becomes the URL. Frontmatter:

```yaml
title:
standfirst:
keyword:
volume:
pricesChecked:
toolsCompared:
tools:
  - tool:
    bestFor:
    solo:
    crew3:
    crew10:
    watch:
    url:

```

`solo`, `crew3` and `crew10` are monthly costs at 1, 3 and 10 users on the lowest tier that includes online booking. Not the cheapest tier.
Affiliate links render with `rel="nofollow sponsored noopener"` and `target="_blank"`. The disclosure component sits above the cost table on every page, and states that links earn commission, that it costs the reader nothing, and that it does not change the order of the table.
Adding a new page

1. Confirm the target keyword has real US volume and a difficulty of 25 or below
2. Read the top three ranking results and note what they leave out
3. Fetch each vendor pricing page and record real current prices at 1, 3 and 10 users, then set `pricesChecked` to this month
4. Write the page to the standard above
5. Add it to `CONTENT-PLAN.md`
6. Run the build

Maintenance rule
Vendor pricing changes several times a year. Any page whose `pricesChecked` date is more than four months old is treated as stale. Re verify it before doing anything else to that page, and update the date even when nothing changed.
Definition of done

* `npx next build` passes
* No placeholder text anywhere in the repository
* Every price carries a verification date and came from a fetched page
* Every guide is reachable from the homepage and present in the sitemap
* The page renders correctly at 360px
