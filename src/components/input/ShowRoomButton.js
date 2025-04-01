const ShowRoomButton = ({ rooms, showRooms, toggleInputVisibility }) => {
    return (
        <div className="flex flex-sb">
            {rooms.map((room) => (
                <div
                    key={room.room_id}
                    className={showRooms[room.room_name] ? 'dreSolBtn active' : 'dreSolBtn'}
                    onClick={() => toggleInputVisibility(room.room_name)}
                >
                    {room.room_name}
                </div>
            ))}
        </div>
    );
}
 
export default ShowRoomButton;