import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const { email } = schema.parse(body);

    // TODO Sprint 1.2+: persist to Supabase newsletter_subscribers table
    // await supabase.from('newsletter_subscribers').insert({ email })
    // eslint-disable-next-line no-console
    console.log('[newsletter] new subscriber:', email);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
