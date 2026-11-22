import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../data/site';

// Weekly roundups. Point the email tool's RSS-to-email feature here.
export async function GET(context) {
  const roundups = (await getCollection('roundups')).filter((r) => !r.data.draft);
  return rss({
    title: `${SITE.name}: weekly roundup`,
    description: SITE.description,
    site: context.site,
    items: roundups
      .sort((a, b) => b.data.number - a.data.number)
      .map((r) => ({
        title: `No. ${r.data.number}: ${r.data.title}`,
        pubDate: new Date(`${r.data.date}T12:00:00Z`),
        description: r.data.intro,
        link: `/roundups/${r.id}/`,
      })),
  });
}
