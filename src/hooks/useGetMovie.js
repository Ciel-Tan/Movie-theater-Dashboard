'use client';

import { getAllMovies, getMovieById } from "@/services/movieService";
import { useEffect, useState } from "react";

export const useGetMovie = (id) => {
    const [moviesData, setMoviesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getMovies = async () => {
        setLoading(true);
        try {
            const movies = await getAllMovies();
            setMoviesData(movies);
        }
        catch (error) {
            console.error("Error get all movies: ", error);
            setError("Failed to get all movies");
        }
        finally {
            setLoading(false);
        }
    };

    const getMovieDetail = async () => {
        setLoading(true);
        try {
            const movie = await getMovieById(id);
            setMoviesData(movie);
        }
        catch (error) {
            console.error("Error get movie by id: ", error);
            setError("Failed to get movie by id");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        id ? getMovieDetail() : getMovies();
    }, []);

    return {
        moviesData,
        loading,
        error
    };
};