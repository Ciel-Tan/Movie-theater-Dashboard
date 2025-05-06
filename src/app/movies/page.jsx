'use client'

import ListMovie from "@/components/movie/ListMovie";
import { useGetMovie } from "@/hooks/useGetMovie";

export default function Movies() {
    const { moviesData, loading, error } = useGetMovie()

    return (
        <ListMovie
            status="Latest"
            data={moviesData}
            loading={loading}
            error={error}
        />
    )
}