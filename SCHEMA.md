# Supabase Schema — Current Version

This replaces the original `SCHEMA.md`. The portfolio's components changed
significantly since that file was written (About lost its pillars/badges,
Skills became a marquee + stack panel + capability cards instead of a flat
service list) — this schema matches what the code **actually** reads today.

Run this in the Supabase SQL Editor (Project → SQL Editor → New query).
You can paste the whole thing at once.

---

## 1. `about_content`

A **singleton** table — exactly one row, fetched with `.single()`.

```sql
create table about_content (
  id          uuid primary key default gen_random_uuid(),
  heading     text not null,
  body        text not null,
  updated_at  timestamptz not null default now()
);

alter table about_content enable row level security;

create policy "Public read access"
  on about_content for select
  using (true);

insert into about_content (heading, body) values (
  'I build software that prioritizes simplicity, clear purpose, and the small details that make user experiences effortless.',
  'I am seeking a role where I can immediately contribute clean code, accelerate my technical growth, and develop the practical engineering judgment that only comes from shipping real-world software within a team.'
);
```

---

## 2. `projects`

One row per project card. Ordered by `sort_order` ascending.

```sql
create table projects (
  id           uuid primary key default gen_random_uuid(),
  sort_order   int not null default 0,
  index_label  text,
  title        text not null,
  description  text not null,
  badges       text[] not null default '{}',
  created_at   timestamptz not null default now()
);

alter table projects enable row level security;

create policy "Public read access"
  on projects for select
  using (true);

insert into projects (sort_order, index_label, title, description, badges) values
  (1, '01', 'Orbital — Design System', 'A 200+ component variant library built in Figma, shipped as a themeable React kit.', array['Figma','React']),
  (2, '02', 'Lumen — Mobile Banking', 'Cross-platform fintech app built with React Native and biometric-secured flows.', array['React Native','TypeScript']),
  (3, '03', 'Aperture — Analytics Suite', 'Editorial dark-mode dashboard with live data viz and component-driven layout.', array['Auto Layout','D3.js']);
```

Replace these 3 example rows with your real projects whenever you're ready —
either re-run `insert` statements with your own values, or use the Supabase
Table Editor UI instead of SQL.

---

## 3. `stack_items`

The pill badges inside the "STACK OVERVIEW" panel on the left of the Skills
section. Ordered by `sort_order` ascending.

```sql
create table stack_items (
  id          uuid primary key default gen_random_uuid(),
  sort_order  int not null default 0,
  label       text not null,
  created_at  timestamptz not null default now()
);

alter table stack_items enable row level security;

create policy "Public read access"
  on stack_items for select
  using (true);

insert into stack_items (sort_order, label) values
  (1, 'React'),
  (2, 'Next.js'),
  (3, 'TypeScript'),
  (4, 'JavaScript'),
  (5, 'Node.js'),
  (6, 'Tailwind CSS'),
  (7, 'PostgreSQL'),
  (8, 'Git'),
  (9, 'Figma'),
  (10, 'Supabase');
```

---

## 4. `capabilities`

The four cards on the right of the Skills section (Interface Architecture,
State & Data Handling, etc.). Ordered by `sort_order` ascending.

```sql
create table capabilities (
  id           uuid primary key default gen_random_uuid(),
  sort_order   int not null default 0,
  index_label  text not null,
  title        text not null,
  description  text not null,
  created_at   timestamptz not null default now()
);

alter table capabilities enable row level security;

create policy "Public read access"
  on capabilities for select
  using (true);

insert into capabilities (sort_order, index_label, title, description) values
  (1, '01', 'Interface Architecture', 'Designing component-driven layouts with reusable logic, responsive breakpoints, and accessible interactions that scale across devices and platforms.'),
  (2, '02', 'State & Data Handling', 'Managing application flows seamlessly, validating user inputs defensively, and integrating clean REST API connections.'),
  (3, '03', 'System & Database Logic', 'Designing efficient data models, implementing robust database queries, and ensuring seamless integration between backend services and frontend applications.'),
  (4, '04', 'Collaborative Workflows', 'Maintaining version control discipline through intentional Git branching, clear PR documentation, and readable code structure.');
```

---

## Not stored in Supabase (intentionally)

- **Marquee icons** (the scrolling Figma/React/TypeScript/etc. logos) — these
  are paired with imported icon *components* from `react-icons`, not plain
  text, so they stay hardcoded in `Skills.tsx` in the `ICONS` array. To
  add/remove a marquee icon, edit that array directly in the code.
- **Contact form** — has no table at all. It posts straight to your
  Formspree endpoint via `app/api/contact/route.ts`. No schema needed.

---

## Wiring it up

In `.env.local` (and later in Vercel's environment variables):

```
SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Get both from your Supabase project: **Project Settings → API**.
- `SUPABASE_URL` is the "Project URL"
- `SUPABASE_SERVICE_ROLE_KEY` is the **service_role** key (not the `anon` key)

The service_role key is safe here specifically because every Supabase call in
this codebase happens inside Server Components (`About.tsx`, `Projects.tsx`,
`Skills.tsx`) — none of it ships to the browser. Never put this key in a
Client Component or expose it in any client-side fetch call.

If a table is empty or a fetch fails for any reason, each section silently
falls back to the hardcoded `FALLBACK` content already in the component —
nothing breaks, nothing shows an error to visitors. Failures are only logged
to the server console.