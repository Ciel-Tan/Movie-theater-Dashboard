import { getAllCinemas } from "@/services/cinemaService";
import { useEffect, useState } from "react";

export const useGetCinema = () => {
    const [cinemasData, setCinemasData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCinemas = async () => {
        setLoading(true);
        try {
            const cinemas = await getAllCinemas();
            setCinemasData(cinemas);
        }
        catch (error) {
            console.error("Error get all cinemas: ", error);
            setError("Failed to get all cinemas");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCinemas();
    }, []);

    return { cinemasData, loading, error };
}