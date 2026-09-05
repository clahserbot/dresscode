import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
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

      const expectedUser = process.env.ADMIN_USER || 'flowframe';
      const expectedPwd = process.env.ADMIN_PASSWORD || 'flowframe';

      if (user === expectedUser && pwd === expectedPwd) {
        return NextResponse.next();
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
