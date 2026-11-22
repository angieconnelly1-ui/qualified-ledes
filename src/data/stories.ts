import { getCollection, type CollectionEntry } from 'astro:content';

export type Story = CollectionEntry<'stories'>;
const HEAT_ORDER: Record<string, number> = { hot: 0, warm: 1, cold: 2 };

export async function getStories(): Promise<Story[]> {
  const all = await getCollection('stories');
  return all.sort(
    (a, b) =>
      b.data.date.localeCompare(a.data.date) ||
      Number(!!b.data.featured) - Number(!!a.data.featured) ||
      HEAT_ORDER[a.data.heat] - HEAT_ORDER[b.data.heat]
  );
}

export function groupByDate(stories: Story[]) {
  const groups: { date: string; stories: Story[] }[] = [];
  for (const s of stories) {
    const last = groups[groups.length - 1];
    if (last && last.date === s.data.date) last.stories.push(s);
    else groups.push({ date: s.data.date, stories: [s] });
  }
  return groups;
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('en-US', { ...opts, timeZone: 'UTC' });
}
