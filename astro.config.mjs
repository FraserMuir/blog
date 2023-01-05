import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

export default defineConfig({
  site: "https://blog-beta-six-37.vercel.app",
  integrations: [sitemap(), compress()],
});
