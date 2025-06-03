import { getAllBookings } from "@/services/bookingService";
import { useEffect, useState } from "react";

export const useGetBooking = () => {
    const [bookingsData, setBookingsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getBookings = async () => {
        setLoading(true);
        try {
            const bookings = await getAllBookings();
            setBookingsData(bookings);
        }
        catch (error) {
            console.error("Error get all bookings: ", error);
            setError("Failed to get all bookings");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBookings();
    }, []);

    return { bookingsData, loading, error };
}