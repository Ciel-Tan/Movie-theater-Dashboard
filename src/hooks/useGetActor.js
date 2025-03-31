import { getAllActors } from "@/services/actorService";
import { useEffect, useState } from "react";

export const useGetActor = () => {
    const [actorsData, setActorsData] = useState([]);
    const [actorLoading, setActorLoading] = useState(false);
    const [actorError, setActorError] = useState(null);

    const getActors = async () => {
        setActorLoading(true);
        try {
            const actors = await getAllActors();
            setActorsData(actors);
        }
        catch (error) {
            console.error("Error get all actors: ", error);
            setActorError("Failed to get all actors");
        }
        finally {
            setActorLoading(false);
        }
    };

    useEffect(() => {
        getActors();
    }, []);

    return { actorsData, actorLoading, actorError };
}