/**
 * Extracts the YouTube video ID from a YouTube URL
 * @param {string} url - The YouTube URL (e.g. https://www.youtube.com/watch?v=VIDEO_ID)
 * @returns {string} The YouTube video ID
 */
export const getYoutubeVideoId = (url) => {
    if (!url) return '';
    
    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : '';
}; 