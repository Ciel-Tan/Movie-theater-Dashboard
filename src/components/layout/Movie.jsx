'use client';

import { useEffect, useState } from "react";
import TextInput from "../input/TextInput";
import SelectOptionInput from "../input/SelectOptionInput";
import CheckBoxInput from "../input/CheckBoxInput";
import { useGetGenre } from "@/hooks/useGetGenre";
import { useGetActor } from "@/hooks/useGetActor";
import SearchFilterInput from "../input/SearchFilterInput";
import { useGetRoom } from "@/hooks/useGetRoom";
import ButtonTextInput from "../input/ButtonTextInput";
import { useActionMovie } from "@/hooks/useActionMovie";
import Loader from "../loading/Loader";
import { useToastNotify } from "@/utils/toast";
import DayInput from "../input/DayInput";
import { formatDay } from "@/utils/format";
import { useActionSearchContent } from "@/hooks/useActionSearchContent";
import { useGetCinema } from "@/hooks/useGetCinema";

export default function Movie(props) {
    const { movie = {} } = props;

    const { genresData } = useGetGenre();
    const { actorsData } = useGetActor();
    const { roomsData } = useGetRoom();
    const { cinemasData } = useGetCinema();
    const { createMovie, editMovie, loading, success, error } = useActionMovie();
    const { processYoutubeUrl } = useActionSearchContent();

    const [data, setData] = useState({
        movie_id: movie.movie_id || 0,
        title: movie.title || "",
        poster_image: movie.poster_image || "",
        description: movie.description || "",
        age_rating: movie.age_rating || 16,
        run_time: movie.run_time || 0,
        release_date: movie.release_date || "",
        trailer_link: movie.trailer_link || "",
        language: movie.language || "English",
        director: movie.director || {},
        genres: movie.genres || [],
        actors: movie.actors || [],
        showtime: movie.showtime || [],
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            release_date: formatDay({ date: data.release_date })
        }));
    }, [data.release_date]);

    const attributes = {
        left: [
            { id: "poster_image", label: "Background Poster", placeholder: "Poster image link" },
            { id: "title", label: "Movie title", placeholder: "Enter the movie title" },
            { id: "description", label: "Description", placeholder: "Enter a brief description" },
            { id: "actors", label: "Actor", placeholder: "Enter an actor" },
            { id: "cinema", label: "Cinema", placeholder: "" },
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

    const languageOptions = ["English", "Vietnamese", "Japanese", "Korean", "Chinese", "French", "German", "Thailand", "Spanish"];

    const handleShowtimeChange = (cinema, room, date, times) => {
        const newShowtime = times
            .filter(time => time)
            .map((time) => ({
                showtime_id: Math.ceil(Date.now() / 1000),
                cinema: cinema,
                room: room,
                show_datetime: `${date} ${time}:00.000000`, // Ensure correct datetime format
            }));


        setData((prevData) => {
            // Remove existing showtimes for this room and date
            const filteredShowtime = prevData.showtime.filter((show) => !(
                show.cinema.cinema_name === cinema.cinema_name &&
                show.room.room_name === room.room_name &&
                show.show_datetime.startsWith(date)
            ));
            return {
                ...prevData,
                showtime: [...filteredShowtime, ...newShowtime],
            };
        });
    };

    const handleChange = (e, attr, item = null) => {
        const { value, checked } = e.target;

        if (attr === "genres") {
            setData((prevData) => ({
                ...prevData,
                genres: checked 
                    ? [...prevData.genres, item] 
                    : prevData.genres.filter((genre) => genre !== item),
            }));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                [attr]: attr === "age_rating" || attr === "run_time" 
                    ? Number(value) 
                    : attr === "director"
                        ? { director_id: Date.now(), director_name: value } 
                        : value,
            }));
        }
    };

    const handleChangeActor = (actor) => {
        setData((prevData) => {
            const actorExists = prevData.actors.some((a) => a.actor_id === actor.actor_id);
            return {
                ...prevData,
                actors: actorExists 
                    ? prevData.actors
                    : [...prevData.actors, actor],
            };
        });
    };

    const handleAddActor = (actor) => {
        setData((prevData) => ({
            ...prevData,
            actors: [...prevData.actors, actor],
        }));
        actorsData.push(actor);
    };

    const handleRemoveActor = (actor) => {
        setData((prevData) => ({
            ...prevData,
            actors: prevData.actors.filter((a) => a.actor_id !== actor.actor_id),
        }));
    };

    useToastNotify(success, error, "/");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (movie.movie_id) {
            await editMovie(movie.movie_id, data);
        }
        else {
            await Promise.all([
                createMovie(data),
                processYoutubeUrl(data.poster_image, data.trailer_link, data.language),
            ]);
        }
    };

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
                            ) : attr.id === 'cinema' ? (
                                <ButtonTextInput
                                    data={data.showtime}
                                    rooms={roomsData}
                                    cinemas={cinemasData}
                                    onChange={handleShowtimeChange}
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
                            ) : attr.id === 'release_date' ? (
                                <DayInput
                                    data={data.release_date}
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
                                        renderItem={genresData}
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
                <button type="submit" className="w-100 flex-center">
                    {loading ? <Loader /> : 'SAVE DATA'}
                </button>
            </div>
        </form>
    );
}