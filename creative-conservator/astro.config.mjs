// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.creativeconservator.com',
  output: 'static',
  adapter: vercel({
    imageService: true,
  }),
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
