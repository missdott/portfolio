# Portfolio

A personal developer portfolio built with Next.js. Content for the About,
Projects, and Skills sections is pulled from Supabase, and the contact form
sends submissions through Formspree.

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase + Formspree values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

The site works with placeholder content out of the box — until `.env.local`
is filled in, each section falls back to static copy instead of breaking.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [Supabase](https://supabase.com) for content
- [Formspree](https://formspree.io) for the contact form
- Deployed on [Vercel](https://vercel.com)

See `SCHEMA.md` for the Supabase table setup.