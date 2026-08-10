import { getVendor, monogram } from '@/lib/vendors';

type Props = {
  tool: string;
  size?: 'sm' | 'lg';
};

// Vendor mark beside every tool name. Logos are served from /public/logos, so
// nothing is requested from a third party when a reader opens the page. Any
// vendor without a stored mark falls back to a monogram tile.
export default function VendorLogo({ tool, size = 'sm' }: Props) {
  const vendor = getVendor(tool);
  const className = size === 'lg' ? 'vlogo vlogo-lg' : 'vlogo';

  if (!vendor) {
    return (
      <span className={className} role="img" aria-label={`${tool} logo`}>
        <span className="vlogo-mono" aria-hidden="true">
          {monogram(tool)}
        </span>
      </span>
    );
  }

  return (
    <span className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={vendor.logo}
        alt={`${tool} logo`}
        width={24}
        height={24}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
