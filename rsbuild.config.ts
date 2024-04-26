import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "Anime Table",
    favicon: "./src/assets/ayaya.png",
    meta: {
      description:
        "A table containing all Anime from MyAnimeList, easily filterable and sortable.",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8788",
        changeOrigin: false,
      },
    },
  },
});
