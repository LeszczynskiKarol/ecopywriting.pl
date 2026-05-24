import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.ecopywriting.pl",
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [sitemap()],
});
