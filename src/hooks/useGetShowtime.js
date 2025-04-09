import { getAllShowtime } from "@/services/showtimeService";
import { useEffect, useState } from "react";

export const useGetShowtime = () => {
    const [showtimeData, setShowtimeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getShowtime = async () => {
        setLoading(true);
        try {
            const showtime = await getAllShowtime();
            setShowtimeData(showtime);
        }
        catch (error) {
            console.error("Error get all showtime: ", error);
            setError("Failed to get all showtime");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getShowtime();
    }, []);

    return { showtimeData, loading, error };
}