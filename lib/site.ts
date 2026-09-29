// Single source of truth for anything that changes when the domain changes.
// Update SITE_URL here and metadata, the sitemap and robots.txt all follow.

// The www host is the primary one, so it is the canonical host. Everything the
// crawler reads comes from here: metadataBase, every canonical tag, the Open
// Graph urls, the sitemap and robots.txt. Change the host in this one string.
export const SITE_URL = 'https://www.smallcrewsoftware.com';

export const SITE_NAME = 'Small Crew';

export const SITE_TAGLINE = 'Software reviews for service businesses under 20 people.';

export const SITE_DESCRIPTION =
  'Small Crew prices small business software on the tier that actually includes online booking, at one, three and ten users, and dates every price.';

export const AUTHOR_NAME = 'Hamid Ranjha';

/** Stable id for the person node, so every page points at the same author. */
export const AUTHOR_ID = `${SITE_URL}/about/#hamid-ranjha`;

export const CONTACT_EMAIL = 'hamidranjha733@gmail.com';
