import { NextResponse, type NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import type Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const reservation_id = session.metadata?.reservation_id;

    if (!reservation_id) {
      return NextResponse.json({ ok: true });
    }

    await supabaseAdmin
      .from('reservations')
      .update({ status: 'paid', stripe_session_id: session.id })
      .eq('id', reservation_id);

    await supabaseAdmin.from('events').insert({
      event_type: 'payment.stripe.succeeded',
      payload: {
        reservation_id,
        stripe_session_id: session.id,
        amount_total: session.amount_total,
        customer_email: session.customer_email,
      },
    });
  }

  return NextResponse.json({ ok: true });
}
