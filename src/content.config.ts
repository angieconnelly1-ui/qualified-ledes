import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TOPIC_IDS } from './data/taxonomy';

// One file per story. The daily pipeline adds 1 to 2 batches a day.
const stories = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/stories' }),
  schema: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    heat: z.enum(['hot', 'warm', 'cold']),
    topic: z.enum(TOPIC_IDS),
    audience: z.enum(['main', 'trade', 'both']),
    headline: z.string(),
    dek: z.string(),
    why: z.string().optional(),
    doThis: z.string(),
    source: z.string(),
    url: z.string().url(),
    featured: z.boolean().optional(),
    // Optional first-person note from Angie, added during review.
    take: z.string().optional(),
    // Set to the correction date (YYYY-MM-DD) when a published story is corrected; becomes dateModified.
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  }),
});

// The weekly roundup: the week's best stories plus a short intro. Feeds the email.
const roundups = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/roundups' }),
  schema: z.object({
    number: z.number(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    title: z.string(),
    intro: z.string(),
    picks: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
});

// Evergreen guides: one question answered well, with sources and FAQ.
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    topic: z.enum(TOPIC_IDS),
    audience: z.enum(['main', 'trade', 'both']),
    published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    answer: z.string(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
    draft: z.boolean().optional(),
  }),
});

// RVA Ledes: the weekly Richmond B2B news roundup, one Markdown file per week.
const rva = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rva' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    summary: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    takeaways: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    faq: z
      .array(z.object({ q: z.string(), a: z.string(), link: z.object({ href: z.string(), text: z.string() }).optional() }))
      .default([]),
    draft: z.boolean().optional(),
  }),
});

export const collections = { stories, roundups, guides, rva };
