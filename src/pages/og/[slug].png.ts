// One 1200 x 630 share image per story, drawn at build time.
// Used for og:image, Twitter cards and the NewsArticle image in structured data.
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getStories } from '../../data/stories';
import { TOPICS } from '../../data/taxonomy';
import { SITE } from '../../data/site';

const require = createRequire(import.meta.url);
const font = (p: string) => readFileSync(require.resolve(p));
const serif = font('@fontsource/dm-serif-display/files/dm-serif-display-latin-400-normal.woff');
const sans = font('@fontsource/inter/files/inter-latin-400-normal.woff');
const sansBold = font('@fontsource/inter/files/inter-latin-600-normal.woff');

const HEAT: Record<string, { label: string; bg: string; ink: string; bar: string }> = {
  hot: { label: 'Hot lede', bg: '#fde3db', ink: '#9a3412', bar: '#c2452d' },
  warm: { label: 'Warm lede', bg: '#fbefc8', ink: '#7c4a03', bar: '#d9a21b' },
  cold: { label: 'Cold lede', bg: '#dcebf5', ink: '#1d4f6f', bar: '#3b82b0' },
};

export const getStaticPaths: GetStaticPaths = async () => {
  const stories = await getStories();
  return stories.map((s) => ({ params: { slug: s.id }, props: { story: s } }));
};

// Plain object tree in the shape satori expects (no JSX needed).
const el = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const d = (props as { story: Awaited<ReturnType<typeof getStories>>[number] }).story.data;
  const heat = HEAT[d.heat];
  const topic = TOPICS.find((t) => t.id === d.topic)?.label ?? '';
  const size = d.headline.length > 70 ? 64 : d.headline.length > 45 ? 76 : 88;

  const tree = el('div', { width: 1200, height: 630, display: 'flex', flexDirection: 'column', background: '#f7f6f2', fontFamily: 'Inter' }, [
    el('div', { height: 14, width: '100%', background: heat.bar }),
    el('div', { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '56px 72px 60px' }, [
      el('div', { display: 'flex', alignItems: 'center', gap: 16 }, [
        el('div', { display: 'flex', background: heat.bg, color: heat.ink, fontWeight: 600, fontSize: 24, letterSpacing: 1.5, padding: '8px 18px', borderRadius: 999 }, heat.label.toUpperCase()),
        el('div', { display: 'flex', color: '#5a606a', fontSize: 26 }, topic),
      ]),
      el('div', { display: 'flex', fontFamily: 'DM Serif Display', color: '#1d2025', fontSize: size, lineHeight: 1.08, letterSpacing: -1 }, d.headline),
      el('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(29,32,37,0.18)', paddingTop: 24 }, [
        el('div', { display: 'flex', fontFamily: 'DM Serif Display', fontSize: 38, color: '#1d2025' }, SITE.name),
        el('div', { display: 'flex', fontSize: 24, color: '#5a606a' }, 'qualifiedledes.com'),
      ]),
    ]),
  ]);

  const svg = await satori(tree as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'DM Serif Display', data: serif, weight: 400, style: 'normal' },
      { name: 'Inter', data: sans, weight: 400, style: 'normal' },
      { name: 'Inter', data: sansBold, weight: 600, style: 'normal' },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
