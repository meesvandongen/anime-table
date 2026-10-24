import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Mirrors the previous Prettier config (.prettierrc).
  fmt: {
    trailingComma: "all",
    printWidth: 80,
    sortPackageJson: false,
    ignorePatterns: ["dist/**", "public/**"],
  },
  lint: {
    ignorePatterns: ["dist/**"],
    options: { typeAware: true, typeCheck: true },
  },
  plugins: [react()],
  server: {
    proxy: {
      // Pages functions, served by `pnpm run dev:functions` (wrangler pages dev).
      "/api": {
        target: "http://localhost:8788",
        changeOrigin: false,
      },
    },
  },
});
