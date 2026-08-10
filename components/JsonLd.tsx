type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

// Structured data is emitted as a single script tag per block. JSON.stringify
// guarantees the payload parses, and the closing tag is escaped so a value
// containing "</script>" cannot break out of the element.
export default function JsonLd({ data }: Props) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
