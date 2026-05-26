import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Lazy singleton — initialized on first use (request time), not at import time (build time).
// This prevents Next.js from crashing during static analysis when env vars are absent.
let _admin: SupabaseClient | undefined;

function getAdmin(): SupabaseClient {
  if (!_admin) {
    _admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );
  }
  return _admin;
}

// Server-only client with service_role — never expose to the browser.
// Proxy forwards every property access to the lazily-created real client.
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_t, prop, receiver) {
    const client = getAdmin();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
