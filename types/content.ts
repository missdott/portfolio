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