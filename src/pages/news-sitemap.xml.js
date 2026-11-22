import { getStories } from '../data/stories';
import { SITE } from '../data/site';

// Google News sitemap: stories from the last 2 days (relative to build time).
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  const cutoff = Date.now() - 2 * 24 * 60 * 60 * 1000;
  const recent = (await getStories()).filter((s) => new Date(`${s.data.date}T12:00:00Z`).getTime() >= cutoff);
  const urls = recent
    .map(
      (s) => `  <url>
    <loc>${SITE.url}/stories/${s.id}/</loc>
    <news:news>
      <news:publication><news:name>${esc(SITE.name)}</news:name><news:language>en</news:language></news:publication>
      <news:publication_date>${s.data.date}</news:publication_date>
      <news:title>${esc(s.data.headline)}</news:title>
    </news:news>
  </url>`
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
