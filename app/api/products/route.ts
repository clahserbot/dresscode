export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { getDb } from '@/db/db';
import { products } from '@/db/schema';
import { inArray } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');

  const db = getDb();
  
  if (!ids) {
    const allProducts = await db.select().from(products);
    return NextResponse.json(allProducts);
  }

  const idArray = ids.split(',');
  const results = await db.select().from(products).where(inArray(products.id, idArray));
  
  return NextResponse.json(results);
}
