// The one affiliate disclosure on this site.
//
// Every page that discloses anything renders it from here, and the footer, the
// about page and the privacy page import DISCLOSURE_SENTENCE so the claim is
// one string in one file. It drifted once: four pages said Small Crew "may earn
// a commission from links on this page" while the rest said no programme had
// been joined, and only the second was true.
//
// What is true today, checked against the markup: every outbound vendor link
// carries rel="nofollow sponsored noopener" and none carries an affiliate
// tracking parameter, so nothing on this site earns anything.
//
// WHEN A PROGRAMME IS APPROVED, change the sentence below and the whole site
// changes with it. Nothing else needs touching.
export const DISCLOSURE_SENTENCE =
  'Small Crew intends to earn affiliate commission and has not joined any programme yet, so no link here earns anything today. It costs you nothing either way, and commission will never change which tools we cover or what we say about them.';

type Props = {
  /** Above the headline on a single vendor page, rather than above a cost table. */
  lead?: boolean;
};

export default function Disclosure({ lead = false }: Props) {
  return (
    <aside className={lead ? 'disclosure disclosure-lead' : 'disclosure'}>
      <span className="label">Affiliate disclosure</span>
      <p>
        {DISCLOSURE_SENTENCE}
        {!lead && (
          <>
            {' '}
            Tools are ordered by how well they fit a crew under twenty people, and several tools
            listed here run no affiliate programme at all.
          </>
        )}
      </p>
      {lead && (
        <p className="disclosure-meta">
          Independent coverage for crews under 20 &#183; Every figure dated
        </p>
      )}
    </aside>
  );
}
