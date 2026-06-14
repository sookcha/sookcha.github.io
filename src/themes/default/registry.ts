import type { AnyEntry } from '../../lib/content';
import Post from './content-types/Post.astro';
import BookReview from './content-types/BookReview.astro';
import MusicReview from './content-types/MusicReview.astro';
import ProductReview from './content-types/ProductReview.astro';

export const components = {
  posts: Post,
  books: BookReview,
  music: MusicReview,
  products: ProductReview,
} satisfies Record<AnyEntry['collection'], unknown>;
