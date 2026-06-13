-- Run once in Supabase Dashboard > SQL Editor.
-- Safe to run again because each statement uses IF NOT EXISTS.

alter table public.products
  add column if not exists badge text;

alter table public.products
  add column if not exists durations jsonb default '[]'::jsonb;
