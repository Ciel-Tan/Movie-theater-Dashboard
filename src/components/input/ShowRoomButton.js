const ShowRoomButton = ({ rooms, showRoom, toggleInputVisibility }) => {
    return (
        <div className="flex flex-sb w-80">
            {rooms.map((room) => (
                <div
                    key={room.room_id}
                    className={showRoom[room.room_name] ? 'dreSolBtn active' : 'dreSolBtn'}
                    onClick={() => toggleInputVisibility(room.room_name)}
                >
                    {room.room_name}
                </div>
            ))}
        </div>
    );
}
 
export default ShowRoomButton;