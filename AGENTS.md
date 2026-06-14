# Repository Guidelines

## Project Structure & Module Organization
The root package is the Astro site. Main routes live in `src/pages/`, shared content helpers in `src/lib/`, locale helpers in `src/i18n/`, and site settings in `src/site.config.ts`. Content is Markdown under `src/content/{posts,books,music,products}` and must match the schemas in `src/content.config.ts`. Theme assets and layouts live in `src/themes/default/`; switch themes through `ACTIVE_THEME` in `astro.config.ts`.

The `cli/` directory is a separate Node package for the `xebon` scaffold/update tool. Command entrypoints live in `cli/src/commands/`. Do not commit generated output from `dist/`, `.astro/`, or `node_modules/`.

## Build, Test, and Development Commands
Run site work from the repo root:

- `npm install`: install Astro dependencies.
- `npm run dev`: start the local site at `http://localhost:4321`.
- `npm run build`: create the production build in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run check`: run Astro diagnostics and type checks.

Run CLI work from `cli/`:

- `npm install`: install CLI dependencies.
- `npm run typecheck`: strict TypeScript check for the CLI.
- `npm run build`: bundle the CLI into `cli/dist/index.js`.

## Coding Style & Naming Conventions
Match the existing 2-space indentation and ESM TypeScript style. Use `PascalCase` for Astro components and content-type files, `camelCase` for variables/helpers, and kebab-case for Markdown filenames and route slugs such as `src/content/posts/hello-world.md`. Keep content schema changes centralized in `src/content.config.ts` and keep site-wide defaults in `src/site.config.ts`.

## Testing Guidelines
There is no dedicated unit test suite yet. Validate site changes with `npm run build`; validate CLI changes with `cd cli && npm run typecheck && npm run build`. For route, theme, or schema updates, also smoke-test with `npm run dev`. If `npm run check` is unstable in your environment, note that explicitly in the PR.

## Commit & Pull Request Guidelines
Follow the existing commit style: short, imperative, sentence-case summaries such as `Add CLI tool for scaffolding and updating xebon blogs`. Keep each commit focused on one concern. PRs should describe the affected area (`site`, `theme`, `content schema`, or `cli`), link any issue, include screenshots for visible UI/theme changes, and provide example commands or terminal output for CLI behavior changes.
