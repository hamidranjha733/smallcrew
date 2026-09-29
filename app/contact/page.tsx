import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { getPageSeo } from '@/lib/seo';
import { AUTHOR_NAME, CONTACT_EMAIL, SITE_NAME, SITE_URL } from '@/lib/site';

const seo = getPageSeo('contact');

export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: '/contact/' },
  openGraph: {
    type: 'website',
    title: seo.title,
    description: seo.description,
    url: '/contact/',
  },
  twitter: {
    card: 'summary',
    title: seo.title,
    description: seo.description,
  },
};

export default function ContactPage() {
  const url = `${SITE_URL}/contact/`;

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            '@id': `${url}#contact`,
            name: seo.title,
            description: seo.description,
            url,
            inLanguage: 'en-US',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            publisher: { '@id': `${SITE_URL}/#organization` },
            mainEntity: {
              '@type': 'Organization',
              '@id': `${SITE_URL}/#organization`,
              email: CONTACT_EMAIL,
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'editorial',
                email: CONTACT_EMAIL,
                availableLanguage: 'English',
              },
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumbs`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Contact', item: url },
            ],
          },
        ]}
      />

      <div className="hero-band hero-band-short">
        <div className="wrapper page-head">
          <div>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Small Crew</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Contact</span>
            </nav>
            <h1>Contact Small Crew</h1>
            <p className="page-standfirst">
              One address, read by one person. Corrections to a price are the most useful thing you
              can send, and they get priority over everything else.
            </p>
          </div>

          <div className="contact-card">
            <span className="contact-card-label">Email</span>
            <a className="contact-card-email" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            <span className="contact-card-note">
              Written and answered by {AUTHOR_NAME}. Expect a reply within a few days.
            </span>
          </div>
        </div>
      </div>

      <div className="band band-white">
        <section className="wrapper section" aria-labelledby="what-to-send">
          <div className="section-head">
            <span className="eyebrow">What to send</span>
            <h2 id="what-to-send">The four things worth writing about</h2>
          </div>
          <div className="reading">
            <p>
              <strong>A price that is wrong.</strong> This is the most valuable message this site
              receives. Vendor pricing changes several times a year and every page here carries the
              month its figures were read. If a page is out of date, say which tool and which plan,
              and it will be re verified against the vendor pricing page rather than simply
              corrected on your word. A link to the page you are reading helps.
            </p>
            <p>
              <strong>A tool that should be in a comparison and is not.</strong> The tools on each
              page are the ones most often put in front of a small operator, not an exhaustive
              list. If something is missing that a cleaning, lawn care or pest control company
              under twenty staff would genuinely consider, it is worth adding.
            </p>
            <p>
              <strong>A correction to a claim about a feature.</strong> Every statement here comes
              from a vendor page that was read, not from using the software. Vendors change what
              their tiers include, and a feature that moved between plans changes which tier a
              business actually needs, which is the whole basis of this site.
            </p>
            <p>
              <strong>A vendor enquiry.</strong> If you work for one of the companies compared
              here, corrections to your own pricing are welcome and will be checked the same way as
              anyone else's. Note that where a tool appears is decided by how well it fits a crew
              under twenty people. That is not for sale, and an affiliate relationship does not
              change it. See{' '}
              <Link href="/about/">how we compare and how we earn</Link> for the full statement.
            </p>
          </div>
        </section>
      </div>

      <div className="band band-surface">
        <section className="wrapper section" aria-labelledby="what-not">
          <div className="section-head">
            <span className="eyebrow">What not to send</span>
            <h2 id="what-not">Guest posts and link requests</h2>
          </div>
          <div className="reading">
            <p>
              Small Crew does not publish guest posts, does not accept paid placements and does not
              sell links. There is no rate card because there is nothing to buy. Messages offering
              any of these are deleted unread, and a paid link would defeat the only reason this
              site is worth reading.
            </p>
            <p>
              Requests to remove a fair criticism will not be actioned either. Every tool on this
              site carries a section on where it is the wrong choice, including the ones rated
              highest, because a comparison where every option is excellent is a comparison written
              for the vendors. A factual error is a different matter and will be fixed quickly.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
