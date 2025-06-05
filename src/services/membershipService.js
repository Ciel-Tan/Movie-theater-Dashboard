import { api } from "@/utils/axios";

export const getAllMemberships = async () => {
    try {
        const { data: memberships } = await api.get("/api/memberships/getAll");
        return memberships;
    }
    catch (error) {
        console.error("Error in getAllMemberships service:", error);
        return error;
    }
};