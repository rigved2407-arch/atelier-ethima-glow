# Deploying ethima to Vercel

This project ships **two** build pipelines:

- **Default** (`vite build`) — Cloudflare Workers SSR build, used by the Lovable sandbox preview and Lovable Publish.
- **SPA** (`vite build --config vite.spa.config.ts`) — plain static SPA into `./dist`, used by Vercel.

Vercel uses the SPA pipeline because Vercel's static hosting can't run the Cloudflare Worker that the SSR build produces.

## One-time setup

1. Push this repo to GitHub.
2. In Vercel, click **Add New → Project** and import the repo.
3. Vercel auto-detects `vercel.json`. Confirm:
   - **Build Command:** `vite build --config vite.spa.config.ts`
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

- `vite.spa.config.ts` is a standalone Vite config (React + Tailwind + TanStack Router file-based plugin) that emits a static SPA — no Worker, no SSR.
- `index.html` (project root) is the SPA entry. It loads `src/main.tsx`, which mounts `<RouterProvider>` using the same routes under `src/routes/`.
- `vercel.json` rewrites every path to `/index.html` so client-side routes like `/education`, `/consultation`, `/customise` resolve on refresh and direct links.
- Static assets in `/assets/*` are served with long-lived immutable cache headers.
- No environment variables are required.

## Trade-offs vs SSR

The SPA build trades server-side rendering for portability:

- ✗ No SSR HTML — search engines see a near-empty shell until JS runs.
- ✗ Per-route `head()` metadata isn't injected — only the root `index.html` `<title>`/`<meta>` apply.
- ✓ Deploys to any static host (Vercel, Netlify, S3, GitHub Pages).
- ✓ Smaller, simpler runtime.

For full SSR + per-route metadata, deploy the default Cloudflare build instead, or use Lovable Publish (already live).

## Custom domain

After the first successful deploy, add your custom domain under **Project → Settings → Domains** in Vercel.
