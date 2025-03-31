'use client';

import { useEffect, useState } from "react";
import TextInput from "../input/TextInput";
import SelectOptionInput from "../input/SelectOptionInput";
import CheckBoxInput from "../input/CheckBoxInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useGetGenre } from "@/hooks/useGetGenre";
import { useGetActor } from "@/hooks/useGetActor";
import SearchFilterInput from "../input/SearchFilterInput";
import { useGetRoom } from "@/hooks/useGetRoom";
import ButtonTextInput from "../input/ButtonTextInput";
import formatDay from "@/utils/formatDay";

export default function Movie(props) {
    const { movie = {} } = props;
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const { genresData } = useGetGenre();
    const { actorsData } = useGetActor();
    const { roomsData } = useGetRoom();

    const [data, setData] = useState({
        movie_id: movie.movie_id || 0,
        title: movie.title || "",
        poster_image: movie.poster_image || "",
        description: movie.description || "",
        age_rating: movie.age_rating || 0,
        run_time: movie.run_time || 0,
        release_date: movie.release_date || "",
        trailer_link: movie.trailer_link || "",
        language: movie.language || "",
        director: movie.director || {},
        genres: movie.genres?.map((genre) => genre.genre_name) || [],
        actors: movie.actors?.map((actor) => actor.actor_name) || [],
        showtime: movie.showtime?.map((showtime) => ({
            show_datetime: showtime.show_datetime,
            room_name: showtime.room.room_name,
        })) || [],
    });

    useEffect(() => {
        const formattedDate = data.release_date && formatDay({ date: data.release_date});
        setData((prevData) => ({ ...prevData, release_date: formattedDate }));
    }, []);

    const attributes = {
        left: [
            { id: "poster_image", label: "Background Poster", placeholder: "Poster image link" },
            { id: "title", label: "Movie title", placeholder: "Enter the movie title" },
            { id: "description", label: "Description", placeholder: "Enter a brief description" },
            { id: "actors", label: "Actor", placeholder: "Enter an actor" },
            { id: "room", label: "Room", placeholder: "" },
        ],
        rightUp: [
            { id: "director", label: "Director", placeholder: "Name of the director" },
            { id: "age_rating", label: "Age rating", placeholder: "Enter the age rating" },
            { id: "run_time", label: "Run time", placeholder: "Enter run time in minutes" },
            { id: "release_date", label: "Release Day", placeholder: "dd/mm/yyyy" },
            { id: "trailer_link", label: "Trailer Link", placeholder: "Link to trailer" },
            { id: "language", label: "Language", placeholder: "Enter language" },
        ],
        rightDown: [
            { id: "genres", label: "Genre", placeholder: "Enter genre" },
        ]
    }

    const [showRoom, setShowRoom] = useState({});

    useEffect(() => {
        const initialShowRoom = roomsData.reduce((acc, room) => {
            acc[room.room_name] = false;
            return acc;
        }, {});
        setShowRoom(initialShowRoom);
    }, [roomsData]);

    const showRoomOptions = roomsData.map((room) => room.room_name);

    const languageOptions = ["English", "Vietnamese", "Japanese", "Korean", "Chinese", "French", "German", "Thailand", "Spanish"];

    const genreOptions = genresData.map((genre) => genre.genre_name);

    const toggleInputVisibility = (roomName) => {
        setShowRoom((prev) => ({ ...prev, [roomName]: !prev[roomName] }));
    };

    const handleInputChange = (roomName, date, times) => {
        const newShowtime = times
            .filter((time) => time)
            .map((time) => ({
                show_datetime: `${date}T${time}:00`,
                room_name: roomName,
            }));

        setData((prevData) => {
            const filteredShowtime = prevData.showtime.filter(
                (show) => !(show.room_name === roomName && show.show_datetime.startsWith(date))
            );

            return {
                ...prevData,
                showtime: [...filteredShowtime, ...newShowtime],
            };
        });
    };

    const handleChange = (e, attr) => {
        const { value, checked } = e.target;

        if (attr === "genres") {
            setData((prevData) => ({
                ...prevData,
                genres: checked 
                    ? [...prevData.genres, value] 
                    : prevData.genres.filter((genre) => genre !== value)
            }));
        }
        else {
            setData((prevData) => ({ ...prevData, [attr]: value }));
        }
    };

    const handleChangeActor = (actor) => {
        setData((prevData) => {
            const actorExists = prevData.actors.includes(actor.actor_name);
            return {
                ...prevData,
                actors: actorExists 
                    ? prevData.actors
                    : [...prevData.actors, actor.actor_name],
            };
        });
    };

    const handleAddActor = (actor) => {
        setData((prevData) => ({
            ...prevData,
            actors: [...prevData.actors, actor.actor_name],
        }));
        actorsData.push(actor);
    };

    const handleRemoveActor = (actor) => {
        console.log(actor);
        setData((prevData) => ({
            ...prevData,
            actors: prevData.actors.filter((a) => a !== actor.actor_name),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (movie.movie_id) {
            try {
                await axios.put(`/api/movies/${movie.movie_id}`, {...data});
            }
            catch (error) {
                console.error("Error updating movie:", error);
            }
        } 
        else {
            try {
                await axios.post('/api/movies/create', data);
            }
            catch (error) {
                console.error("Error creating movie:", error);
            }
        }

        setRedirect(true);
    };

    if (redirect) {
        router.push('/');
        return null;
    }

    return (
        <form className="addMovieForm" onSubmit={handleSubmit}>
            {/* Preview background poster and image poster */}
            <div className="w-100 flex gap-3 mt-1">
                {data.poster_image && (
                    <div className="bgPoster flex flex-col w-70 flex-left">
                        <img src={data.poster_image} alt="Preview bgPoster" />
                        <label htmlFor="bgPoster" className="w-100">Background Poster Image Preview</label>
                    </div>
                )}

                {data.poster_image && (
                    <div className="smPoster flex flex-col w-30 flex-left">
                        <img src={data.poster_image} alt="Preview smPoster" />
                        <label htmlFor="smPoster" className="w-100">Main Poster Preview</label>
                    </div>
                )}
            </div>

            <div className="formData w-100 flex flex-sb mt-3 flex-left">
                {/* Left side */}
                <div className="w-50 flex flex-col flex-left">
                    {attributes.left.map((attr) => (
                        <div className="w-100 flex flex-col flex-left mb-2" key={attr.id}>
                            <label htmlFor={attr.id}>{attr.label}</label>
                            {attr.id === 'actors' ? (
                                <SearchFilterInput
                                    data={actorsData}
                                    selectedData={data.actors}
                                    attribute={attr}
                                    onChange={handleChangeActor}
                                    onAdd={handleAddActor}
                                    onRemove={handleRemoveActor}
                                />
                            ) : attr.id === 'room' ? (
                                <ButtonTextInput
                                    data={data.showtime}
                                    renderItem={showRoomOptions}
                                    toggleInputVisibility={toggleInputVisibility}
                                    showRooms={showRoom}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <TextInput
                                    data={data[attr.id]}
                                    attribute={attr}
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Right side */}
                <div className="w-50 flex flex-col flex-left">
                    {/* Right up */}
                    {attributes.rightUp.map((attr) => (
                        <div className="w-100 flex flex-col flex-left mb-2" key={attr.id}>
                            <label htmlFor={attr.id}>{attr.label}</label>
                            {attr.id === 'language' ? (
                                <SelectOptionInput
                                    data={languageOptions}
                                    selectedData={data.language}
                                    attribute={attr}
                                    onChange={handleChange}
                                />
                            ) : (
                                <TextInput
                                    data={attr.id === 'director' ? data.director.director_name : data[attr.id]}
                                    attribute={attr}
                                    onChange={handleChange}
                                />
                            )}      
                        </div>
                    ))}

                    {/* Right down */}
                    <div className="movieCategory flex flex-sb flex-left">
                        {attributes.rightDown.map((attr) => (
                            <div className="w-80 flex flex-col flex-left mb-2" key={attr.id}>
                                <label htmlFor={attr.id}>{attr.label} : </label>
                                    <CheckBoxInput
                                        data={data.genres}
                                        renderItem={genreOptions}
                                        attribute={attr}
                                        onChange={handleChange}
                                    />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Save */}
            <div className="w-100 mb-2">
                <button type="submit" className="w-100 flex-center">SAVE DATA</button>
            </div>
        </form>
    );
}