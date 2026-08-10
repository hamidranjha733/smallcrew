type Props = {
  keyword: string;
  volume: number;
  toolsCompared: number;
  pricesChecked: string;
};

// The mono line that sits above every page heading. It states what the page is
// targeting and, most importantly, when the prices in it were last read off a
// vendor page.
export default function CostStrip({ keyword, volume, toolsCompared, pricesChecked }: Props) {
  return (
    <ul className="cost-strip">
      <li>
        <span className="cost-strip-key">Target keyword</span>
        <span className="cost-strip-value">{keyword}</span>
      </li>
      <li>
        <span className="cost-strip-key">Searches per month</span>
        <span className="cost-strip-value">{volume.toLocaleString('en-US')}</span>
      </li>
      <li>
        <span className="cost-strip-key">Tools compared</span>
        <span className="cost-strip-value">{toolsCompared}</span>
      </li>
      <li>
        <span className="cost-strip-key">Prices checked</span>
        <span className="cost-strip-value cost-strip-checked">{pricesChecked}</span>
      </li>
    </ul>
  );
}
