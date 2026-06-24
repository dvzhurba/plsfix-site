import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Single source of truth: the Markdown in ../website-content (repo root).
// Adding a file there adds it to the site — no layout code to touch.

const links = z
  .array(z.object({ label: z.string(), href: z.string() }))
  .default([]);

// Singleton pages: home / about / cv
const pages = defineCollection({
  loader: glob({ pattern: '{home,about,cv}.md', base: '../website-content' }),
  schema: z.object({ title: z.string().optional() }).passthrough(),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../website-content/writing' }),
  schema: z
    .object({
      title: z.string(),
      date: z.coerce.string().optional(),
      summary: z.string().optional(),
      publication: z.coerce.string().optional(),
      external_url: z.string().optional(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      status: z.string().optional(),
    })
    .passthrough(),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../website-content/work' }),
  schema: z
    .object({
      title: z.string(),
      role: z.string().optional(),
      dates: z.string().optional(),
      summary: z.string().optional(),
      contribution: z.string().optional(),
      outcome: z.string().optional(),
      links,
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
    })
    .passthrough(),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../website-content/talks' }),
  schema: z
    .object({
      title: z.string(),
      date: z.coerce.string().optional(),
      type: z.string().optional(),
      venue: z.coerce.string().optional(),
      url: z.string().optional(),
      note: z.coerce.string().optional(),
    })
    .passthrough(),
});

const recognition = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../website-content/recognition' }),
  schema: z
    .object({
      title: z.string(),
      date: z.coerce.string().optional(),
      type: z.string().optional(),
      venue: z.coerce.string().optional(),
      url: z.string().optional(),
      note: z.coerce.string().optional(),
    })
    .passthrough(),
});

export const collections = { pages, writing, work, talks, recognition };
