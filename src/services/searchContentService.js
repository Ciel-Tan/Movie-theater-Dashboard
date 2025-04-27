import { AI_api } from "@/utils/axios"

export const process = async (poster_url, youtube_url, language) => {
    try {
        const { data: response } = await AI_api.post(`/process?poster_url=${poster_url}&youtube_url=${youtube_url}&language=${language}`);
        return response;
    }
    catch (error) {
        console.error("Error in process_youtube_url service:", error);
        return error;
    }
}

export const searchContent = async (query) => {
    try {
        const { data: response } = await AI_api.get(`/search?query=${query}`);
        return response;
    }
    catch (error) {
        console.error("Error in searchContent service:", error);
        return error;
    }
}

export const deleteContent = async (video_id) => {
    try {
        const { data: response } = await AI_api.delete(`/delete?video_id=${video_id}`);
        return response;
    }
    catch (error) {
        console.error("Error in delete_youtube_url service:", error);
        return error;
    }
}