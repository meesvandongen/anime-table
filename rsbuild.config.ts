import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "Anime Table",
    favicon: "./src/assets/ayaya.png",
    meta: {
      description:
        "A table containing all Anime from the MyAnimeList API, easily filterable and sortable.",
    },
  },
});
