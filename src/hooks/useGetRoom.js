import { getAllRooms } from "@/services/roomService";
import { useEffect, useState } from "react";

export const useGetRoom = () => {
    const [roomsData, setRoomsData] = useState([]);
    const [roomLoading, setRoomLoading] = useState(false);
    const [roomError, setRoomError] = useState(null);

    const getRooms = async () => {
        setRoomLoading(true);
        try {
            const rooms = await getAllRooms();
            setRoomsData(rooms);
        }
        catch (error) {
            console.error("Error get all rooms: ", error);
            setRoomError("Failed to get all rooms");
        }
        finally {
            setRoomLoading(false);
        }
    };

    useEffect(() => {
        getRooms();
    }, []);

    return { roomsData, roomLoading, roomError };
}