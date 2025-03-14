import { NextResponse } from 'next/server';
import { decodeToken } from './utils/decodeToken';

export async function middleware(req) {
    const authenticated = req.cookies.get('token')?.value;
    
    if (!authenticated) {
        return NextResponse.redirect(new URL('/auth', req.url));
    }

    const payload = await decodeToken(authenticated);
    
    if (payload.role_name != 'admin' || payload.error) {
        return NextResponse.redirect(new URL('/auth', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/movies/:path*', '/addMovie', '/profile']
};