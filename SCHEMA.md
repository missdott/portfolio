# Supabase Schema — Current Version

Four tables total. Run the SQL blocks in the Supabase SQL Editor.
If you already ran an earlier version of this schema, use the
migration files instead of re-running the full `CREATE TABLE` blocks
(which would fail with "relation already exists").

---

## 1. `about_content` — singleton row

```sql
create table about_content (
  id          uuid primary key default gen_random_uuid(),
  heading     text not null,
  body        text not null,
  updated_at  timestamptz not null default now()
);

alter table about_content enable row level security;
create policy "Public read access" on about_content for select using (true);

insert into about_content (heading, body) values (
  'I build software that prioritizes simplicity, clear purpose, and the small details that make user experiences effortless.',
  'I am seeking a role where I can immediately contribute clean code, accelerate my technical growth, and develop the practical engineering judgment that only comes from shipping real-world software within a team.'
);
```

---

## 2. `projects` — one row per project

Includes the full detailed-card fields added in the migration.

```sql
create table projects (
  id               uuid primary key default gen_random_uuid(),
  sort_order       int not null default 0,
  index_label      text,
  title            text not null,
  description      text not null,
  badges           text[] not null default '{}',
  tags             text[] not null default '{}',
  is_featured      boolean not null default false,
  role             text,
  year             text,
  why_it_mattered  text,
  what_it_does     text[] not null default '{}',
  what_i_learned   text,
  project_url      text,
  created_at       timestamptz not null default now()
);

alter table projects enable row level security;
create policy "Public read access" on projects for select using (true);
```

**Adding a project row via Table Editor:**

| Field | Notes |
|---|---|
| `sort_order` | Controls display order — lower = first |
| `index_label` | e.g. `01`, `02` — shown on the card |
| `title` | Project name |
| `description` | Short intro paragraph |
| `badges` | Tech stack pills — format: `{"React","TypeScript"}` |
| `tags` | Category labels — format: `{"Frontend","UI/UX"}` |
| `is_featured` | `true` on at most one project — shows FEATURED badge |
| `role` | Your role, e.g. `Full-Stack Developer` |
| `year` | e.g. `2026` or `2025` |
| `why_it_mattered` | One paragraph |
| `what_it_does` | Checklist items — format: `{"Item one","Item two"}` |
| `what_i_learned` | One paragraph |
| `project_url` | Full URL including `https://` — or leave empty |

**If you already have a `projects` table and need to add the new columns:**

```sql
alter table projects
  add column if not exists tags text[] not null default '{}',
  add column if not exists is_featured boolean not null default false,
  add column if not exists role text,
  add column if not exists year text,
  add column if not exists why_it_mattered text,
  add column if not exists what_it_does text[] not null default '{}',
  add column if not exists what_i_learned text,
  add column if not exists project_url text;
```

---

## 3. `stack_items` — Stack Overview pills in Skills section

```sql
create table stack_items (
  id          uuid primary key default gen_random_uuid(),
  sort_order  int not null default 0,
  label       text not null,
  created_at  timestamptz not null default now()
);

alter table stack_items enable row level security;
create policy "Public read access" on stack_items for select using (true);

insert into stack_items (sort_order, label) values
  (1,  'React'),
  (2,  'Next.js'),
  (3,  'TypeScript'),
  (4,  'JavaScript'),
  (5,  'Node.js'),
  (6,  'Tailwind CSS'),
  (7,  'PostgreSQL'),
  (8,  'Git'),
  (9,  'Figma'),
  (10, 'Supabase');
```

To add more pills: use Table Editor → `stack_items` → Insert row.
Set `sort_order` to a number higher than your existing rows.

---

## 4. `capabilities` — the 4 cards in Skills section

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
create policy "Public read access" on capabilities for select using (true);

insert into capabilities (sort_order, index_label, title, description) values
  (1, '01', 'Interface Architecture', 'Designing component-driven layouts with reusable logic, responsive breakpoints, and accessible interactions that scale across devices and platforms.'),
  (2, '02', 'State & Data Handling', 'Managing application flows seamlessly, validating user inputs defensively, and integrating clean REST API connections.'),
  (3, '03', 'System & Database Logic', 'Designing efficient data models, implementing robust database queries, and ensuring seamless integration between backend services and frontend applications.'),
  (4, '04', 'Collaborative Workflows', 'Maintaining version control discipline through intentional Git branching, clear PR documentation, and readable code structure.');
```

---

## What is NOT in Supabase

| Thing | Why |
|---|---|
| Marquee icons (Skills section) | Paired with imported React components — edit the `ICONS` array in `Skills.tsx` directly |
| Contact form | Posts to Formspree via `/api/contact` — no table needed |

---

## Environment variables

```
SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

Get from Supabase: **Project Settings → API Keys**.
- `SUPABASE_URL` = Project URL (bare domain, no `/rest/v1/` path)
- `SUPABASE_SERVICE_ROLE_KEY` = the **secret** key (not publishable)

Add these to `.env.local` for local dev, and to
**Vercel → Project Settings → Environment Variables** for production.