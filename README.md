# InstaWare Landing Page

Business validation landing page for [instaware.ai](https://instaware.ai).

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **React 18**
- Deployed on **Vercel**

## Getting Started

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | No | Rust backend URL. Leave empty for standalone mode. |

**Standalone mode** (no backend): Form submissions show a success message but don't persist. Use this while validating with in-person conversations.

**Connected mode**: Set `NEXT_PUBLIC_API_URL=https://api.instaware.ai` once the Rust backend is deployed. Signups are stored in PostgreSQL and trigger welcome emails.

## Deploy to Vercel

### Option 1: Auto-deploy from GitHub (recommended)

1. Push this repo to GitHub (`Instaware-ai/landing`)
2. Go to [vercel.com](https://vercel.com) → "Add New Project"
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Live in ~60 seconds at `instaware-landing.vercel.app`

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Custom Domain

After deployment:

1. Vercel Dashboard → Project → Settings → Domains
2. Add `instaware.ai` (or your Vercel subdomain works fine for validation)
3. Update DNS if using custom domain:
   - `A` record: `@` → `76.76.21.21`
   - `CNAME`: `www` → `cname.vercel-dns.com`

## Project Structure

```
instaware-landing/
├── app/
│   ├── layout.tsx    # Root layout with SEO metadata + fonts
│   └── page.tsx      # Landing page (all-in-one component)
├── public/           # Static assets (add favicon, OG image here)
├── .env.example      # Environment variables template
├── next.config.js
├── package.json
└── tsconfig.json
```

## Connecting the Backend

When the Rust API backend is ready:

1. Set `NEXT_PUBLIC_API_URL` in Vercel environment variables
2. Redeploy (automatic on next push, or manual in Vercel dashboard)
3. Form submissions now POST to `/api/waitlist` on your backend

The landing page handles both modes gracefully — no code changes needed.
