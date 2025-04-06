import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ShowRoomButton from './ShowRoomButton';

const ButtonTextInput = ({ data, renderItem, toggleInputVisibility, showRooms, onChange }) => {
    // renderItem is an array of room objects { room_id, room_name }
    const half = Math.ceil(renderItem.length / 2);
    const firstHalf = renderItem.slice(0, half);
    const secondHalf = renderItem.slice(half);
    const renderRoom = [firstHalf, secondHalf];

    // Structure:
    // roomData[roomName] = {
    //   selectedDate: '',
    //   timesByDate: { '2025-04-01': ['10:00', '11:00'] }
    // }
    const [roomData, setRoomData] = useState({});

    useEffect(() => {
        // Only process data if both data and rooms are available
        if (data && data.length && renderItem.length) {
            const initialRoomData = {};
            data.forEach((item) => {
            if (item.show_datetime) { // Removed the includes("T") check
                const [datePart, timePartRaw] = item.show_datetime.split(" ");
                const formattedTime = timePartRaw ? timePartRaw.substring(0, 5) : "";
                const roomName = item.room.room_name;
                
                // Check if the room exists in renderItem
                const roomExists = renderItem.some(room => room.room_name === roomName);
                if (!roomExists) return;

                if (!initialRoomData[roomName]) {
                    initialRoomData[roomName] = {
                        selectedDate: datePart,
                        timesByDate: { [datePart]: [formattedTime] },
                    };
                }
                else {
                    if (!initialRoomData[roomName].timesByDate[datePart]) {
                        initialRoomData[roomName].timesByDate[datePart] = [];
                    }
                    initialRoomData[roomName].timesByDate[datePart].push(formattedTime);
                }
            }
            });

            // Merge with existing roomData, preserving user input
            setRoomData((prev) => {
            const merged = { ...prev };
            Object.keys(initialRoomData).forEach((roomName) => {
                if (!merged[roomName]) {
                 merged[roomName] = initialRoomData[roomName];
                }
                else {
                    merged[roomName] = {
                        ...merged[roomName],
                        timesByDate: {
                        ...merged[roomName].timesByDate,
                        ...initialRoomData[roomName].timesByDate,
                        },
                    };
                }
            });
            return merged;
            });
        }
    }, [data, renderItem]);

    const handleDateChange = (room, value) => {
        const roomName = room.room_name;
        setRoomData((prev) => {
            const currentRoom = prev[roomName] || { selectedDate: '', timesByDate: {} };
            // Retrieve times already stored for the new date, or initialize as an array with one empty string
            const currentTimes = currentRoom.timesByDate[value] ?? [''];
            const updatedRoom = {
                selectedDate: value,
                timesByDate: {
                    ...currentRoom.timesByDate,
                    [value]: currentTimes,
                },
            };

            // Notify parent component of the change
            if (value) {
                onChange(room, value, currentTimes.filter(time => time)); // Filter out empty times
            }

            return {
                ...prev,
                [roomName]: updatedRoom,
            };
        });
    };

    const handleAddTime = (room) => {
        const roomName = room.room_name;
        setRoomData((prev) => {
            const currentRoom = prev[roomName];
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
                [roomName]: updatedRoom,
            };
        });
    };

    const handleTimeChange = (room, index, value) => {
        const roomName = room.room_name;
        setRoomData((prev) => {
            const currentRoom = prev[roomName];
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

            onChange(room, date, updatedTimes.filter(time => time)); // Filter out empty times on change

            return {
                ...prev,
                [roomName]: updatedRoom,
            };
        });
    };

    const handleRemoveTime = (room, index) => {
        const roomName = room.room_name;
        setRoomData((prev) => {
            const currentRoom = prev[roomName];
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

            onChange(room, date, updatedTimes.filter(time => time)); // Filter out empty times on remove

            return {
                ...prev,
                [roomName]: updatedRoom,
            };
        });
    };

    // Helper: get the times for the currently selected date of a room
    const getCurrentTimes = (room) => {
        const roomName = room.room_name;
        const roomInfo = roomData[roomName];
        if (!roomInfo || !roomInfo.selectedDate) return [];
        return roomInfo.timesByDate[roomInfo.selectedDate] || [];
    };

    useEffect(() => {
        if (data && data.length) {
            const initialRoomData = {};
            data.forEach((item) => {
                // Check if show_datetime exists and contains "T"
                if (item.show_datetime && item.show_datetime.includes("T")) {
                    const [datePart, timePartRaw] = item.show_datetime.split("T");
                    // Ensure timePartRaw is defined before using substring
                    const formattedTime = timePartRaw ? timePartRaw.substring(0, 5) : "";
                    const roomName = item.room.room_name;

                    if (!initialRoomData[roomName]) {
                        initialRoomData[roomName] = {
                            selectedDate: datePart,
                            timesByDate: {
                                [datePart]: [formattedTime],
                            },
                        };
                    } else {
                        if (!initialRoomData[roomName].timesByDate[datePart]) {
                            initialRoomData[roomName].timesByDate[datePart] = [];
                        }
                        initialRoomData[roomName].timesByDate[datePart].push(formattedTime);
                    }
                }
            });
            // Merge with existing roomData to preserve any selections made by the user
            setRoomData((prev) => {
                const mergedData = { ...prev };
                for (const roomName in initialRoomData) {
                    if (!mergedData[roomName]) {
                        mergedData[roomName] = initialRoomData[roomName];
                    } else {
                        mergedData[roomName] = {
                            ...mergedData[roomName],
                            selectedDate: mergedData[roomName].selectedDate || initialRoomData[roomName].selectedDate,
                            timesByDate: {
                                ...mergedData[roomName].timesByDate,
                                ...initialRoomData[roomName].timesByDate,
                            },
                        };
                    }
                }
                return mergedData;
            });
        }
    }, [data]);


    return (
        <div className="w-80">
            {/* Render buttons for each room */}
            {renderRoom.map((rooms, index) => (
                <ShowRoomButton
                    key={index}
                    rooms={rooms}
                    showRooms={showRooms}
                    toggleInputVisibility={toggleInputVisibility}
                />
            ))}

            {/* Render inputs for visible rooms */}
            {renderItem.map((room) => (
                showRooms[room.room_name] && (
                    <div key={room.room_id} className="w-100 mt-1" style={{ display: 'flex', gap: '5px' }}>
                        <div style={{ width: '50%' }}>
                            <ReactDatePicker
                                selected={
                                    roomData[room.room_name]?.selectedDate 
                                    ? new Date(`${roomData[room.room_name].selectedDate}T00:00:00`)
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
                                    const times = roomData[room.room_name]?.timesByDate[localDate] || [];
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