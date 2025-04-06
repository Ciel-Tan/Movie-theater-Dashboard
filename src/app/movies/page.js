'use client'

import Spinner from "@/components/layout/Spinner";
import Paginate from "@/components/pagination/Paginate";
import { PrePaginate } from "@/components/pagination/PrePaginate";
import RenderItemMovie from "@/components/render/RenderItemMovie";
import ListMoviesTitle from "@/components/title/ListMoviesTitle";
import { useGetMovie } from "@/hooks/useGetMovie";
import { useState } from "react";

export default function Movies() {
    const { moviesData, loading, error } = useGetMovie()

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const { currentItems, totalPages, pageNumbers } = PrePaginate(moviesData, currentPage, itemsPerPage);
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="movieCards flex flex-col flex-left gap-2 w-100">
            <ListMoviesTitle status="Latest" />

            {loading ? <Spinner /> : moviesData.length === 0 ? (
                <h1 className="flex w-100 flex-center text-center">
                    Currently no movie data
                </h1>
            ) : error ? (
                <span className="error">
                    {error}
                </span>
            ) : (
                <RenderItemMovie data={currentItems} />
            )}

            {!loading && moviesData.length > 0 && (
                <Paginate
                    totalPages={totalPages}
                    currentPage={currentPage}
                    pageNumbers={pageNumbers}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    )
}