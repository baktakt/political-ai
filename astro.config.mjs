// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Set SITE_URL in the deploy environment (e.g. Vercel) to get correct
// canonical/OG/RSS/sitemap URLs.
const SITE_URL = process.env.SITE_URL ?? "https://ai-valet.vercel.app";

export default defineConfig({
  site: SITE_URL,
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // The component library is installed from GitHub and must share this
      // project's single React copy.
      dedupe: ["react", "react-dom"],
    },
  },
});
