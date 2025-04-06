import { NextResponse } from 'next/server';

export async function middleware(req) {
    const authenticated = req.cookies.get('token')?.value;
    
    if (!authenticated) {
        return NextResponse.redirect(new URL('/auth', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/movies/:path*', '/addMovie', '/profile', '/account', '/']
};