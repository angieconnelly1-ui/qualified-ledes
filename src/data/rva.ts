import { getCollection, type CollectionEntry } from 'astro:content';
export type RvaRoundup = CollectionEntry<'rva'>;
export const RVA = {
  name: 'RVA Ledes',
  path: '/rva/',
  h1: 'RVA Ledes: Richmond Business News for Marketers and Owners',
  blurb:
    'A weekly roundup of Richmond and Virginia business news for B2B teams, small business owners and nonprofits: who is hiring, buying and launching, what lawmakers are proposing, and which events are worth your time.',
};
export async function getRvaRoundups(): Promise<RvaRoundup[]> {
  const all = await getCollection('rva', (r) => !r.data.draft);
  return all.sort((a, b) => b.data.date.localeCompare(a.data.date));
}
