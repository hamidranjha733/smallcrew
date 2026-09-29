# Archived content

Files here are kept for the record and do not build a route. The loader in
`lib/content.ts` lists only `content/*.md`, so anything in a subdirectory is out
of the build.

Nothing here should be edited. If a page needs to come back, move the file up to
`content/` and restore its entry in `lib/seo.ts`.

## best-pest-control-software.md

Merged into the `/pest-control/` category page in September 2026 and redirected
there with a 301 in `vercel.json`.

Both pages targeted the same intent. `/pest-control/` sits in the masthead, so it
carried an exact match internal link from every page on the site, while this
guide carried far fewer. Consolidating onto the stronger URL was cheaper than
rewiring the navigation, and the merged page is the primary page for the head
term "pest control software".

The unique sections of this file live on in `content/category/pest-control.md`.

## best-lawn-care-software.md

Merged into the `/lawn-care/` category page in September 2026 and redirected
there with a 301 in `vercel.json`.

Ahrefs gave both pages the same parent topic, "lawn care software", so they
competed with each other. `/lawn-care/` sits in the masthead and carried far
more internal links, so it was the cheaper URL to keep.

The merged page targets "best lawn care software" at KD 14 rather than "lawn
care software" at KD 53. The unique sections of this file live on in
`content/category/lawn-care.md`.
