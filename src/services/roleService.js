import { api } from "@/utils/axios";

export const getAllRoles = async () => {
    try {
        const { data: roles } = await api.get("/api/roles/getAll");
        return roles;
    }
    catch (error) {
        console.error("Error in getAllRoles service:", error);
        return error;
    }
};