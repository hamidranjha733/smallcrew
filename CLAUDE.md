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

The site is a trade journal, not a software company blog. Editorial, printed, opinionated. Warm paper, warm ruled lines, heavy ink furniture and a single oxblood signal colour. Dense with useful information rather than airy. The site argues against the vendors, so it must never look like one of them.

Design tokens, fixed

```
--ink:          #1c1a19   warm near black. Masthead, footer, status strip, table headers, all body text
--ink-soft:     #423c38   secondary prose
--paper:        #f7f4ef   warm paper. Page background
--paper-2:      #efeae2   logo tiles, even table rows, inline code
--card:         #ffffff   raised surfaces, panels, table
--signal:       #8c2f39   oxblood. The primary accent
--signal-2:     #6d222b   oxblood hover
--signal-tint:  #f6ecec   pale oxblood wash
--signal-pale:  #e8a0a8   oxblood readable on an ink background
--rule:         #ddd7cf   hairlines
--rule-2:       #c9c1b6   heavier hairlines and tile borders
--mute:         #6e6862   labels and secondary mono

```

There is no green and no cool grey anywhere in this system, including the background texture. If either reappears, that is drift, remove it.

Oxblood is the only accent and it must appear on every screen. It carries badges, active states, section rules, the Watch out for column, hover states and the left border on every card.

* Display type: Archivo, weights 500 / 700 / 800, tight tracking
* Body type: Newsreader, weights 400 / 500
* Data type: IBM Plex Mono, weights 400 / 500 / 600 / 700, for every number, label, eyebrow, table header, status readout and nav
* Wrapper 78rem, reading column 40rem
* The page background carries warm horizontal ruled lines at 32px, ink at 5.2%. Ruled lines only, never a grid, and never a cool tone
* Border radius stays 0 everywhere. Depth comes from hard offset shadows in warm ink or oxblood, never blurred glows
* Gradients are allowed only for paper texture, perforated tear lines and dashed dividers. Never for decoration on a surface
* Animation is limited to a 0.12s transform or background colour change on hover. `prefers-reduced-motion` disables the transforms
* Must work down to 360px wide, keyboard focus rings in `--signal`

Recurring elements

* **Status strip.** Ink bar directly under the masthead with a 3px oxblood underline, mono, carrying the prices checked date as a live readout. On every page
* **Cost table.** The product, and the visual hero. Ink header row, logo tile beside each tool name, Best for as a stamped badge rotated about one degree in `--signal`, prices in large mono at 1.28rem right aligned, Watch out for in `--signal` on a `--signal-tint` wash
* **Tear line.** Perforated divider between sections, drawn with a radial gradient. Not a plain rule
* **Docket panel.** Bordered panel beside the homepage headline carrying counts and the cheapest and dearest figures, so the fold shows data rather than whitespace
* **Vendor logos.** Every tool name in a cost table, trade card or guide card carries its mark from `/public/logos`. Never hot link a logo, always store it locally
* **Footer.** Ink block styled as the foot of an invoice, with the method statement and an oxblood ruled total block carrying the counts and the checked date
* **Breadcrumb.** Mono, uppercase, on every guide and category page, running Small Crew / trade / keyword

Routes

* `/` homepage. Hero and docket, three trade cards, crew picker, the spread panel, method. It links through to the category pages rather than listing every guide
* `/cleaning`, `/lawn-care`, `/pest-control` category pages. Each lists only its own guides, with its own H1, intro, metadata, canonical and sitemap entry
* `/[slug]` one guide per markdown file
* The masthead and footer link to the category pages, never to homepage anchors
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
