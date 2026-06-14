import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type AnyEntry =
  | CollectionEntry<'posts'>
  | CollectionEntry<'books'>
  | CollectionEntry<'music'>
  | CollectionEntry<'products'>;

export function entrySlug(entry: AnyEntry): string {
  return entry.id.replace(/\.[^.]+$/, '');
}

export async function getAllEntries(lang?: Lang): Promise<AnyEntry[]> {
  const filter = (e: AnyEntry) =>
    !e.data.draft && !e.data.hidden && (lang === undefined || e.data.lang === lang);

  const [posts, books, music, products] = await Promise.all([
    getCollection('posts', (e) => filter(e as AnyEntry)),
    getCollection('books', (e) => filter(e as AnyEntry)),
    getCollection('music', (e) => filter(e as AnyEntry)),
    getCollection('products', (e) => filter(e as AnyEntry)),
  ]);
  return [...posts, ...books, ...music, ...products].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
}
