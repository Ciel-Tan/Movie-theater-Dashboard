import api from "@/utils/axios";

export const getAllMovies = async () => {
    try {
        const { data: movies } = await api.get("/api/public/movies/getAll");
        return movies;
    } catch (error) {
        console.error("Error in getAllMovies service:", error);
    }
};

export const getMovieById = async (id) => {
    try {
        const { data: movie } = await api.get(`/api/public/movies/${id}`);
        return movie;
    } catch (error) {
        console.error("Error in getMovieById service:", error);
    }
};
export const addMovie = async (data) => {
    try {
        const { data: movie } = await api.post("/api/movies/create", data)
        return movie
    }
    catch (error) {
        console.error("Error in addMovie service:", error);
    }
};
export const updateMovie = (id, data) => api.put(`/api/movies/${id}`, data);
export const deleteMovie = (id) => api.delete(`/api/movies/${id}`);