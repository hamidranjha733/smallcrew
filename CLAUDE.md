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

The site is a trade journal, not a software company blog. Editorial, printed, opinionated. Plain white page, charcoal furniture, a teal signal and burnt orange reserved for warnings. Dense with useful information rather than airy. The site argues against the vendors, so it must never look like one of them.

Design tokens, fixed

```
--ink:          #1d2124   charcoal. Body text, dark bands, masthead, footer, table headers
--ink-soft:     #3d4548   secondary prose
--paper:        #ffffff   plain white page
--surface:      #f4f6f5   neutral light. Alternating rows, panels, alternating sections
--signal:       #00857a   teal. The primary accent
--signal-2:     #00655d   teal hover
--signal-tint:  #e4f1ef   pale teal wash
--signal-pale:  #5ed3c6   teal readable on a charcoal background
--flag:         #c2410c   burnt orange. Warnings and the Watch out for column only
--flag-tint:    #fbeade   orange wash behind the Watch out for column
--rule:         #dde1df   hairlines
--rule-2:       #c3cac7   heavier hairlines and tile borders
--mute:         #5f6663   labels and secondary mono

```

There is no cream, no warm paper and no oxblood anywhere in this system, including the background texture. `--surface` must read neutral, never warm. If warmth reappears, that is drift, remove it.

Teal is the primary accent and must appear on every screen. It carries badges, links, active states, section rules, buttons and the Best for cell. Burnt orange appears only in the Watch out for column, pull quotes on guides and warning callouts.

* Display type: Archivo, weights 500 / 700 / 800, tight tracking
* Body type: Newsreader, weights 400 / 500
* Data type: IBM Plex Mono, weights 400 / 500 / 600 / 700, for every number, label, eyebrow, table header, status readout and nav
* Wrapper 78rem, centred article column 66rem, reading column 44rem
* The page background is white carrying a very faint neutral horizontal rule at 32px, ink at 3.4%. Ruled lines only, never a grid, and never a warm tone
* The page must never read as one flat wash. Bands run dark masthead, dark status strip, hero, dark stats band, then sections alternating `--paper` and `--surface` so no two adjacent sections share a background, closing on a dark band above the dark footer
* Border radius stays 0 everywhere. Depth comes from hard offset shadows in charcoal or teal, never blurred glows
* Gradients are allowed only for paper texture, perforated tear lines and dashed dividers. Never for decoration on a surface
* Animation is limited to a 0.12s transform or background colour change on hover. `prefers-reduced-motion` disables the transforms
* Must work down to 360px wide, keyboard focus rings in `--signal`
* Density comes first on the opening screen. The H1 on category and guide pages is deliberately small, around 1.6rem at the top end, because the headline is not the product. Nothing sits in a narrow left column with the right half of a wide viewport empty

Recurring elements

* **Status strip.** Ink bar directly under the masthead with a 3px teal underline, mono, carrying the prices checked date as a live readout. On every page
* **Stats band.** Dark charcoal band directly below the hero on the homepage and every category page, four cells in mono: tools priced, guides, price range from cheapest to dearest, prices checked. It exists to break the page out of one flat wash and to put the numbers above the fold
* **Hero panel.** Right hand panel beside the headline on category and guide pages, listing the tools covered with their logo and their price at a crew of three. This is what puts vendor logos above the fold. Category pages fold their counts and checked date into its meta row rather than using separate badge boxes
* **Closing band.** Dark charcoal band above the footer, teal top rule, carrying the check the date message and links to the three categories
* **Cost table.** The product, and the visual hero. Ink header row, logo tile beside each tool name, Best for as a stamped badge rotated about one degree in `--signal`, prices in large mono at 1.28rem right aligned, Watch out for in `--flag` on a `--flag-tint` wash. Do not change its structure, only its colour
* **Tear line.** Perforated divider, used on guide pages between the cost table and the article. Not needed where sections already alternate background
* **Docket panel.** Bordered panel beside the homepage headline carrying counts and the cheapest and dearest figures, so the fold shows data rather than whitespace
* **Lifted pull quote.** On category pages, one short sentence set large in teal, breaking out of the reading column with a teal rule above it. The sentence is lifted out of the intro and never printed twice
* **Vendor logos.** Every tool name in a cost table, trade card or guide card carries its mark from `/public/logos`. Never hot link a logo, always store it locally
* **Footer.** Ink block styled as the foot of an invoice, with the method statement and a teal ruled total block carrying the counts and the checked date
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
