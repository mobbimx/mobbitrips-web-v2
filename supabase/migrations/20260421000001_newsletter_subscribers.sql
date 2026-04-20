-- Newsletter subscribers table
create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  source      text not null default 'web',
  created_at  timestamptz not null default now()
);

-- Index for fast email lookups
create index if not exists newsletter_subscribers_email_idx
  on public.newsletter_subscribers (email);

-- RLS: nadie puede leer desde el cliente
alter table public.newsletter_subscribers enable row level security;

-- Solo service_role puede insertar (desde API Route server-side)
-- No hay policy pública de insert para evitar spam directo al DB
