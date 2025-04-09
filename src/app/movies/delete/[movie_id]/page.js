'use client';

import Loader from "@/components/loading/Loader";
import HeaderTitle from "@/components/title/HeaderTitle"
import { useActionMovie } from "@/hooks/useActionMovie"
import { useGetMovie } from "@/hooks/useGetMovie"
import { useToastNotify } from "@/utils/toast";
import { useParams, useRouter } from "next/navigation"

export default function DeleteMovie() {
    const router = useRouter()
    const { movie_id } = useParams()

    const { moviesData } = useGetMovie(movie_id)
    const { removeMovie, loading, success, error } = useActionMovie()

    const goBack = () => {
        router.push('/')
    }

    const handleDelete = async () => {
        await removeMovie(movie_id)
    }

    useToastNotify(success, error, '/')

    return (
        <div className="blogPage">
            <HeaderTitle status="Delete" movieInfo={moviesData} />

            <div className="deleteSec flex flex-center wh_100">
                <div className="deleteCard">
                    <svg
                        viewBox="0 0 24 24"
                        fill="red"
                        height="6em"
                        width="6em"
                    >
                        <path d="M4 19V7h12v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2M6 9v10h8V9H6m7.5-5H17v2H3V4h3.5l1-1h5l1 1M19 17v-2h2v2h-2m0-4V7h2v6h-2z" />
                    </svg>
                    <p className="cookieHeading">Are you sure ?</p>
                    <p className="cookieDescription">
                        If you delete this movie content, it will be permanently delete your content
                    </p>
                    <div className="buttonContainer">
                        {loading ? <button className="loadingButton"><Loader /></button> : (
                            <>
                                <button onClick={handleDelete} className="acceptButton">
                                    Delete
                                </button>
                                <button onClick={goBack} className="declineButton">
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}