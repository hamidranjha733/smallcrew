export type StatusItem = {
  key: string;
  value: string;
  live?: boolean;
};

type Props = {
  items: StatusItem[];
};

// Thin readout under the masthead. The verification date is the one fact this
// site is built on, so it is on every screen before anything else.
export default function StatusStrip({ items }: Props) {
  return (
    <div className="status-strip">
      <div className="wrapper status-inner">
        {items.map((item, index) => (
          <span
            key={item.key}
            className={`status-item${index === items.length - 1 ? ' status-spacer' : ''}`}
          >
            {item.live && <span className="status-dot" aria-hidden="true" />}
            <span className="status-key">{item.key}</span>
            <span className={`status-val${item.live ? ' status-val-live' : ''}`}>{item.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
