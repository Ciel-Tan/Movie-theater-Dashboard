import { api } from "@/utils/axios";

export const getAllShowtime = async () => {
    try {
        const { data: showtime } = await api.get("/api/showtimes/getAll");
        return showtime;
    }
    catch (error) {
        console.error("Error in getAllShowtime service:", error);
        return error;
    }
};

export const addShowtime = async (showtimeData) => {
    try {
        const { data: showtimeAdded } = await api.post("/api/showtimes/create", showtimeData);
        return showtimeAdded;
    }
    catch (error) {
        console.error("Error in addShowtime service:", error);
        return error;
    }
};

export const updateShowtime = async (showtime_id, showtimeData) => {
    try {
        const { data: showtimeUpdated } = await api.put(`/api/showtimes/${showtime_id}`, showtimeData);
        return showtimeUpdated;
    }
    catch (error) {
        console.error("Error in updateShowtime service:", error);
        return error;
    }
};

export const removeShowtime = async (showtime_id) => {
    try {
        const { data: showtimeDeleted } = await api.delete(`/api/showtimes/${showtime_id}`);
        return showtimeDeleted;
    }
    catch (error) {
        console.error("Error in deleteShowtime service:", error);
        return error;
    }
};