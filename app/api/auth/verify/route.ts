import { NextResponse } from 'next/server';
import { getDb } from '@/db/db';
import { settings } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { user, pwd } = await request.json();
    
    if (!user || !pwd) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const db = getDb();
    const allSettings = await db.select().from(settings);
    
    const settingsMap = allSettings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    const expectedUser = settingsMap['admin_username'] || 'flowframe';
    const expectedPwd = settingsMap['admin_password'] || 'flowframe';

    if (user === expectedUser && pwd === expectedPwd) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    console.error('Auth verify error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
