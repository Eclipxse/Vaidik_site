-- ============================================================
-- VaidikStore — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ── Products Table ──────────────────────────────────────────
create table if not exists public.products (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  description   text,
  category      text not null,       -- 'FF Cheats' | 'FF IDs' | 'SSM Panel' | 'Reseller'
  sub_category  text,                -- 'iOS Panel' | 'Android Panel' | 'PC Panel'
  features      jsonb default '[]'::jsonb,
  price         numeric(10,2) not null,
  original_price numeric(10,2),
  duration      text,                -- e.g. 'day' | 'week' | 'month'
  thumbnail_url text,
  youtube_url   text,
  images        jsonb default '[]'::jsonb,
  support       jsonb default '[]'::jsonb,
  stock_status  text not null default 'active'
                  check (stock_status in ('active', 'out', 'limited')),
  is_published  boolean not null default true,
  is_featured   boolean not null default false,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── Categories Table ─────────────────────────────────────────
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  slug        text not null unique,
  parent_id   uuid references public.categories(id) on delete set null,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ── WhatsApp Settings Table ───────────────────────────────────
create table if not exists public.whatsapp_settings (
  id              uuid primary key default gen_random_uuid(),
  phone_number    text not null,
  message_template jsonb default '{}'::jsonb,  -- keyed by category
  updated_at      timestamptz not null default now()
);

-- ── Site Settings Table ───────────────────────────────────────
create table if not exists public.site_settings (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

-- ── Audit Log Table ───────────────────────────────────────────
create table if not exists public.audit_log (
  id          uuid primary key default gen_random_uuid(),
  action      text not null,         -- 'create' | 'update' | 'delete' | 'login'
  table_name  text,
  record_id   uuid,
  admin_email text not null,
  metadata    jsonb default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

-- ── Auto-update updated_at trigger ───────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- ── Row Level Security (public read, no write without auth) ──
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.whatsapp_settings enable row level security;
alter table public.site_settings enable row level security;
alter table public.audit_log enable row level security;

-- Public can read published products
create policy "Public read products"
  on public.products for select
  using (is_published = true);

-- Public can read categories
create policy "Public read categories"
  on public.categories for select
  using (true);

-- Public can read site settings
create policy "Public read site settings"
  on public.site_settings for select
  using (true);

-- Public can read whatsapp settings
create policy "Public read whatsapp settings"
  on public.whatsapp_settings for select
  using (true);

-- ── Seed: Default WhatsApp Settings ──────────────────────────
insert into public.whatsapp_settings (phone_number, message_template)
values (
  '917874883702',
  '{
    "default": "Hi! I am interested in buying: {product_name}. Please share price and availability.",
    "FF Cheats": "Hi! I want to buy the {product_name} cheat panel. Please confirm availability.",
    "FF IDs": "Hi! I want to buy the Free Fire ID: {product_name}. Is it still available?",
    "SSM Panel": "Hi! I want to subscribe to {product_name} on SSM Panel. Please share details.",
    "Reseller": "Hi! I am interested in the {product_name} reseller plan. Please share requirements."
  }'::jsonb
);

-- ── Seed: Default Site Settings ──────────────────────────────
insert into public.site_settings (key, value) values
  ('hero_title', '"DOMINATE THE GAME"'::jsonb),
  ('hero_subtitle', '"Premium Free Fire tools trusted by 10,000+ gamers"'::jsonb),
  ('announcement_text', '"⚡ Fast Delivery · 24/7 WhatsApp Support · Trusted Resellers"'::jsonb),
  ('maintenance_mode', 'false'::jsonb);

-- ── Seed: Sample Products ────────────────────────────────────
insert into public.products
  (name, description, category, sub_category, features, price, original_price, duration, stock_status, is_published, is_featured, sort_order)
values
  (
    'iOS Panel Basic',
    'Entry-level Free Fire panel for iPhone users. Stable and undetected.',
    'FF Cheats', 'iOS Panel',
    '["Aimbot (Basic)", "ESP / Wallhack", "Auto headshot", "No recoil", "Daily updates"]'::jsonb,
    299, 499, 'day', 'active', true, true, 1
  ),
  (
    'iOS Panel Pro',
    'Advanced iOS panel with full feature set. Best for competitive play.',
    'FF Cheats', 'iOS Panel',
    '["Aimbot (Advanced)", "ESP / Wallhack", "Auto headshot", "Speed hack", "Anti-ban shield", "24/7 support", "Daily updates"]'::jsonb,
    799, 1299, 'week', 'active', true, true, 2
  ),
  (
    'Android Panel Lite',
    'Lightweight APK for all Android versions. Easy to install.',
    'FF Cheats', 'Android Panel',
    '["Aimbot", "ESP", "Auto headshot", "No recoil", "Works on all Android versions"]'::jsonb,
    199, 349, 'day', 'active', true, true, 1
  ),
  (
    'Android Panel Premium',
    'Full-featured Android panel with advanced hacks. Updated daily.',
    'FF Cheats', 'Android Panel',
    '["Aimbot (Pro)", "ESP / Wallhack", "Speed hack", "Fly hack", "Anti-ban", "Auto update"]'::jsonb,
    599, 999, 'week', 'limited', true, true, 2
  ),
  (
    'PC Panel Standard',
    'BlueStacks & emulator compatible. All hacks in one panel.',
    'FF Cheats', 'PC Panel',
    '["Aimbot", "ESP", "Speed hack", "No recoil", "BlueStacks support"]'::jsonb,
    499, 799, 'week', 'active', true, false, 1
  ),
  (
    'Diamond Account — Rank Heroic',
    'Heroic rank account with 10,000+ diamonds and rare bundles.',
    'FF IDs', null,
    '["Heroic rank", "10,000+ diamonds", "5 rare bundles", "Level 60+", "Never banned"]'::jsonb,
    1499, 2499, null, 'active', true, true, 1
  ),
  (
    'SSM Panel — Basic Plan',
    'Manage up to 10 panel licenses. Perfect for beginners.',
    'SSM Panel', null,
    '["Up to 10 licenses", "Dashboard access", "WhatsApp support", "Monthly billing"]'::jsonb,
    799, null, 'month', 'active', true, true, 1
  ),
  (
    'Reseller Plan — Silver',
    'Start your own reseller business with our Silver plan.',
    'Reseller', null,
    '["50 panel keys/month", "Wholesale pricing", "Dashboard access", "Priority support", "Marketing materials"]'::jsonb,
    1999, null, 'month', 'active', true, true, 1
  );

-- ============================================================
-- ── MIGRATION QUERY FOR EXISTING DATABASES ──────────────────
-- ============================================================
-- If you already set up your database earlier, run these queries 
-- in the Supabase Dashboard -> SQL Editor to add the missing columns:
--
-- ALTER TABLE public.products ADD COLUMN IF NOT EXISTS youtube_url text;
-- ALTER TABLE public.products ADD COLUMN IF NOT EXISTS images jsonb DEFAULT '[]'::jsonb;
-- ALTER TABLE public.products ADD COLUMN IF NOT EXISTS support jsonb DEFAULT '[]'::jsonb;

