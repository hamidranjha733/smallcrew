# Small Crew

Software reviews for service businesses under 20 people.

A static affiliate comparison site for owners of cleaning, lawn care and pest control companies in the United States with one to twenty staff.

## The premise

Every competing comparison page prices the cheapest plan on the vendor's pricing page. Real service businesses never buy that plan, because online booking, automated reminders and card payments almost always sit a tier higher.

Small Crew prices every tool on the tier a real business would actually need, at three crew sizes, and dates every price.

If a change would weaken that premise, do not make it.

## Running it

```
npm install
npm run dev
```

```
npx next build
```

A change is not finished until `npx next build` passes with zero errors. The build produces a fully static site in `out/`, deployable free on Vercel or any static host.

Node 18 or later is required. The site was built and verified against Node 22.

## Stack

Next.js 15 with the App Router, TypeScript, and fully static output. Content is markdown in `/content`, parsed with `gray-matter` and rendered with `remark` and `remark-html`.

Dependencies are limited to next, react, react-dom, gray-matter, remark, remark-html and the TypeScript types. Do not add anything else without a decision to do so.

There is no Tailwind, no UI library and no CSS framework. Styling is one hand written stylesheet at `app/globals.css` using CSS custom properties. There is no browser storage of any kind.

## Layout

```
app/
  layout.tsx          masthead, footer, fonts, site metadata
  page.tsx            homepage: hero, crew picker, comparisons, method
  globals.css         the entire stylesheet
  [slug]/page.tsx     one page per markdown file in /content
  sitemap.ts          generated from the content folder
  robots.ts           generated from the content folder
components/
  Masthead.tsx
  Footer.tsx
  CostStrip.tsx       the mono line above every page heading
  CostTable.tsx       the signature six column table
  Disclosure.tsx      affiliate disclosure, sits above every table
lib/
  content.ts          frontmatter parsing, validation, markdown rendering
  site.ts             domain and site level strings
content/
  *.md                one file per page, filename becomes the URL
```

## Changing the domain

The live domain is `https://smallcrew.vercel.app`. It appears in exactly one place, `SITE_URL` in `lib/site.ts`. Metadata, canonical URLs, the sitemap and robots.txt all read from it.

If you move to a custom domain, change that one constant, rebuild and redeploy. Nothing else references the domain.

## Adding a page

1. Confirm the target keyword has real US search volume and a difficulty of 25 or below.
2. Read the top three ranking results and note what they leave out.
3. Fetch each vendor's live pricing page and record the real current price at 1, 3 and 10 users, on the lowest tier that includes online booking. Not the cheapest tier.
4. Set `pricesChecked` to the current month and year.
5. Write the page to the standard below.
6. Add it to `CONTENT-PLAN.md`.
7. Run `npx next build`.

### Frontmatter

Use exactly these keys. The build fails if any are missing.

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

`solo`, `crew3` and `crew10` are monthly costs at 1, 3 and 10 users on the lowest tier that includes online booking.

Accounting, billing and invoicing pages compare tools that have no booking feature. Those pages are priced on the lowest tier that includes recurring invoicing and card payments instead, and the table caption says so. The list of those pages is `LEDGER_PAGES` in `app/[slug]/page.tsx`.

Affiliate links are handled automatically. Any link in the markdown body pointing off site is rewritten during rendering to carry `rel="nofollow sponsored noopener"` and `target="_blank"`. The tool name in every cost table row carries the same attributes.

## The rule: no price ships undated

Every page must carry a `pricesChecked` month and year, and it is enforced in code. `lib/content.ts` validates the format at build time and throws if it is missing or malformed, which fails the build.

This is deliberate. A comparison page with no date on it is a guess dressed up as research, and vendor pricing in this category changes several times a year.

**Any page whose `pricesChecked` date is more than four months old is stale.** Re verify it before doing anything else to that page, and update the date even when nothing has changed.

## Writing standard

- Formal English. Short paragraphs, one idea each. No filler openers.
- No em dashes anywhere in any file, including code comments and commit messages.
- Open every page with a direct answer paragraph before any explanation. AI summaries cite the first direct answer they find.
- 1,200 to 1,800 words per page.
- Every page has a Common questions section, three to five questions, each answered directly in its first sentence.
- Every pick names a real flaw. Every page has a section stating where each tool is the wrong choice.
- Never write a comparison where every option is excellent. That is a page written for the vendors.

### Facts

Never invent a price, a feature, a limit or a test result. Every factual claim must come from a page actually fetched while writing.

If a fact cannot be verified, write `Not published` rather than guessing. This applies to vendors who genuinely do not publish, and to vendors whose pricing page could not be retrieved. Where the reason matters, say which it is in the `watch` column.

Never claim hands on testing, benchmarking or trials. This site has not used the software. Frame everything as documented pricing and published features.

## Design

The site is a working dispatch board: warm job sheet paper with a faint ruled grid, ledger green for anything verified, amber for anything the reader should worry about. Dense rather than airy. It should never look like a generic SaaS blog.

**The full token list and the rules for the recurring elements live in `CLAUDE.md`.** That is the single source of truth. The values below are the summary.

Ink `#1c1714` for text, warm paper `#f2e9da` for the page, card `#fffdf7` for raised surfaces, ledger green `#0f5132` as the primary accent and amber `#a85a11` for warnings. All tokens are declared once at the top of `app/globals.css`.

Archivo at 500, 700 and 800 for the wordmark and headings. Newsreader at 400 and 500 for reading text. IBM Plex Mono at 400 to 700 for every number, label, eyebrow, table header, status readout and nav item.

Content wrapper is 78rem, reading column is 40rem. Border radius stays 0 everywhere and depth comes from hard offset shadows in warm ink, never blurred glows. Gradients are used only for the paper texture, the perforated tear lines and dashed dividers.

The site must work down to 360px, keyboard focus rings are `--ledger`, and `prefers-reduced-motion` disables the hover transforms.

`--amber` appears only in the Watch out for column, pull quotes, the dear side of the spread panel and warning callouts. If it starts appearing as decoration, that is drift. Remove it.

Vendor logos are stored in `/public/logos` and mapped in `lib/vendors.ts`. Never hot link a vendor logo, so the static export makes no third party request when a reader opens a page.

## Definition of done

- `npx next build` passes with zero errors
- No placeholder text anywhere in the repository
- Every price carries a verification date and came from a fetched page
- Every guide is reachable from the homepage and present in the sitemap
- The page renders correctly at 360px
