-- Reservations table
create table if not exists public.reservations (
  id                uuid primary key default gen_random_uuid(),
  property_id       integer not null,
  property_slug     text not null,
  guest_name        text not null,
  guest_email       text not null,
  guest_phone       text not null,
  check_in_date     date not null,
  check_out_date    date not null,
  guests            integer not null default 1,
  status            text not null default 'pending'
                      check (status in ('pending','confirmed','cancelled','paid')),
  total_mxn         numeric(10,2) not null,
  stripe_session_id text,
  notes             text,
  created_at        timestamptz not null default now()
);

create index if not exists reservations_property_id_idx  on public.reservations (property_id);
create index if not exists reservations_status_idx       on public.reservations (status);
create index if not exists reservations_check_in_idx     on public.reservations (check_in_date);

alter table public.reservations enable row level security;
-- solo service_role puede leer/escribir
