import { useState, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ShowRoomButton from './ShowRoomButton';

const ButtonTextInput = ({ data, rooms, cinemas, onChange }) => {
    // rooms is an array of room objects { room_id, room_name }
    const half = Math.ceil(rooms.length / 2);
    const firstHalf = rooms.slice(0, half);
    const secondHalf = rooms.slice(half);
    const renderRoom = [firstHalf, secondHalf];

    // cinemaData structure:
    // cinemaData[cinemaName] = {
    //   [roomName]: {
    //     selectedDate: '',
    //     timesByDate: { '2025-04-01': ['10:00', '11:00'] }
    //   }
    // }
    const [cinemaData, setCinemaData] = useState({});
    const [selectedCinema, setSelectedCinema] = useState({});
    const [showRoom, setShowRoom] = useState({});
    const initialized = useRef(false);

    useEffect(() => {
        setSelectedCinema(cinemas[0]);
    }, [cinemas])

    useEffect(() => {
        const initialShowRoom = rooms.reduce((acc, room) => {
            acc[room.room_name] = false;
            return acc;
        }, {});
        setShowRoom(initialShowRoom);
    }, [rooms]);

    const toggleInputVisibility = (roomName) => {
        setShowRoom((prev) => ({ ...prev, [roomName]: !prev[roomName] }));
    };

    useEffect(() => {
        if (initialized.current) return;
        if (!data || !data.length) return;

        const initialCinemaData = {};
        data.forEach((item) => {
            if (item.show_datetime) { // Removed the includes("T") check
                const [datePart, timePartRaw] = item.show_datetime.split(" ");
                const formattedTime = timePartRaw ? timePartRaw.substring(0, 5) : "";
                const cinemaName = item.cinema.cinema_name;
                const roomName = item.room.room_name;
                

                if (!initialCinemaData[cinemaName]) {
                    initialCinemaData[cinemaName] = {};
                }

                if (!initialCinemaData[cinemaName][roomName]) {
                    initialCinemaData[cinemaName][roomName] = {
                        selectedDate: datePart,
                        timesByDate: { [datePart]: [formattedTime] },
                    };
                }
                else {
                    if (!initialCinemaData[cinemaName][roomName].timesByDate[datePart]) {
                        initialCinemaData[cinemaName][roomName].timesByDate[datePart] = [];
                    }
                    initialCinemaData[cinemaName][roomName].timesByDate[datePart].push(formattedTime);
                }
            }
        });
        setCinemaData(initialCinemaData);

        initialized.current = true;
    }, [data]);

    const handleDateChange = (room, value) => {
        const roomName = room.room_name;
        setCinemaData((prev) => {
            const currentCinema = prev[selectedCinema.cinema_name] || {};
            const currentRoom = currentCinema[roomName] || { selectedDate: '', timesByDate: {} };
            const currentTimes = currentRoom.timesByDate[value] ?? [''];
            const updatedRoom = {
                selectedDate: value,
                timesByDate: {
                    ...currentRoom.timesByDate,
                    [value]: currentTimes,
                },
            };

            return {
                ...prev,
                [selectedCinema.cinema_name]: {
                    ...currentCinema,
                    [roomName]: updatedRoom,
                },
            }
        })
    };

    const handleAddTime = (room) => {
        const roomName = room.room_name;
        setCinemaData((prev) => {
            const currentCinema = prev[selectedCinema.cinema_name] || {};
            const currentRoom = currentCinema[roomName] || { selectedDate: '', timesByDate: {} };
            const date = currentRoom.selectedDate;
            if (!date) return prev; // Do nothing if no date is selected

            const currentTimes = currentRoom.timesByDate[date] || [''];
            const updatedTimes = [...currentTimes, ''];
            const updatedRoom = {
                ...currentRoom,
                timesByDate: {
                    ...currentRoom.timesByDate,
                    [date]: updatedTimes,
                },
            };

            return {
                ...prev,
                [selectedCinema.cinema_name]: {
                    ...currentCinema,
                    [roomName]: updatedRoom,
                }
            };
        });
    };

    const handleTimeChange = (room, index, value) => {
        const roomName = room.room_name;
        setCinemaData((prev) => {
            const currentCinema = prev[selectedCinema.cinema_name] || {};
            const currentRoom = currentCinema[roomName] || { selectedDate: '', timesByDate: {} };
            const date = currentRoom.selectedDate;
            if (!date) return prev;

            const currentTimes = currentRoom.timesByDate[date] || [''];
            const updatedTimes = [...currentTimes];
            updatedTimes[index] = value;
            const updatedRoom = {
                ...currentRoom,
                timesByDate: {
                    ...currentRoom.timesByDate,
                    [date]: updatedTimes,
                },
            };

            onChange(selectedCinema, room, date, updatedTimes.filter(time => time)); // Filter out empty times on change

            return {
                ...prev,
                [selectedCinema.cinema_name]: {
                    ...currentCinema,
                    [roomName]: updatedRoom,
                },
            };
        });
    };

    const handleRemoveTime = (room, index) => {
        const roomName = room.room_name;
        setCinemaData((prev) => {
            const currentCinema = prev[selectedCinema.cinema_name] || {};
            const currentRoom = currentCinema[roomName] || { selectedDate: '', timesByDate: {} };
            const date = currentRoom.selectedDate;
            if (!date) return prev;
            const currentTimes = currentRoom.timesByDate[date] || [];
            const updatedTimes = currentTimes.filter((_, i) => i !== index);
            const updatedRoom = {
                ...currentRoom,
                timesByDate: {
                    ...currentRoom.timesByDate,
                    [date]: updatedTimes,
                },
            };

            onChange(selectedCinema, room, date, updatedTimes.filter(time => time)); // Filter out empty times on remove

            return {
                ...prev,
                [selectedCinema.cinema_name]: {
                    ...currentCinema,
                    [roomName]: updatedRoom,
                }
            };
        });
    };

    // Helper: get the times for the currently selected date of a room
    const getCurrentTimes = (room) => {
        const roomName = room.room_name;
        const roomInfo = cinemaData[selectedCinema.cinema_name]?.[roomName];
        if (!roomInfo || !roomInfo.selectedDate) return [];
        return roomInfo.timesByDate[roomInfo.selectedDate] || [];
    };

    // useEffect(() => {
    //     console.log('cinemaData', cinemaData);
    // }, [cinemaData])

    return (
        <div className="w-100">
            <select
                onChange={
                    (e) => setSelectedCinema(cinemas.find(c => c.cinema_name === e.target.value))
                }
                className="mb-2"
            >
                {cinemas.map(cinema => (
                    <option key={cinema.cinema_id} value={cinema.cinema_name}>
                        {cinema.cinema_name}
                    </option>
                ))}
            </select>

            {/* Render buttons for each room */}
            {renderRoom.map((rooms, index) => (
                <ShowRoomButton
                    key={index}
                    rooms={rooms}
                    showRoom={showRoom || {}}
                    toggleInputVisibility={toggleInputVisibility}
                />
            ))}

            {/* Render inputs for visible rooms */}
            {rooms.map((room) => (
                showRoom[room.room_name] && (
                    <div key={room.room_id} className="w-80 mt-1" style={{ display: 'flex', gap: '5px' }}>
                        <div style={{ width: '50%' }}>
                            <ReactDatePicker
                                selected={
                                    cinemaData[selectedCinema.cinema_name]?.[room.room_name]?.selectedDate
                                        ? new Date(cinemaData[selectedCinema.cinema_name]?.[room.room_name]?.selectedDate)
                                        : null
                                }
                                dateFormat={'dd/MM/yyyy'}
                                onChange={(date) => {
                                    const localDate = date ? date.toLocaleDateString('en-CA') : '';
                                    handleDateChange(room, localDate);
                                }}
                                placeholderText={'Choose a date'}
                                // minDate={new Date()}
                                dayClassName={(date) => {
                                    const localDate = date.toLocaleDateString('en-CA');
                                    const times = cinemaData[selectedCinema.cinema_name]?.[room.room_name]?.timesByDate[localDate] || [];
                                    return times.some((time) => time && time.trim() !== '') ? 'highlight' : undefined;
                                }}
                                calendarClassName="custom-calendar"
                            />
                            <div
                                className="dreSolBtn"
                                onClick={() => handleAddTime(room)}
                                style={{ cursor: 'pointer', marginTop: '0.5rem' }}
                            >
                                New time
                            </div>
                        </div>
                        <div className="w-50">
                            {getCurrentTimes(room).map((time, index) => (
                                <div key={index} className="w-100 flex flex-sb flex-center mb-05">
                                    <input
                                        type="time"
                                        value={time}
                                        onChange={(e) => handleTimeChange(room, index, e.target.value)}
                                        style={{ width: '90%' }}
                                    />
                                    <IoClose
                                        onClick={() => handleRemoveTime(room, index)}
                                        size={20}
                                        style={{ cursor: 'pointer', color: 'red', marginTop: '5px' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default ButtonTextInput;