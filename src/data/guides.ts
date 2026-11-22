import { getCollection, type CollectionEntry } from 'astro:content';
export type Guide = CollectionEntry<'guides'>;
export async function getGuides(): Promise<Guide[]> {
  const all = await getCollection('guides', (g) => !g.data.draft);
  return all.sort((a, b) => b.data.updated.localeCompare(a.data.updated));
}
