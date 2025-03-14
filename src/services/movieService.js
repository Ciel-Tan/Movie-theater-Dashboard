import api from "@/utils/axios";

export const getAllMovies = async () => {
    try {
        const { data: movies } = await api.get("/api/public/movies/getAll");
        return movies;
    } catch (error) {
        console.error("Error in getAllMovies service:", error);
        throw error;
    }
};

export const getMovieById = async (id) => {
    try {
        const { data: movie } = await api.get(`/api/public/movies/${id}`);
        return movie;
    } catch (error) {
        console.error("Error in getMovieById service:", error);
        throw error;
    }
};
export const addMovie = (data) => api.post("/api/movies/create", data);
export const updateMovie = (id, data) => api.put(`/api/movies/${id}`, data);
export const deleteMovie = (id) => api.delete(`/api/movies/${id}`);