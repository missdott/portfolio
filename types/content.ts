// Shared content types — mirror the Supabase table shapes in SCHEMA.md

export interface AboutContent {
  heading: string;
  body: string;
}

export interface Project {
  id: string;
  index_label: string | null;
  title: string;
  description: string;
  badges: string[];
  tags: string[];
  is_featured: boolean;
  role: string | null;
  year: string | null;
  why_it_mattered: string | null;
  what_it_does: string[];
  what_i_learned: string | null;
  project_url: string | null;
}

export interface StackItem {
  id: string;
  label: string;
}

export interface Capability {
  id: string;
  index_label: string;
  title: string;
  description: string;
}