export const SITE = {
  name: 'Qualified Ledes',
  tagline: 'Pre-qualified marketing news. No nurture sequence required.',
  description:
    'Daily marketing news for small businesses, nonprofits and the marketers who serve them: what changed, why it matters, and what to do about it.',
  url: 'https://qualifiedledes.com',
  author: 'Angie Connelly',
  authorUrl: 'https://angieconnelly.com',
  authorLinkedIn: 'https://www.linkedin.com/in/angie-connelly/',
  authorBio:
    'Angie Connelly is a demand generation and revenue operations leader with more than 11 years in B2B marketing, and an independent consultant to small businesses, nonprofits and MSPs in Richmond, Virginia.',
  helpUrl: 'https://angieconnelly.com/free-visibility-check',
  ogImage: '/og-default.png',
  // GA4 Measurement ID (G-XXXXXXX). Leave empty to load no analytics.
  gaId: 'G-JMRQ1ZD4XF',
};

// Free-check link with UTMs, so angieconnelly.com's GA4 can tie its conversions back to this site.
export function helpLink(content: string, slug?: string): string {
  const u = new URL(SITE.helpUrl);
  u.searchParams.set('utm_source', 'qualifiedledes');
  u.searchParams.set('utm_medium', 'referral');
  u.searchParams.set('utm_campaign', 'free_visibility_check');
  u.searchParams.set('utm_content', slug ? `${content}-${slug}` : content);
  return u.href;
}

// The free resource of the week. Swap it out with each roundup.
export const MAGNET = {
  title: 'The 10-minute cookie consent check',
  description: 'A plain-English checklist to make sure your site respects visitors who say no, before holiday traffic hits.',
  url: '', // add the checklist link when it is ready
};
