import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import ShowRoomButton from './ShowRoomButton';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ButtonTextInput = ({ data, renderItem, toggleInputVisibility, showRooms, onChange }) => {
    console.log(data)
    const half = Math.ceil(renderItem.length / 2);
    const firstHalf = renderItem.slice(0, half);
    const secondHalf = renderItem.slice(half);
    const renderRoom = [firstHalf, secondHalf];

    // Structure: 
    // roomData[room] = {
    //   selectedDate: '', // currently selected date
    //   timesByDate: {      // map each date to an array of times
    //      '2025-04-01': ['10:00', '11:00'],
    //      '2025-04-02': ['22:00', '23:00']
    //   }
    // }
    const [roomData, setRoomData] = useState({});

    useEffect(() => {
        const initialRoomData = {};
        renderItem.forEach((room) => {
            if (!roomData[room]) {
                initialRoomData[room] = {
                    selectedDate: '',
                    timesByDate: {},
                };
            }
        });
        setRoomData((prev) => ({ ...prev, ...initialRoomData }));
    }, [renderItem]);

    const handleDateChange = (room, value) => {
        setRoomData((prev) => {
            const currentRoom = prev[room];
            // Check if there are already times stored for the new date; otherwise initialize an empty array (or one empty string if you prefer)
            const currentTimes = currentRoom.timesByDate[value] ?? [''];
            const updatedRoom = {
                selectedDate: value,
                timesByDate: {
                    ...currentRoom.timesByDate,
                    [value]: currentTimes,
                },
            };

            // Callback when a date is selected with its current times
            if (value) {
                setTimeout(() => {
                    onChange(room, value, currentTimes);
                }, 0);
            }

            return {
                ...prev,
                [room]: updatedRoom,
            };
        });
    };

    const handleAddTime = (room) => {
        setRoomData((prev) => {
            const currentRoom = prev[room];
            const date = currentRoom.selectedDate;
            if (!date) return prev; // do nothing if no date is selected

            const currentTimes = currentRoom.timesByDate[date] || [''];
            const updatedTimes = [...currentTimes, ''];
            const updatedRoom = {
                ...currentRoom,
                timesByDate: {
                    ...currentRoom.timesByDate,
                    [date]: updatedTimes,
                },
            };

            if (date) {
                onChange(room, date, updatedTimes);
            }

            return {
                ...prev,
                [room]: updatedRoom,
            };
        });
    };

    const handleTimeChange = (room, index, value) => {
        setRoomData((prev) => {
            const currentRoom = prev[room];
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

            if (date) {
                onChange(room, date, updatedTimes);
            }

            return {
                ...prev,
                [room]: updatedRoom,
            };
        });
    };

    const handleRemoveTime = (room, index) => {
        setRoomData((prev) => {
            const currentRoom = prev[room];
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

            if (date) {
                onChange(room, date, updatedTimes);
            }

            return {
                ...prev,
                [room]: updatedRoom,
            };
        });
    };

    // Helper: get the times for the currently selected date of a room
    const getCurrentTimes = (room) => {
        const roomInfo = roomData[room];
        if (!roomInfo || !roomInfo.selectedDate) return [];
        return roomInfo.timesByDate[roomInfo.selectedDate] || [];
    };

    useEffect(() => {
        if (data && data.length) {
            const initialRoomData = {};

            data.forEach((item) => {
            const room = item.room_name;
            const [dateStr, timeStr] = item.show_datetime.split(" ");
            const formattedTime = timeStr.substring(0, 5);
            
            if (!initialRoomData[room]) {
                initialRoomData[room] = {
                    selectedDate: dateStr,
                    timesByDate: {
                        [dateStr]: [formattedTime],
                    },
                };
            }
            else {
                if (initialRoomData[room].timesByDate[dateStr]) {
                    initialRoomData[room].timesByDate[dateStr].push(formattedTime);
                }
                else {
                    initialRoomData[room].timesByDate[dateStr] = [formattedTime];
                }
            }
            });

            setRoomData((prev) => ({ ...prev, ...initialRoomData }));
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
                showRooms[room] && (
                    <div key={room} className="w-100 mt-1" style={{ display: 'flex', gap: '5px' }}>
                        <div style={{ width: '50%' }}>
                            <ReactDatePicker
                                selected={roomData[room]?.selectedDate ? new Date(roomData[room].selectedDate) : null}
                                dateFormat={'dd/MM/yyyy'}
                                onChange={(date) => {
                                    const localDate = date.toLocaleDateString('en-CA');
                                    handleDateChange(room, localDate);
                                }}
                                placeholderText={'Choose a date'}
                                minDate={new Date()}
                                dayClassName={(date) => {
                                    const localDate = date.toLocaleDateString('en-CA');
                                    const times = roomData[room]?.timesByDate[localDate] || [];
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
