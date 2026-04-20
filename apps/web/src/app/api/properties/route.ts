import { NextResponse } from 'next/server';
import { getProperties } from '@mobbitrips/hostex-client';

export const revalidate = 3600;

export async function GET() {
  try {
    const properties = await getProperties();
    return NextResponse.json({ properties });
  } catch {
    return NextResponse.json({ error: 'Error fetching properties' }, { status: 500 });
  }
}
