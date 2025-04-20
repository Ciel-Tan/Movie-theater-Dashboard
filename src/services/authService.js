'use client'

import { api } from "@/utils/axios";

export const login = async ({ email, password }) => {
    try {
        const { data: authResponse } = await api.post("/api/auth/login", { email, password });
        return authResponse;
    }
    catch (error) {
        console.error("Error in login service:", error);
        throw error
    }
}