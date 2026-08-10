export type CrewIconName = 'solo' | 'pair' | 'van' | 'desk';

type Props = {
  name: CrewIconName;
};

// Hand drawn line icons for the crew picker. Inline so they inherit colour and
// need no extra request.
export default function CrewIcon({ name }: Props) {
  const common = {
    className: 'crew-icon',
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (name === 'solo') {
    return (
      <svg {...common}>
        <circle cx="16" cy="11" r="4.5" />
        <path d="M7.5 26c0-4.7 3.8-7.5 8.5-7.5s8.5 2.8 8.5 7.5" />
      </svg>
    );
  }

  if (name === 'pair') {
    return (
      <svg {...common}>
        <circle cx="12" cy="11" r="4" />
        <path d="M4 26c0-4.4 3.6-7 8-7s8 2.6 8 7" />
        <circle cx="23" cy="12.5" r="3.2" />
        <path d="M22 19.6c3.4.4 6 2.9 6 6.4" />
      </svg>
    );
  }

  if (name === 'van') {
    return (
      <svg {...common}>
        <path d="M3 21V10h13v11" />
        <path d="M16 13h5.5l4.5 4.6V21" />
        <path d="M3 21h2M12 21h7M26 21h3" />
        <circle cx="8.5" cy="23" r="2.6" />
        <circle cx="22.5" cy="23" r="2.6" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="4" y="7" width="24" height="14" />
      <path d="M4 25h24M12 21v4M20 21v4" />
      <path d="M9 12h8M9 16h5" />
    </svg>
  );
}
