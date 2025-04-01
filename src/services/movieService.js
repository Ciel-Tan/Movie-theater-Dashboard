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
    console.log("data in service", data)
    try {
        const { data: movie } = await api.post("/api/movies/create", data);
        return movie
    }
    catch (error) {
        console.error("Error in addMovie service:", error);
    }
};
export const updateMovie = async (id, data) => {
    try {
        const { data: movie } = await api.put(`/api/movies/${id}`, data);
        return movie
    }
    catch (error) {
        console.error("Error in updateMovie service:", error);
    }
}
export const deleteMovie = async (id) => {
    try {
        const response = await api.delete(`/api/movies/${id}`);
        return response
    }
    catch (error) {
        console.error("Error in deleteMovie service:", error);
    }
}