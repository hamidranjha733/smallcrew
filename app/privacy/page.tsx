import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { formatDate, getModified } from '@/lib/dates';
import { buildMetadata, getPageSeo } from '@/lib/seo';
import { AUTHOR_NAME, CONTACT_EMAIL, SITE_NAME, SITE_URL } from '@/lib/site';

const seo = getPageSeo('privacy');

export const metadata: Metadata = buildMetadata(seo, '/privacy/');

// Deliberately short. This page describes what the site actually does, which is
// very little, and says nothing about services it does not run. A policy full
// of clauses about data collection that does not happen is worse than none,
// because it tells the reader the author never checked.
//
// If analytics, a form, a cookie or an affiliate tracking parameter is ever
// added, this page has to change in the same commit.
export default function PrivacyPage() {
  const url = `${SITE_URL}/privacy/`;
  // Falls back to the date this page was written, for the first build before
  // the commit exists in the date map.
  const modified = getModified('/privacy/', '2026-09-30');

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${url}#privacy`,
            name: seo.title,
            description: seo.description,
            url,
            inLanguage: 'en-US',
            dateModified: modified,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumbs`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Privacy', item: url },
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
              <span aria-current="page">Privacy</span>
            </nav>
            <h1>Privacy</h1>
            <p className="page-standfirst">
              This site collects nothing about you. It sets no cookies, runs no analytics and has
              no forms. It loads nothing from anyone else either, so no request about you leaves
              this site at all. That is the whole of it.
            </p>
          </div>

          <div className="contact-card">
            <span className="contact-card-label">Last updated</span>
            <span className="contact-card-email">{formatDate(modified)}</span>
            <span className="contact-card-note">
              This page describes what the site does today. If that changes, this page changes with
              it.
            </span>
          </div>
        </div>
      </div>

      <div className="band band-white">
        <section className="wrapper section" aria-labelledby="collected">
          <div className="section-head">
            <span className="eyebrow">What is collected</span>
            <h2 id="collected">Nothing, by this site</h2>
          </div>
          <div className="reading">
            <p>
              Small Crew is a set of static pages. There is no account to create, no newsletter to
              join, no comment box and no search box. There is no form anywhere on the site, so
              there is no field in which you could give us information even if you wanted to.
            </p>
            <p>
              We do not know who reads this site, which pages are read, or how many people visit.
              That is a real cost to us and it is the honest description of the current setup.
            </p>

            <h2 id="cookies">Cookies</h2>
            <p>
              None. The site sets no cookies, and the pages store nothing in your browser, including
              local storage and session storage. There is no cookie banner because there is nothing
              to consent to.
            </p>

            <h2 id="fonts">Fonts, and the third party there used to be</h2>
            <p>
              The pages use three typefaces, Archivo, Newsreader and IBM Plex Mono. Until 4 October
              2026 they were loaded from{' '}
              <span className="mono-inline">fonts.googleapis.com</span> and{' '}
              <span className="mono-inline">fonts.gstatic.com</span>, which meant your browser
              fetched them from Google directly and Google received your IP address along the way.
              This page said so.
            </p>
            <p>
              They are now served from this site instead, built into it rather than fetched at the
              time you read a page. Google is no longer involved, receives nothing, and is not a
              third party to this site any more.
            </p>
            <p>
              <strong>So there is now no third party at all.</strong> No analytics, no tag manager,
              no advertising pixel, no embedded video, no comment system, no chat widget and no
              font host. Every file a page needs comes from the same place as the page.
            </p>

            <h2 id="email">If you email us</h2>
            <p>
              The <Link href="/contact/">contact page</Link> is a plain mailto link to{' '}
              <span className="mono-inline">{CONTACT_EMAIL}</span>. It is not a form, so your
              message is sent by your own email program and never passes through this site.
            </p>
            <p>
              A message sent to that address is read and replied to, and it stays in that mailbox.
              It is not added to any mailing list, because there is no mailing list. It is not
              passed to a vendor, a marketing tool or anyone else. If you ask for your message to
              be deleted, it will be.
            </p>

            <h2 id="links">Affiliate links, as they stand today</h2>
            <p>
              Every link to a vendor on this site is a plain address with no tracking parameters,
              no affiliate tag and no redirect through a third party. Clicking one takes you
              straight to the vendor, and nothing on our side records that you did.
            </p>
            <p>
              Small Crew intends to earn affiliate commission and has joined no programme yet, so no
              link here earns anything at the moment. If that changes, affiliate links will usually
              carry a tracking parameter that tells the vendor the visit came from this site, and
              this page will be updated to say so before any such link goes live. See{' '}
              <Link href="/about/">how we compare and how we earn</Link> for what commission does
              and does not affect.
            </p>

            <h2 id="hosting">Hosting</h2>
            <p>
              The site is served by Vercel. Like any web host, Vercel handles the request your
              browser makes in order to return the page, which necessarily involves your IP address.
              We have not enabled any Vercel analytics product, so we receive no report, dashboard
              or visitor data from them.
            </p>

            <h2 id="who">Who operates this site</h2>
            <p>
              Small Crew is written and run by {AUTHOR_NAME}, who is also the only person who reads
              the contact address. There is no company, no team and no third party with access to
              anything described on this page. More about the method and the money is on the{' '}
              <Link href="/about/">about page</Link>.
            </p>
            <p>
              Questions about this page go to the same address as everything else, on the{' '}
              <Link href="/contact/">contact page</Link>.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
