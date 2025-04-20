import { api } from "@/utils/axios";

export const getAllActors = async () => {
    try {
        const { data: actors } = await api.get("/api/actors/getAll");
        return actors;
    }
    catch (error) {
        console.error("Error in getAllActors service:", error);
        return error;
    }
};