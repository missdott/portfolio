// SERVER-ONLY. Never import this file from a Client Component ('use client').
// It uses the service_role key, which must never reach the browser bundle.
//
// This file is the entire "read" half of the backend: it fetches About,
// Projects, and Skills content for Server Components to render at request
// time. Nothing here is exposed to client JS.

import { createClient } from '@supabase/supabase-js';
import type { AboutContent, Project, StackItem, Capability } from '@/types/content';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isConfigured = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

const supabase = isConfigured
  ? createClient(SUPABASE_URL as string, SUPABASE_SERVICE_ROLE_KEY as string, {
      auth: { persistSession: false },
    })
  : null;

if (!isConfigured) {
  console.info(
    '[supabase] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — content sections will render static fallback copy. See .env.example.'
  );
}

export async function getAboutContent(): Promise<AboutContent | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('about_content')
      .select('heading, body')
      .limit(1)
      .single();

    if (error) throw error;
    return data as AboutContent;
  } catch (err) {
    console.warn('[supabase] getAboutContent failed, using fallback:', (err as Error).message);
    return null;
  }
}

export async function getProjects(): Promise<Project[] | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('projects')
      .select(
        'id, index_label, title, description, badges, tags, is_featured, role, year, why_it_mattered, what_it_does, what_i_learned, project_url'
      )
      .order('is_featured', { ascending: false })
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as Project[];
  } catch (err) {
    console.warn('[supabase] getProjects failed, using fallback:', (err as Error).message);
    return null;
  }
}

export async function getStackItems(): Promise<StackItem[] | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('stack_items')
      .select('id, label')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as StackItem[];
  } catch (err) {
    console.warn('[supabase] getStackItems failed, using fallback:', (err as Error).message);
    return null;
  }
}

export async function getCapabilities(): Promise<Capability[] | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('capabilities')
      .select('id, index_label, title, description')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as Capability[];
  } catch (err) {
    console.warn('[supabase] getCapabilities failed, using fallback:', (err as Error).message);
    return null;
  }
}