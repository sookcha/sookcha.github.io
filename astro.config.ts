import { defineConfig } from 'astro/config';

const ACTIVE_THEME = 'default';

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@theme': new URL(`./src/themes/${ACTIVE_THEME}`, import.meta.url).pathname,
      },
    },
  },
});
