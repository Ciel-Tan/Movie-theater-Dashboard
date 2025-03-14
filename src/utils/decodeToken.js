import { jwtVerify } from "jose";

const verifyToken = async(token, secret) => {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload;
}

export const decodeToken = async (token) => {
    try {
        const payload = await verifyToken(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        return { account_id: payload.account_id, role_name: payload.role_name };
    }
    catch (error) {
        console.error('Token Error:', error);
        return { error: error.message };
    }
}