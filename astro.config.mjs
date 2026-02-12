import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.ecopywriting.pl',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
