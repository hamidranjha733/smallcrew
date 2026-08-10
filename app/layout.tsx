import type { Metadata } from 'next';
import Masthead from '@/components/Masthead';
import StatusStrip from '@/components/StatusStrip';
import Footer from '@/components/Footer';
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
    <html lang="en-US">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&family=Newsreader:wght@400;500&display=swap"
        />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#0f5132" />
      </head>
      <body>
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
        <Footer checked={checked} guides={pages.length} toolEntries={toolEntries} />
      </body>
    </html>
  );
}
