import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';

const schema = z.object({
  email: z.string().email(),
  source: z.string().optional().default('web'),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
  }

  const { email, source } = parsed.data;

  const { error } = await supabaseAdmin
    .from('newsletter_subscribers')
    .insert({ email, source })
    .select()
    .single();

  if (error) {
    // Duplicate — silent success to avoid leaking whether email is subscribed
    if (error.code === '23505') {
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
