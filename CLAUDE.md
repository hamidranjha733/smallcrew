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

Design tokens, fixed

```
--ink:    #14181b
--paper:  #f4f4f0
--card:   #ffffff
--ledger: #0f5132
--flag:   #a33116
--rule:   #d7d9d1
--mute:   #6a716c

```

* Display type: Archivo, weights 500 / 700 / 800, tight tracking on large sizes
* Body type: Newsreader, weights 400 / 500
* Data type: IBM Plex Mono for every number, label, eyebrow, table header and nav
* Wrapper 76rem, reading column 40rem
* 2px rules under the masthead and above section headings, 1px hairlines between list items
* No border radius, no shadows, no gradients, no animation beyond a background colour change on hover
* Must work down to 360px wide, keyboard focus rings in `--ledger`, and `prefers-reduced-motion` respected

`--flag` appears only in the Watch out for column and in warning callouts. If it starts appearing elsewhere, that is drift, remove it.
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
