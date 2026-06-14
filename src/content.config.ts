import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { siteConfig } from './site.config';

const langField = z.enum(['en', 'ko']).default(siteConfig.lang);

const baseReview = z.object({
  title: z.string(),
  date: z.coerce.date(),
  rating: z.number().min(1).max(10),
  draft: z.boolean().default(false),
  hidden: z.boolean().default(false),
  hideContent: z.boolean().default(false),
  category: z.string().optional(),
  lang: langField,
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    hidden: z.boolean().default(false),
    hideContent: z.boolean().default(false),
    description: z.string().optional(),
    category: z.string().optional(),
    lang: langField,
  }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: baseReview.extend({
    isbn: z.string(),
    author: z.string(),
    cover: z.string().url().optional(),
    grip: z.number().min(1).max(5).optional(),
    resonance: z.number().min(1).max(5).optional(),
  }),
});

const music = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/music' }),
  schema: baseReview.extend({
    artist: z.string(),
    releaseYear: z.number(),
    cover: z.string().url().optional(),
    spotifyUrl: z.string().url().optional(),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: baseReview.extend({
    image: z.string().url().optional(),
    shopUrl: z.string().url().optional(),
  }),
});

export const collections = { posts, books, music, products };
