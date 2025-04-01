'use client';

import { addMovie, deleteMovie, updateMovie } from "@/services/movieService";
import { useState } from "react";

export const useActionMovie = () => {
    const [movieData, setMovieData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState(null);

    const createMovie = async (data) => {
        setLoading(true);
        try {
            const response = await addMovie(data);
            setMovieData(response);
            setSuccess("Movie created successfully");
        }
        catch (error) {
            console.error("Error in create movie hook:", error);
            setError(error);
        }
        finally {
            setLoading(false);
        }
    };

    const editMovie = async (id, data) => {
        setLoading(true);
        try {
            const response = await updateMovie(id, data);
            setMovieData(response);
            setSuccess("Movie updated successfully");
        }
        catch (error) {
            console.error("Error in edit movie hook:", error);
            setError(error);
        }
        finally {
            setLoading(false);
        }
    };

    const removeMovie = async (id) => {
        setLoading(true);
        try {
            const response = await deleteMovie(id);
            setMovieData(response);
            setSuccess(response)
        }
        catch (error) {
            console.error("Error in delete movie hook:", error);
            setError(error);
        }
        finally {
            setLoading(false);
        }
    };

    return { createMovie, editMovie, removeMovie, movieData, loading, success, error };
}