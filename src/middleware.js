import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { decodeToken } from './utils/decodeToken';

async function verifyToken(token, secret) {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload;
}

async function getTokenPayload(token) {
    try {
        const decoded = await verifyToken(token, process.env.JWT_SECRET);
        return { account_id: decoded.account_id, role_name: decoded.role_name };
    }
    catch (error) {
        console.error('Token Error:', error);
        return { error: error.message };
    }
}

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