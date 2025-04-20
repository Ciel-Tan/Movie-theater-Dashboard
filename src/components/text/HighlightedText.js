const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Escape special regex characters to prevent errors
const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const HighlightedText = ({ text, searchQuery }) => {
    // Handle empty search query
    if (!searchQuery || searchQuery.trim() === "") {
        return <span>{text}</span>;
    }

    // Normalize both text and search query by removing diacritics
    const normalizedText = removeDiacritics(text);
    const normalizedQuery = removeDiacritics(searchQuery);

    // Escape the query for safe regex usage and create a case-insensitive, global regex
    const escapedQuery = escapeRegExp(normalizedQuery);
    const regex = new RegExp(escapedQuery, 'gi');

    // Find all match positions in the normalized text
    let match;
    const matches = [];
    while ((match = regex.exec(normalizedText)) !== null) {
        matches.push({ start: match.index, end: match.index + match[0].length });
    }

    // If no matches, return the text as is
    if (matches.length === 0) {
        return <span>{text}</span>;
    }

    // Split the original text into parts based on match positions
    let lastIndex = 0;
    const parts = [];
    for (const { start, end } of matches) {
        if (start > lastIndex) {
            parts.push({ text: text.substring(lastIndex, start), highlight: false });
        }
        parts.push({ text: text.substring(start, end), highlight: true });
        lastIndex = end;
    }
    if (lastIndex < text.length) {
        parts.push({ text: text.substring(lastIndex), highlight: false });
    }

    // Render parts with highlighting for matches
    return (
        <span>
            {parts.map((part, index) => (
                <span
                    key={index}
                    className={part.highlight ? "highlight" : ""}
                >
                    {part.text}
                </span>
            ))}
        </span>
    );
};