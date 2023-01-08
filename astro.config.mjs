import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

const watch = () => {
  return {
    name: "watch-markdown-files",
    handleHotUpdate({ file, server }) {
      if (file.endsWith(".md")) {
        server.ws.send({ type: "full-reload" });
      }
    },
  };
};

export default defineConfig({
  site: "https://blog-beta-six-37.vercel.app",
  integrations: [sitemap(), compress()],
  vite: {
    plugins: [watch()],
  },
});
