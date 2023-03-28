import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isAuthenticated =
    !!request.cookies.get('Authentication') || !!request.cookies.get('Refresh');
  console.log('headers', request.headers);
  console.log('isAuthenticated', isAuthenticated);
  console.log('isAuthPaths', request.nextUrl.pathname);
  console.log('--------------------------------');
  console.log('cookies', request.cookies);
  console.log('cookies.auth', request.cookies.get('Authentication'));
  console.log('cookies.refresh', request.cookies.get('Refresh'));

  const isAuthPaths =
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/signup';

  if (!isAuthenticated && !isAuthPaths) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (isAuthenticated && isAuthPaths) {
    return NextResponse.redirect(new URL('/positions', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/signup',
    '/applications',
    '/applications/:uuid',
    '/applications/:uuid/timeslots',
    '/candidates/:uuid',
    '/interviews',
    '/interviews/:uuid',
    '/interviews/new',
    '/positions/:uuid',
    '/positions',
    '/profile',
    '/questions',
  ],
};
