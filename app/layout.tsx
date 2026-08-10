import type { Metadata } from 'next';
import Masthead from '@/components/Masthead';
import StatusStrip from '@/components/StatusStrip';
import Footer from '@/components/Footer';
import ClosingBand from '@/components/ClosingBand';
import JsonLd from '@/components/JsonLd';
import { getAllPages } from '@/lib/content';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}. ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME}. ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: `${SITE_NAME}. ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  // PRE LAUNCH: THE WHOLE SITE IS BLOCKED FROM SEARCH ENGINES.
  //
  // This emits <meta name="robots" content="noindex, nofollow"> on every page,
  // because metadata here is inherited by every route that does not override
  // it. Nothing on this site overrides it, so the block is genuinely site wide.
  //
  // REVERSE THIS BEFORE LAUNCH. Restore index: true and follow: true, and
  // restore the allow rule and sitemap reference in app/robots.ts at the same
  // time. Both changes must ship together, because either one alone still
  // keeps the site out of the index.
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pages = await getAllPages();
  const checked = pages[0]?.pricesChecked ?? 'Not published';
  const toolEntries = pages.reduce((sum, page) => sum + page.tools.length, 0);

  return (
    <html lang="en-US">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&family=Newsreader:wght@400;500&display=swap"
        />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#00857a" />
      </head>
      <body>
        <JsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${SITE_URL}/#organization`,
              name: SITE_NAME,
              url: `${SITE_URL}/`,
              description: SITE_DESCRIPTION,
              slogan: SITE_TAGLINE,
              areaServed: { '@type': 'Country', name: 'United States' },
              knowsAbout: [
                'cleaning business software',
                'lawn care software',
                'pest control software',
                'field service management pricing',
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${SITE_URL}/#website`,
              name: SITE_NAME,
              url: `${SITE_URL}/`,
              description: SITE_DESCRIPTION,
              inLanguage: 'en-US',
              publisher: { '@id': `${SITE_URL}/#organization` },
            },
          ]}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Masthead />
        <StatusStrip
          items={[
            { key: 'Prices checked', value: checked, live: true },
            { key: 'Guides', value: String(pages.length) },
            { key: 'Tool entries', value: String(toolEntries) },
            { key: 'Basis', value: 'Lowest tier with online booking' },
          ]}
        />
        <main id="main">{children}</main>
        <ClosingBand checked={checked} />
        <Footer checked={checked} guides={pages.length} toolEntries={toolEntries} />
      </body>
    </html>
  );
}
