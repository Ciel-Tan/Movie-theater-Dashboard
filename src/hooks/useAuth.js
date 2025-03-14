import { login } from "@/services/authService";
import { createCookieToken } from "@/utils/cookie";
import axios from "axios";
import { useState } from "react";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const Login = async ({ email, password }) => {
        setLoading(true);
        try {
            const authResponse = await login({ email, password });
            createCookieToken(authResponse);
        }
        catch (err) {
            console.error("Error in login hook:", err);
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || err.message || "An unexpected error occurred.");
            } else {
                setError(err.message || "An unexpected error occurred.");
            }
        }
        finally {
            setLoading(false);
        }
    }

    return { Login, loading, error };
}