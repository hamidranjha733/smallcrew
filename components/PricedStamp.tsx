type Props = {
  checked: string;
  basis?: string;
};

// Rotated stamp carrying the method. It is the visual anchor of a guide and
// the one line that separates this site from a page quoting entry tiers.
export default function PricedStamp({
  checked,
  basis = 'the lowest tier with online booking',
}: Props) {
  return (
    <div className="priced-stamp" role="note">
      <span className="priced-stamp-rule">Priced on</span>
      <strong>{basis}</strong>
      <span className="priced-stamp-date">Checked {checked}</span>
    </div>
  );
}
