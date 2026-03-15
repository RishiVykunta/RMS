import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

const protectedRoutes = ['/dashboard', '/booking', '/admin'];
const adminRoutes = ['/admin'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => path.startsWith(route));

  const session = req.cookies.get('session')?.value;
  const decoded = session ? await decrypt(session).catch(() => null) : null;

  // 1. Redirect to login if accessing protected route without session
  if (isProtectedRoute && !decoded) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 2. Redirect to home if accessing admin route without admin role
  if (isAdminRoute && decoded?.user.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // 3. Redirect to dashboard if logged in and trying to access auth-related routes
  const authRoutes = ['/login', '/register', '/verify-email', '/forgot-password', '/reset-password'];
  if (authRoutes.includes(path) && decoded) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
