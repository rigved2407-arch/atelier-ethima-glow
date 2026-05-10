# Deploying ethima to Vercel

This project is built with TanStack Start (Vite) and is configured to deploy on Vercel as a static SPA.

## One-time setup

1. Push this repo to GitHub.
2. In Vercel, click **Add New → Project** and import the repo.
3. Vercel will auto-detect `vercel.json`. Confirm:
   - **Build Command:** `vite build`
   - **Output Directory:** `dist/client`
   - **Install Command:** `bun install` (or `npm install`)
4. Click **Deploy**.

## Notes

- `vercel.json` includes a SPA rewrite so client-side routes like `/education`, `/consultation`, `/customise` resolve correctly on refresh and direct links.
- Static assets in `/assets/*` are served with long-lived immutable cache headers.
- No environment variables are required for the current build.

## Custom domain

After the first successful deploy, add your custom domain under **Project → Settings → Domains** in Vercel.
