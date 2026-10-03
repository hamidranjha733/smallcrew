import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono, Newsreader } from 'next/font/google';
import Masthead from '@/components/Masthead';
import StatusStrip from '@/components/StatusStrip';
import Footer from '@/components/Footer';
import ClosingBand from '@/components/ClosingBand';
import JsonLd from '@/components/JsonLd';
import { getAllPages } from '@/lib/content';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/site';
import './globals.css';

// Self hosted at build time by next/font, so no request leaves for Google. The
// weights are exactly the ones the stylesheet used to request: loading more
// would cost bytes for faces nothing on the site sets.
//
// The share cards do not use these. scripts/make-og.mjs reads its own static
// ttf files from assets/fonts, because satori needs real font bytes.
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  display: 'swap',
  variable: '--font-archivo',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-mono',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-newsreader',
});

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
  // The site is live and indexable. This is stated rather than left to the
  // default so that the setting is visible in the built HTML and can be
  // asserted by the audit. It pairs with the allow rule in app/robots.ts, and
  // the two must always agree.
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pages = await getAllPages();
  const checked = pages[0]?.pricesChecked ?? 'Not published';
  const toolEntries = pages.reduce((sum, page) => sum + page.tools.length, 0);

  return (
    <html
      lang="en-US"
      className={`${archivo.variable} ${plexMono.variable} ${newsreader.variable}`}
    >
      <head>
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
