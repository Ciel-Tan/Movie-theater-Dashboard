import { searchContent, process, deleteContent } from "@/services/searchContentService";
import { useState } from "react";

export const useActionSearchContent = () => {
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchSuccess, setSearchSuccess] = useState("");
    const [searchError, setSearchError] = useState(null);

    const searchContentWithTimeStamp = async (query) => {
        setSearchLoading(true);
        try {
            const response = await searchContent(query);
            return response;
        }
        catch (error) {
            console.error("Error in search content hook:", error);
            setSearchError(error);
        }
        finally {
            setSearchLoading(false);
        }
    };

    const processYoutubeUrl = async (poster_url, youtube_url, language) => {
        setSearchLoading(true);
        try {
            const response = await process(poster_url, youtube_url, language);
            setSearchSuccess(response.message);
        }
        catch (error) {
            console.error("Error in process youtube url hook:", error);
            setSearchError(error);
        }
        finally {
            setSearchLoading(false);
        }
    };

    const deleteContentWithTimeStamp = async (video_id) => {
        setSearchLoading(true);
        try {
            const response = await deleteContent(video_id);
            setSearchSuccess(response.message || response.error);
        }
        catch (error) {
            console.error("Error in delete content hook:", error);
            setSearchError(error);
        }
        finally {
            setSearchLoading(false);
        }
    };

    return {
        searchContentWithTimeStamp,
        processYoutubeUrl,
        deleteContentWithTimeStamp,
        searchLoading,
        searchSuccess,
        searchError
    };
}