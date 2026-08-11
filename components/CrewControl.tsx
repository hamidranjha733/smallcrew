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
        vendor published base and per seat rate. Banded and per schedule pricing shows the
        published band, never a number between two of them.
      </span>
    </div>
  );
}
