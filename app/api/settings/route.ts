

import { NextResponse } from 'next/server';
import { getDb } from '@/db/db';
import { settings } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  const db = getDb();
  const allSettings = await db.select().from(settings);
  
  const settingsMap = allSettings.reduce((acc, curr) => {
    if (curr.key !== 'admin_username' && curr.key !== 'admin_password') {
      acc[curr.key] = curr.value;
    }
    return acc;
  }, {} as Record<string, string>);

  // Default values if empty
  const defaultSettings = {
    hero_title: 'Premium Fall Collection',
    hero_subtitle: 'Discover our latest styles designed for the modern lifestyle. Quality meets comfort.',
    hero_discount: 'Up to 50% OFF',
    hero_image_url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop',
    promo1_title: 'Summer Essentials',
    promo1_subtitle: 'Up to 20% off',
    promo1_image_url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop',
    promo1_product_id: '',
    promo2_title: 'Accessories Sale',
    promo2_subtitle: 'Up to 40% off',
    promo2_description: 'The perfect additions to complete your look.',
    promo2_image_url: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=2070&auto=format&fit=crop',
    promo2_product_id: ''
  };

  return NextResponse.json({ ...defaultSettings, ...settingsMap });
}

export async function POST(request: Request) {
  const db = getDb();
  const body = await request.json();

  // Handle saving key-value pairs
  for (const [key, value] of Object.entries(body)) {
    if (typeof value === 'string') {
      const existing = await db.select().from(settings).where(eq(settings.key, key));
      
      if (existing.length > 0) {
        await db.update(settings).set({ value }).where(eq(settings.key, key));
      } else {
        await db.insert(settings).values({ key, value });
      }
    }
  }

  return NextResponse.json({ success: true });
}
