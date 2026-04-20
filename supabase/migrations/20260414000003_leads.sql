-- Leads table
create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  message    text,
  source     text not null default 'contact_form'
               check (source in ('contact_form','owner_form','whatsapp')),
  created_at timestamptz not null default now()
);

create index if not exists leads_email_idx on public.leads (email);

alter table public.leads enable row level security;
-- solo service_role
