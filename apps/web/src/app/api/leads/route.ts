import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';
import { isRateLimited, getIp } from '@/lib/ratelimit';

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(20).optional().default(''),
  message: z.string().max(1000).optional().default(''),
  source: z.enum(['contact_form', 'owner_form', 'whatsapp']).default('contact_form'),
});

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Demasiadas solicitudes.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { data: lead, error } = await supabaseAdmin
    .from('leads')
    .insert(parsed.data)
    .select()
    .single();

  if (error || !lead) {
    return NextResponse.json({ error: 'Error al guardar el mensaje' }, { status: 500 });
  }

  await supabaseAdmin.from('events').insert({
    event_type: 'lead.created',
    payload: { lead_id: lead.id, source: parsed.data.source, email: parsed.data.email },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
