// Sits above the cost table on every page.
//
// The opening sentence describes the intent rather than claiming a commission
// exists. No affiliate programme has been joined yet and every vendor link is a
// plain url with no tracking on it, so the earlier wording, that some links
// earn a commission if you sign up, was not true at the time of writing. Put it
// back once programmes are approved.
export default function Disclosure() {
  return (
    <aside className="disclosure">
      <span className="label">Affiliate disclosure</span>
      <p>
        Small Crew intends to earn affiliate commission on some of the links on this page, and has
        not joined any affiliate programme yet, so no link here earns anything today. Whether a
        link pays or not, it costs you nothing and it does not change the order of the table below.
        Tools are ordered by how well they fit a crew under twenty people, and several tools listed
        here run no affiliate programme at all.
      </p>
    </aside>
  );
}
