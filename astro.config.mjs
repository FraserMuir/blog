import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";

export default defineConfig({
  site: "https://blog-beta-six-37.vercel.app",
  integrations: [sitemap(), tailwind(), compress()],
});
