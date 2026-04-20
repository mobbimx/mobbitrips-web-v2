-- Events table (audit trail / n8n bus)
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  event_type  text not null,
  payload     jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists events_type_idx       on public.events (event_type);
create index if not exists events_created_at_idx on public.events (created_at desc);

alter table public.events enable row level security;
-- solo service_role
