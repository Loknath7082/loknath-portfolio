import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL || "https://example.com",
  output: "static",
  adapter: vercel(),
  integrations: [tailwindcss(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});

