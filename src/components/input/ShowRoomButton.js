const ShowRoomButton = ({ rooms, showRooms, toggleInputVisibility }) => {
    return (
        <div className="flex flex-sb">
            {rooms.map((room) => (
                <div
                    key={room}
                    className={showRooms[room] ? 'dreSolBtn active' : 'dreSolBtn'}
                    onClick={() => toggleInputVisibility(room)}
                >
                    {room}
                </div>
            ))}
        </div>
    );
}
 
export default ShowRoomButton;