# Deploying ethima to Vercel

This project ships **two** build pipelines:

- **Default** (`vite build`) — Cloudflare Workers SSR build, used by the Lovable sandbox preview and Lovable Publish.
- **Vercel SEO** (`npm run build:vercel`) — static SPA plus build-time crawlable HTML pages, used by Vercel.

Vercel uses the SPA pipeline because Vercel's static hosting can't run the Cloudflare Worker that the SSR build produces.

## One-time setup

1. Push this repo to GitHub.
2. In Vercel, click **Add New → Project** and import the repo.
3. Vercel auto-detects `vercel.json`. Confirm:
   - **Build Command:** `npm run build:vercel`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install` (or `bun install`)
4. Add Environment Variables (Settings → Environment Variables) — **required for backend to work**:
   - `VITE_SUPABASE_URL` = `https://wkankvywbpazzerhdtud.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrYW5rdnl3YnBhenplcmhkdHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MDc5ODQsImV4cCI6MjA5NDA4Mzk4NH0.iGFUxv7JgM6FTEjpsXGEtDE0SkuI_KeZsHXnvHGUktg`
   - Apply to all environments (Production, Preview, Development).
5. Click **Deploy**.

## Backend (Lovable Cloud)

The browser SPA talks directly to Lovable Cloud (managed Postgres + Auth + Storage + serverless functions). Anything that needs to run server-side with secret keys (Stripe, sending emails with private API keys, calling LLMs, webhooks) lives as a serverless function inside Lovable Cloud — your Vercel frontend invokes it; Vercel never holds those secrets.

## How it works

- `vite.spa.config.ts` emits the static SPA, then `scripts/generate-seo-pages.mjs` creates route-specific HTML for public pages and products.
- `index.html` (project root) is the SPA entry and includes meaningful fallback content for crawlers before JavaScript runs.
- The generated `dist` output contains clean route directories, route-specific titles/descriptions/canonicals, Open Graph/Twitter tags, JSON-LD, `sitemap.xml`, `robots.txt`, and `manus-routes.json`.
- Static assets in `/assets/*` are served with long-lived immutable cache headers.
- No environment variables are required.

## Trade-offs vs SSR

The SPA build trades server-side rendering for portability:

- ✓ Public routes and product pages ship with meaningful static HTML and per-route metadata before JavaScript runs.
- ✗ Interactive route content still hydrates as a client-side SPA; authenticated/private routes remain outside the SEO output.
- ✓ Deploys to any static host (Vercel, Netlify, S3, GitHub Pages).
- ✓ Smaller, simpler runtime.

For full SSR + per-route metadata, deploy the default Cloudflare build instead, or use Lovable Publish (already live).

## Custom domain

After the first successful deploy, add your custom domain under **Project → Settings → Domains** in Vercel.
