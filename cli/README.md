# xebon CLI

The `xebon` CLI is a tool for scaffolding and maintaining blogs built with the xebon template.

## Installation

```bash
npm install -g xebon
```

## Usage

### Create a New Project

To create a new xebon blog, run:

```bash
xebon create <project-name>
```

This will:
1. Clone the xebon template.
2. Interactively prompt for site title and language.
3. Install dependencies.
4. Re-initialize the git repository.

### Update an Existing Project

To sync your project's framework files with the upstream xebon template while preserving your content and configuration, run:

```bash
xebon update
```

This command preserves:
- `src/content/` (Your books, music, and posts)
- `src/site.config.ts` (Your site settings)

## Commands

- `create <name>`: Scaffold a new blog.
- `update`: Sync framework files with upstream.

## Options

- `--help`: Show help information.
- `--version`: Show version number.
