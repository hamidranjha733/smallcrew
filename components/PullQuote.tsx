import VendorLogo from './VendorLogo';

type Props = {
  quote: string;
  tool: string;
  label?: string;
};

// Lifts the most consequential warning on the page out of the table, because
// the Watch out for column is where the useful part of any comparison lives.
export default function PullQuote({ quote, tool, label = 'The catch on our top pick' }: Props) {
  return (
    <aside className="pullquote">
      <span className="label">{label}</span>
      <p>{quote}</p>
      <cite>
        <VendorLogo tool={tool} />
        {tool}
      </cite>
    </aside>
  );
}
