import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Tool } from '@/lib/content';

// Standing notes about how a vendor prices, printed under any table carrying
// its figures. Rendered from the tool list rather than written into each page,
// so a table that gains one of these vendors gains its note with it.
//
// These exist because the crew size columns assume a tool charges by headcount.
// Three do not, and a column heading cannot say so on its own.

type Note = {
  vendor: string;
  label: string;
  body: ReactNode;
};

const NOTES: Note[] = [
  {
    vendor: 'ZenMaid',
    label: 'On the ZenMaid figures',
    body: (
      <>
        ZenMaid charges per person on the team and counts office staff too, so a three cleaner
        company with an office manager is four people and pays $95 on Pro. The columns above count
        only people who need a login. Prices are the Pro tier at every crew size: Starter is
        cheaper but capped at forty appointments a month, which a crew of ten passes easily, so
        quoting it in a ten cleaner column would flatter it. Read on 2 October 2026. The{' '}
        <Link href="/zenmaid-pricing/">full ZenMaid pricing breakdown</Link> shows every tier at
        every size.
      </>
    ),
  },
  {
    vendor: 'GorillaDesk',
    label: 'On the GorillaDesk figures',
    body: (
      <>
        GorillaDesk charges per route and includes unlimited users, so headcount does not change
        the bill. A ten person crew running two routes pays the two route price, $149 a month on
        Pro. That is why the crew columns above read Per route rather than carrying a figure: the
        number of people is not what GorillaDesk bills for. One route on Pro, the cheapest tier
        with online booking, is $99 a month, and the published ladder runs $149 at two routes,
        $199 at three, $299 at five and $549 at ten. Read on 2 October 2026.
      </>
    ),
  },
  {
    vendor: 'Wave',
    label: 'On the Wave figures',
    body: (
      <>
        Wave has two tiers and the figure above says which one it is. Starter is $0 and covers
        unlimited invoices, estimates and bookkeeping records for a single user. Pro is $19 a
        month billed monthly, or $190 a year, and adds automatic bank imports, automated late
        payment reminders and the ability to add other users to the account. Neither tier charges
        by headcount, so the crew columns do not move. Card processing is 2.9% plus $0.60 a
        transaction on either. Read on 2 October 2026.
      </>
    ),
  },
  {
    vendor: 'Swept',
    label: 'On the Swept figures',
    body: (
      <>
        Swept prices by the number of locations cleaned rather than by headcount, and includes
        unlimited users, so the crew columns do not move. Every plan starts at a minimum of
        fifteen locations. The figure above is Launch billed monthly at that minimum, which is the
        entry price rather than a flat one: the page bands locations at 1 to 15, 16 to 25, 26 to
        30, 31 to 59 and 60 or more, and does not display what the higher bands cost. Billing
        annually brings Launch to $24 a month. Read on 2 October 2026.
      </>
    ),
  },
];

export function notesFor(tools: Tool[]): Note[] {
  const names = new Set(tools.map((tool) => tool.tool));
  return NOTES.filter((note) => names.has(note.vendor));
}

export default function VendorNotes({ tools }: { tools: Tool[] }) {
  const notes = notesFor(tools);
  if (notes.length === 0) return null;

  return (
    <>
      {notes.map((note) => (
        <p className="vendor-note" key={note.vendor}>
          <span className="vendor-note-label">{note.label}</span>
          {note.body}
        </p>
      ))}
    </>
  );
}
