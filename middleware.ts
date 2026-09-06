import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  // Protect /admin routes and sensitive API routes
  const isProtectedPath = url.pathname.startsWith('/admin') || 
                          url.pathname.startsWith('/api/upload-url') ||
                          (url.pathname.startsWith('/api/products') && req.method !== 'GET') ||
                          (url.pathname.startsWith('/api/categories') && req.method !== 'GET');

  if (isProtectedPath) {
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      try {
        const verifyUrl = new URL('/api/auth/verify', req.url);
        const authRes = await fetch(verifyUrl.toString(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user, pwd })
        });
        
        if (authRes.ok) {
          const authData = await authRes.json();
          if (authData.success) {
            return NextResponse.next();
          }
        }
      } catch (error) {
        console.error('Middleware auth check error:', error);
      }
    }
    
    url.pathname = '/api/unauthorized';
    return new NextResponse('Auth Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
