import { useState } from "react";
import Spinner from "../layout/Spinner";
import { PrePaginate } from "../pagination/PrePaginate";
import ListMoviesTitle from "../title/ListMoviesTitle";
import Paginate from "../pagination/Paginate";
import RenderItemMovie from "../render/RenderItemMovie";

const ListMovie = ({ status, data, loading, error, searchQuery }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const { currentItems, totalPages, pageNumbers } = PrePaginate(data, currentPage, itemsPerPage);

    return (
        <div className="movieCards flex flex-col flex-left gap-2 w-100">
            <ListMoviesTitle status={status} />

            {loading ? <Spinner /> : data.length === 0 ? (
                <h1 className="flex w-100 flex-center text-center">
                    Currently no movie data
                </h1>
            ) : error ? (
                <span className="error">
                    {error}
                </span>
            ) : (
                <RenderItemMovie status={status} data={currentItems} searchQuery={searchQuery} />
            )}

            {!loading && data.length > 0 && (
                <Paginate
                    totalPages={totalPages}
                    currentPage={currentPage}
                    pageNumbers={pageNumbers}
                    onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                />
            )}
        </div>
    );
}
 
export default ListMovie;