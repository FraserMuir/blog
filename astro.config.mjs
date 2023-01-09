import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

const watchContent = (extensions = [".md"]) => ({
  name: "watch-content",
  handleHotUpdate({ file, server }) {
    if (extensions.some((ext) => `.${file.split(".").pop()}` === ext)) {
      server.ws.send({ type: "full-reload" });
    }
  },
});

export default defineConfig({
  site: "https://fraserr.com",
  integrations: [sitemap(), compress()],
  vite: {
    plugins: [watchContent()],
  },
});
