import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

interface RouteParams {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = params;
  if (!id || !/^[0-9a-f-]{36}$/.test(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('reservations')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 });
  }

  return NextResponse.json({ reservation: data });
}
