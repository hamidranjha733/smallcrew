'use client';

type Props = {
  id: string;
  crew: number;
  onChange: (value: number) => void;
};

// The crew size control that sits above every cost table. Presentational only,
// so both the guide table and the homepage summary table share one appearance
// and one set of behaviours.
export default function CrewControl({ id, crew, onChange }: Props) {
  return (
    <div className="crew-calc">
      <label className="crew-calc-label" htmlFor={id}>
        Your crew size
      </label>
      <input
        id={id}
        className="crew-calc-range"
        type="range"
        min={1}
        max={20}
        step={1}
        value={crew}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <output className="crew-calc-value" htmlFor={id}>
        {crew} {crew === 1 ? 'person' : 'people'}
      </output>
      <span className="crew-calc-note">
        Move it off one, three or ten and the table adds a calculated column, worked out from each
        vendor published base and per seat rate. Where a vendor bands instead, the cell shows the
        nearest band we hold at or above your crew size and says so. That is an upper bound: a
        vendor may publish a cheaper band in between, which is why the figure is marked rather than
        presented as a quote.
      </span>
    </div>
  );
}
