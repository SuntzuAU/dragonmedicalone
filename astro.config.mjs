import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://dragonmedicalone.au',
  integrations: [sitemap({
    filter: (page) => !page.includes('/404')
  })]
});
