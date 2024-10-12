import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  if (!currentUser) {
    if (pathname === '/login' || pathname === '/signup') {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (currentUser && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/', '/login', '/signup'],
};
