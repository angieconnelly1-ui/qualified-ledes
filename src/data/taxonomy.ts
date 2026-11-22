export const TOPICS = [
  { id: 'ai', slug: 'ai-search-seo', label: 'AI search and SEO', h1: 'AI Search and SEO News for Small Businesses', blurb: 'How people find businesses in Google, ChatGPT, Perplexity and AI answers, and what to do about it.' },
  { id: 'local', slug: 'local-seo-google-business-profile', label: 'Local SEO and Google Business Profile', h1: 'Local SEO and Google Business Profile News', blurb: 'Google Business Profile, reviews, maps and local search for businesses with a real-world address or service area.' },
  { id: 'ads', slug: 'ads-social-media', label: 'Ads and social media', h1: 'Ads and Social Media News for Small Budgets', blurb: 'Google, Meta, Microsoft, LinkedIn and social platform changes that affect small advertising budgets.' },
  { id: 'web', slug: 'websites-ai-tools', label: 'Websites and AI tools', h1: 'Website and AI Tool News for Small Teams', blurb: 'Website builders, AI marketing tools and site basics a small team can actually use.' },
  { id: 'nonprofit', slug: 'nonprofit-marketing', label: 'Nonprofit marketing', h1: 'Nonprofit Marketing News and Guides', blurb: 'Google Ad Grants, donor marketing, nonprofit tech programs and marketing strategy for nonprofits.' },
  { id: 'b2b', slug: 'msp-b2b-marketing', label: 'MSP and B2B marketing', h1: 'MSP and B2B Marketing News', blurb: 'Marketing and selling for B2B companies, IT services firms and managed service providers.' },
  { id: 'privacy', slug: 'privacy-consent', label: 'Privacy and consent', h1: 'Marketing Privacy and Consent News', blurb: 'Cookie consent, email and SMS rules, and privacy laws that touch marketing.' },
  { id: 'rva', slug: 'richmond-virginia-business', label: 'Richmond and Virginia', h1: 'Richmond and Virginia Business News for Marketers', blurb: 'Business news, lists, programs and events around Richmond and across Virginia.' },
  { id: 'offers', slug: 'freelance-agency-pricing', label: 'Pricing and offers', h1: 'Freelance and Agency Pricing and Offers', blurb: 'What freelancers and small agencies are packaging, pricing and giving away.' },
] as const;

export const TOPIC_IDS = TOPICS.map((t) => t.id) as unknown as [string, ...string[]];

export const AUDIENCES = [
  { id: 'main', label: 'Main Street', long: 'Main Street: owners and nonprofits' },
  { id: 'trade', label: 'Trade Desk', long: 'Trade Desk: marketers' },
] as const;

export const HEATS = [
  { id: 'hot', label: 'Hot', stamp: 'Hot lede', meaning: 'Do it this week.' },
  { id: 'warm', label: 'Warm', stamp: 'Warm lede', meaning: 'Worth a small test.' },
  { id: 'cold', label: 'Cold', stamp: 'Cold lede', meaning: 'Good to know. Keep an eye on it.' },
] as const;

export const topicLabel = (id: string) => TOPICS.find((t) => t.id === id)?.label ?? id;
export const audienceLabel = (id: string) =>
  id === 'both' ? 'Main Street + Trade Desk' : AUDIENCES.find((a) => a.id === id)?.label ?? id;
export const heatInfo = (id: string) => HEATS.find((h) => h.id === id)!;

export const topicBySlug = (slug: string) => TOPICS.find((t) => t.slug === slug);
export const topicUrl = (id: string) => `/topics/${TOPICS.find((t) => t.id === id)?.slug ?? id}/`;
