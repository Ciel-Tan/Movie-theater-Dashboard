import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// async function login({ email, password }) {
//     try {
//         const response = await fetch("/api/auth/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//         });
//         if (!response.ok) {
//             throw new Error("Login failed");
//         }
//         return await response.json(); // Expecting { token, expireId } in response
//     } catch (error) {
//         console.error("Login error:", error);
//         return { error: error.message };
//     }
// }

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    // callbacks: {
    //     async signIn({ user }) {
    //         console.log("Sign in user:", user);
    //         const email = user.email;
    //         const googlePassword = "ULhaj7VujZPDlEsp";

    //         const response = await login({ email, password: googlePassword });

    //         if (response.error) {
    //             return false;
    //         }
    //         createCookieToken(response);
    //         user.backendToken = response.token;
    //         user.expireId = response.expireId;

    //         return true;
    //     },
    //     async session({ session, user }) {
    //         session.backendToken = user.backendToken;
    //         session.expireId = user.expireId;
    //         return session;
    //     },
    // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };