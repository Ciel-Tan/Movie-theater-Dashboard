export const PrePaginate = (data, currentPage, itemsPerPage) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Ensure currentPage is within valid bounds
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    // Calculate the starting and ending indices
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = data.slice(startIndex, endIndex);
    
    // Generate page numbers for pagination controls
    const pageNumbers = [];
    const maxVisiblePages = 3; // Number of page buttons to show
    const ellipsis = '...';

    // Construct page number logic
    if (totalPages <= maxVisiblePages) {
        // If total pages are less than or equal to visible pages, show all
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        // Always show first page
        pageNumbers.push(1);

        if (currentPage > 3) {
            pageNumbers.push(ellipsis);
        }

        // Show current page and neighboring pages
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        // Always show last page
        if (currentPage < totalPages - 2) {
            pageNumbers.push(ellipsis);
        }
        pageNumbers.push(totalPages);
    }

    return {
        currentItems,
        totalPages,
        pageNumbers,
        currentPage,
    };
};