import { NextResponse } from 'next/server';
import { getDb } from '@/db/db';
import { categories } from '@/db/schema';
import { eq } from 'drizzle-orm';



export async function GET() {
  try {
    const db = getDb();
    const results = await db.select().from(categories);
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const data = await request.json();
    
    const newCategory = {
      id: crypto.randomUUID(),
      name: data.name,
      slug: data.slug,
      whatsappMessage: data.whatsappMessage || null,
      imageUrl: data.imageUrl || null,
    };

    await db.insert(categories).values(newCategory);
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const db = getDb();
    const data = await request.json();
    const { id, name, slug, whatsappMessage, imageUrl } = data;

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    await db.update(categories)
      .set({
        name,
        slug,
        whatsappMessage: whatsappMessage || null,
        imageUrl: imageUrl || null,
      })
      .where(eq(categories.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    await db.delete(categories).where(eq(categories.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
