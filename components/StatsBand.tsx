export type Stat = {
  label: string;
  value: string;
  note?: string;
  teal?: boolean;
};

type Props = {
  stats: Stat[];
};

// Light band directly under the teal hero. It used to be charcoal, which put
// two dark surfaces against each other. Light keeps the page alternating teal,
// light, white.
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
