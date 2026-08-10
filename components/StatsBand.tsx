export type Stat = {
  label: string;
  value: string;
  note?: string;
  teal?: boolean;
};

type Props = {
  stats: Stat[];
};

// Dark charcoal band directly under the hero. It exists to break the page out
// of one flat wash and to put the numbers that matter above the fold.
export default function StatsBand({ stats }: Props) {
  return (
    <div className="stats-band">
      <dl className="wrapper stats-inner">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <dt>{stat.label}</dt>
            <dd className={stat.teal ? 'teal' : undefined}>{stat.value}</dd>
            {stat.note && <span className="stat-note">{stat.note}</span>}
          </div>
        ))}
      </dl>
    </div>
  );
}
