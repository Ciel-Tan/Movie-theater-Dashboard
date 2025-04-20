import { api } from "@/utils/axios";

export const getAllRooms = async () => {
    try {
        const { data: rooms } = await api.get("/api/rooms/getAll");
        return rooms;
    }
    catch (error) {
        console.error("Error in getAllRooms service:", error);
        return error;
    }
};