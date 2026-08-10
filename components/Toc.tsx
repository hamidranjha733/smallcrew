import type { Heading } from '@/lib/content';

type Props = {
  headings: Heading[];
};

// Sticky on wide screens, a two column list on narrow ones.
export default function Toc({ headings }: Props) {
  if (headings.length === 0) return null;

  return (
    <nav className="toc" aria-label="On this page">
      <span className="label">On this page</span>
      <ol>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
