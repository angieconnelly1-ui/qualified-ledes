# Qualified Ledes

Pre-qualified marketing news. No nurture sequence required.

Astro static site, deployed on Netlify. Stories are added once or twice a day; a weekly roundup goes out by email.

## Adding stories

Each story is one JSON file in `src/content/stories/`, named `YYYY-MM-DD-short-slug.json`:

```json
{
  "date": "2026-11-22",
  "heat": "hot",
  "topic": "ai",
  "audience": "both",
  "headline": "Short headline in our own words",
  "dek": "Two or three sentences on what happened.",
  "why": "One or two sentences on why it matters to readers.",
  "doThis": "One concrete step for the reader.",
  "source": "Outlet name",
  "url": "https://link-to-the-original",
  "featured": false
}
```

- `heat`: `hot` (do it this week), `warm` (worth a test), `cold` (good to know)
- `topic`: `ai`, `local`, `ads`, `web`, `nonprofit`, `b2b`, `privacy`, `rva`, `offers` (labels in `src/data/taxonomy.ts`)
- `audience`: `main` (owners and nonprofits), `trade` (marketers), `both`
- `featured`: optional; puts the story first on its day
- `why`: optional but recommended; shown as "Why it matters" on the story page
- `take`: optional first-person note from Angie, added during review; shown as "Angie's take"

## Guides

Evergreen explainers live in `src/content/guides/` as Markdown with frontmatter: `title`, `seoTitle`, `description`, `topic`, `audience`, `published`, `updated`, `answer` (the direct answer shown first), `faq` (list of `q`/`a`), `sources` (list of `title`/`url`), optional `draft`. Guides appear on their topic hub, on `/guides/`, on audience pages, and as a "Go deeper" link on story pages in the same topic. Update the `updated` date whenever facts change.

## Information architecture

Topic hubs live at keyword URLs (`/topics/ai-search-seo/` and so on; see `slug` in `src/data/taxonomy.ts`). Story files keep the short topic ids. Old `/topics/<id>/` URLs redirect via `public/_redirects`. Audience pages: `/for/small-business/` and `/for/marketers/`.

## Weekly roundup

One JSON file per week in `src/content/roundups/`. `picks` lists story file names (without `.json`). Set `draft: true` until it is approved; drafts are hidden from the RSS feed that the email tool reads, and set to noindex.

## Signups

The signup form uses Netlify Forms (form name `subscribe`). Enable form detection in Netlify, then export the list when an email tool is chosen.

## Commands

- `npm install`
- `npm run dev`: local preview at http://localhost:4321
- `npm run build`: builds to `dist/`

## Rules

- Summaries in our own words; at most one short quote per source; always link the source.
- No cybersecurity or identity-security topics. No employer references.
