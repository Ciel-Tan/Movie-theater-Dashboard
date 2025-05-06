import React, { useMemo } from 'react';

const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return `${dateStr} at ${timeStr}`;
};

const ShowtimeList = ({ showtimes }) => {
    const groupedData = useMemo(() => {
        const cinemaMap = new Map();
        showtimes.forEach(st => {
            if (!cinemaMap.has(st.cinema.cinema_id)) {
                cinemaMap.set(st.cinema.cinema_id, st.cinema);
            }
        });
        const uniqueCinemas = Array.from(cinemaMap.values());

        return uniqueCinemas.map(cinema => {
            const cinemaShowtimes = showtimes.filter(st => st.cinema.cinema_id === cinema.cinema_id);
            const roomMap = new Map();
            cinemaShowtimes.forEach(st => {
                if (!roomMap.has(st.room.room_id)) {
                    roomMap.set(st.room.room_id, st.room);
                }
            });
            const uniqueRooms = Array.from(roomMap.values());
            const rooms = uniqueRooms.map(room => {
                const roomShowtimes = cinemaShowtimes.filter(st => st.room.room_id === room.room_id);
                return {
                    room,
                    showtimes: roomShowtimes.sort((a, b) => new Date(a.show_datetime) - new Date(b.show_datetime))
                };
            });
            return {
                cinema,
                rooms
            };
        });
    }, [showtimes]);

    return (
        <div>
            {groupedData.length > 0 ? (
                groupedData.map(({ cinema, rooms }) => (
                    <div key={cinema.cinema_id}>
                        <h2>{cinema.cinema_name}</h2>
                        <p>{cinema.address.address_name}</p>
                        {rooms.map(({ room, showtimes }) => (
                            <div key={room.room_id}>
                                <h3>{room.room_name}</h3>
                                <ul>
                                    {showtimes.map(st => (
                                        <li key={st.showtime_id}>
                                            {formatDateTime(st.show_datetime)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>No showtimes available.</p>
            )}
        </div>
    );
};

export default ShowtimeList;