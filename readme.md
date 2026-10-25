# Anime Table

An interactive table of most anime series and movies.

https://anime-table.pages.dev/

## Dataset

https://github.com/meesvandongen/anime-dataset

## Development

Requires Node 24 and pnpm (pinned in `package.json`; run `corepack enable` once).

```sh
pnpm install
pnpm run dev            # Vite+ dev server; /api is proxied to localhost:8788
pnpm run dev:functions  # Cloudflare Pages functions (wrangler pages dev)
pnpm run build          # static site in dist/
pnpm run lint           # vp lint
pnpm run fmt            # vp fmt
```
