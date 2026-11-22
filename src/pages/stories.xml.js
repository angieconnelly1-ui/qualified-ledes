import rss from '@astrojs/rss';
import { getStories } from '../data/stories';
import { topicLabel } from '../data/taxonomy';
import { SITE } from '../data/site';

// Every story, newest first.
export async function GET(context) {
  const stories = (await getStories()).slice(0, 50);
  return rss({
    title: `${SITE.name}: daily ledes`,
    description: SITE.description,
    site: context.site,
    items: stories.map((s) => ({
      title: s.data.headline,
      pubDate: new Date(`${s.data.date}T12:00:00Z`),
      description: `${s.data.dek} Do this: ${s.data.doThis}`,
      link: `/stories/${s.id}/`,
      categories: [topicLabel(s.data.topic)],
    })),
  });
}
