export const TOPICS = [
  { id: 'ai', label: 'AI search and SEO', blurb: 'How people find businesses in Google, ChatGPT, Perplexity and AI answers, and what to do about it.' },
  { id: 'local', label: 'Local and Google profile', blurb: 'Google Business Profile, reviews, maps and local search for businesses with a real-world address.' },
  { id: 'ads', label: 'Ads and social', blurb: 'Google, Meta, Microsoft, LinkedIn and social platform changes that affect small budgets.' },
  { id: 'web', label: 'Websites and tools', blurb: 'Website builders, AI tools and site basics a small team can actually use.' },
  { id: 'nonprofit', label: 'Nonprofits', blurb: 'Ad Grants, donor marketing and tech programs for nonprofits.' },
  { id: 'b2b', label: 'B2B and MSP', blurb: 'Marketing and selling for B2B, IT services and managed service providers.' },
  { id: 'privacy', label: 'Privacy and consent', blurb: 'Cookie consent, email and SMS rules, and privacy laws that touch marketing.' },
  { id: 'rva', label: 'Richmond and Virginia', blurb: 'Business news, lists, programs and events around Richmond and across Virginia.' },
  { id: 'offers', label: 'Pricing and offers', blurb: 'What freelancers and small agencies are packaging, pricing and giving away.' },
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
