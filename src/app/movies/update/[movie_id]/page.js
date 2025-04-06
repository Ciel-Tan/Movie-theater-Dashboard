'use client';

import Movie from "@/components/layout/Movie"
import HeaderTitle from "@/components/title/HeaderTitle"
import { useGetMovie } from "@/hooks/useGetMovie"
import { useParams } from "next/navigation"

export default function UpdateMovie() {
    const { movie_id } = useParams()

    const { moviesData } = useGetMovie(movie_id)

    return (
        <div className="blogPage">
            <HeaderTitle status="Edit" movieInfo={moviesData} />

            <div className="mt-3">
                {moviesData && <Movie key={moviesData.movie_id} movie={moviesData} />}
            </div>
        </div>
    )
}