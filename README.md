# Minuet of Star Mist — Portfolio

Next.js (App Router) rebuild of the static blueprint. One repo, deploys as one
Vercel project — frontend and backend live in the same codebase but are kept
in clearly separated folders.

## Project structure

```
minuet-portfolio/
├── app/
│   ├── layout.tsx           Root layout — fonts, global styles, <body> wrapper
│   ├── page.tsx             The landing page — assembles all sections
│   ├── globals.css          Design tokens (colors, type) as CSS variables
│   └── api/
│       └── contact/
│           └── route.ts     ★ BACKEND — serverless POST handler for the contact form
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx       Client component — dropdown needs state
│   ├── sections/
│   │   ├── Hero.tsx         Static — no data fetching
│   │   ├── About.tsx        ★ Server component — awaits getAboutContent()
│   │   ├── Projects.tsx     ★ Server component — awaits getProjects()
│   │   ├── Service.tsx      ★ Server component — awaits getServiceOfferings()
│   │   └── Contact.tsx      Client component — form state, posts to /api/contact
│   └── ui/
│       ├── Button.tsx
│       └── TechBadge.tsx
│
├── lib/
│   └── supabase.ts          ★ BACKEND — server-only Supabase client + fetch functions
│
├── types/
│   └── content.ts           Shared TypeScript types for fetched content
│
├── .env.example              Committed template — copy to .env.local
├── .env.local                 Your real secrets (gitignored, never committed)
└── SCHEMA.md                  Supabase table definitions (from earlier — still accurate)
```

**The backend, in full, is two files:** `lib/supabase.ts` (reads About/Projects/Service)
and `app/api/contact/route.ts` (writes contact submissions to Formspree). Everything
else under `components/` and `app/page.tsx` is frontend.

## Why Server Components for content, Client Components for interactivity

- `About`, `Projects`, `Service` fetch data **on the server**, at request time.
  The Supabase `service_role` key lives only in `lib/supabase.ts` and never
  reaches the browser — there is no client-exposed key to leak.
- `Navbar` and `Contact` are Client Components (`'use client'`) because they
  need React state (`useState`) and DOM event handlers — things that only run
  in the browser.
- This is the standard Next.js App Router split: **server for data, client for
  interaction.** You generally don't need to think about it beyond that rule.

## Local setup

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev                  # http://localhost:3000
```

Until you fill in `.env.local`, every section renders its static fallback
copy — the page works and looks complete with zero configuration. Nothing
breaks; missing config just means "show fallback content" everywhere.

## Environment variables

| Variable | Used in | Notes |
|---|---|---|
| `SUPABASE_URL` | `lib/supabase.ts` | Project Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | `lib/supabase.ts` | Project Settings → API → `service_role` key. Server-only — safe here because this code never ships to the browser. |
| `FORMSPREE_ENDPOINT` | `app/api/contact/route.ts` | Your form's endpoint from formspree.io |

See `SCHEMA.md` for the exact Supabase table definitions (`about_content`,
`projects`, `service_offerings`) these variables connect to.

## Deploying to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In Vercel: **New Project → Import** your repo. Framework preset
   auto-detects as Next.js — no config needed.
3. Before the first deploy, add the same three variables from `.env.local`
   under **Project Settings → Environment Variables** (set them for
   Production, Preview, and Development as needed).
4. Deploy. The `app/api/contact` route automatically becomes a serverless
   function — nothing extra to configure for that either.

Any time you change an environment variable in Vercel, redeploy (or use
**Redeploy** from the dashboard) for it to take effect.

## Editing content

Content lives in Supabase, not in the code. Use the Supabase Table Editor to
add/edit rows in `about_content`, `projects`, and `service_offerings` — the
site picks up changes on next request (Server Components fetch fresh data
per request by default in the App Router).
