import { api } from "@/utils/axios";

export const getAllBookings = async () => {
    try {
        const { data: bookings } = await api.get("/api/bookings/getAll");
        return bookings;
    }
    catch (error) {
        console.error("Error in getAllbookings service:", error);
        return error;
    }
};