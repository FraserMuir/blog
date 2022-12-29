import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

const SERVER_PORT = 3000;
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
const LIVE_URL = "https://blog-frasermuir.vercel.app";

const SCRIPT = process.env.npm_lifecycle_script || "";
const isBuild = SCRIPT.includes("astro build");
const BASE_URL = isBuild ? LIVE_URL : LOCALHOST_URL;

export default defineConfig({
  server: { port: SERVER_PORT },
  site: BASE_URL,
  integrations: [
    sitemap(),
    tailwind({
      config: { applyBaseStyles: false },
    }),
  ],
});
