# xebon

A static site for book, music, and product reviews. Built with [Astro](https://astro.build).

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:4321` in your browser.

## Commands

| Command           | Description                     |
|-------------------|---------------------------------|
| `npm run dev`     | Start local dev server          |
| `npm run build`   | Build for production            |
| `npm run preview` | Preview the production build    |
| `npm run check`   | Run TypeScript type checking    |

## Content

Content lives in `src/content/` as markdown files with YAML frontmatter.

### Collections

**`posts/`** — Blog posts

```yaml
title: Post title
date: 2026-01-01
description: Optional summary
category: optional-category
lang: ko # optional, defaults to ko
```

**`books/`** — Book reviews

```yaml
title: Book title
date: 2026-01-01
author: Author Name
isbn: "0000000000"
cover: https://...
rating: 8        # 1–10
grip: 4          # 1–5, how hard to put down
resonance: 5     # 1–5, lasting impact
lang: ko         # optional, defaults to ko
```

**`music/`** — Music reviews

```yaml
title: Album title
date: 2026-01-01
artist: Artist Name
releaseYear: 2024
cover: https://...
spotifyUrl: https://...
rating: 7        # 1–10
lang: ko         # optional, defaults to ko
```

**`products/`** — Product reviews

```yaml
title: Product name
date: 2026-01-01
image: https://...
shopUrl: https://...
rating: 8        # 1–10
lang: ko         # optional, defaults to ko
```

### Frontmatter flags

| Flag          | Effect                                      |
|---------------|---------------------------------------------|
| `draft: true` | Excluded from all builds                    |
| `hidden: true`| Excluded from listings and direct URLs      |
| `hideContent: true` | Shows metadata but hides the body     |
| `category`    | Groups entries under a category route       |
| `lang`        | Controls page locale formatting, not the route |

### Category routes

Entries with a `category` field are accessible at `/<collection>/<category>`. For example, a book with `category: non-fiction` appears at `/books/non-fiction`.

## Themes

The active theme is set in `astro.config.ts`:

```ts
const ACTIVE_THEME = 'default';
```

Theme files live in `src/themes/<name>/`. Each theme provides layouts, per-collection components, and a `theme.css`. The `@theme` alias in imports resolves to the active theme directory.
