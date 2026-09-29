import Link from 'next/link';
import { formatDate } from '@/lib/dates';
import { AUTHOR_NAME } from '@/lib/site';

type Props = {
  /** ISO date the page was last edited, shown beside the byline. */
  modified: string;
};

// Named byline on every page carrying an article. A site that takes a position
// on which vendors are worth paying should say who is taking it.
export default function Byline({ modified }: Props) {
  return (
    <p className="byline">
      <span className="byline-by">By</span>{' '}
      <Link href="/about/" rel="author">
        {AUTHOR_NAME}
      </Link>
      <span className="byline-sep" aria-hidden="true">
        /
      </span>
      <span className="byline-date">Updated {formatDate(modified)}</span>
    </p>
  );
}
