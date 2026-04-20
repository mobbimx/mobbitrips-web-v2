// Corre UNA VEZ para crear la tabla newsletter_subscribers en Supabase.
// Uso: node scripts/migrate-newsletter.mjs
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en el entorno.');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

// Test de conexión insertando y borrando
const { error } = await supabase
  .from('newsletter_subscribers')
  .select('id')
  .limit(1);

if (error?.code === '42P01') {
  console.log('Tabla no existe. Por favor ejecuta el siguiente SQL en el SQL Editor de Supabase:');
  console.log('');
  console.log(`
create table if not exists public.newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  source     text not null default 'web',
  created_at timestamptz not null default now()
);

create index if not exists newsletter_subscribers_email_idx
  on public.newsletter_subscribers (email);

alter table public.newsletter_subscribers enable row level security;
  `);
  console.log('URL del SQL Editor: https://supabase.com/dashboard/project/luyxsgimdtpessazhpnf/sql/new');
} else if (error) {
  console.error('Error inesperado:', error);
} else {
  console.log('✓ Tabla newsletter_subscribers ya existe y es accesible.');
}
