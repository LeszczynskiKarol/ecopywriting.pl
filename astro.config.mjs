import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const BUILD_TIME = new Date().toISOString();

export default defineConfig({
  site: "https://www.ecopywriting.pl",
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(BUILD_TIME),
      serialize(item) {
        // Homepage — najważniejsza, częstsza re-crawl
        if (item.url === "https://www.ecopywriting.pl/") {
          item.priority = 1.0;
          item.changefreq = "weekly";
        }
        // Hub blog + cennik + kontakt — średnio
        else if (
          item.url === "https://www.ecopywriting.pl/blog/" ||
          item.url === "https://www.ecopywriting.pl/cennik/" ||
          item.url === "https://www.ecopywriting.pl/kontakt/"
        ) {
          item.priority = 0.9;
          item.changefreq = "weekly";
        }
        // Strony usług — średnio-wysoki priorytet
        else if (item.url.includes("/uslugi/")) {
          item.priority = 0.8;
          item.changefreq = "monthly";
        }
        // Wpisy blogowe — niższy priorytet, rzadziej
        else if (item.url.includes("/blog/")) {
          item.priority = 0.6;
          item.changefreq = "yearly";
        }
        return item;
      },
    }),
  ],
});
