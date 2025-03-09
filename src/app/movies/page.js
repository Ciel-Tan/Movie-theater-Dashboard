'use client'

import Spinner from "@/components/layout/Spinner";
import Paginate from "@/components/pagination/Paginate";
import { PrePaginate } from "@/components/pagination/PrePaginate";
import RenderItemMovie from "@/components/render/RenderItemMovie";
import ListMoviesTitle from "@/components/title/ListMoviesTitle";
import useGetAllData from "@/hooks/useGetAllData";
import { useState } from "react";


export default function Movies() {
    const {allData, loading} = useGetAllData('http://localhost:3000/api/movies/getAll')

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 1

    const { currentItems, totalPages, pageNumbers } = PrePaginate(allData, currentPage, itemsPerPage);
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="container">
            <div className="movieCards flex flex-col flex-left gap-2 w-100">
                <ListMoviesTitle status="Latest" />

                {loading ? <Spinner /> : allData.length === 0 ? (
                    <h1 className="flex w-100 flex-center text-center">
                        Currently no movie data
                    </h1>
                ) : (
                    <RenderItemMovie data={currentItems} />
                )}

                {!loading && (
                    <Paginate
                        totalPages={totalPages}
                        currentPage={currentPage}
                        pageNumbers={pageNumbers}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    )
}