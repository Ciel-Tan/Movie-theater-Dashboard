'use client'

import { useState } from "react"
import { VscThreeBars } from "react-icons/vsc"
import { PiWindowsLogoBold } from "react-icons/pi";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { IoLanguage, IoNotificationsSharp } from "react-icons/io5";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { useGetMovie } from "@/hooks/useGetMovie";
import { useRouter } from "next/navigation";

export default function Header({ onClick }) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const [searchType, setSearchType] = useState('Title')

    const { moviesData } = useGetMovie()

    const filteredMovies = searchQuery.trim() === ''
        ? moviesData
        : moviesData.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))

    const handleDirect = async () => {
        if (!searchQuery.trim())
            return;
        
        router.push(`/searchResult/${searchQuery}`)
    }

    return (
        <header className="header">
            <div className="flex flex-sb">
                <div
                    className="headerBar"
                    onClick={onClick}
                >
                    <VscThreeBars />
                </div>

                <div className="searchHeaderInput flex flex-sb gap-2">
                    <input
                        type="text"
                        placeholder="Search movies here"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <IoSearch
                        size={20}
                        className={`searchIcon ${searchType === 'Title' ? 'hide' : ''}`}
                        onClick={handleDirect}
                    />

                    <select
                        className="searchSelect"
                        defaultValue={"Title"}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value="Title">Title</option>
                        <option value="Content">Content</option>
                    </select>
                </div>

                <ul className="flex gap-2">
                    <Link href='/'><li><PiWindowsLogoBold /></li></Link>
                    <Link href='/'><li><IoLanguage /></li></Link>
                    <Link href='/'><li><IoNotificationsSharp /></li></Link>
                    {/* <Link href='/'><li><MdOutlineStickyNote2 /></li></Link> */}
                    <Link href='/'><li><img src="/image/ZeroTwo.jpg" alt="user" /></li></Link>
                </ul>
            </div>

            {searchQuery && searchType === 'Title' && (
                <div className="searchResultOfInput">
                    {filteredMovies.length > 0 ? (
                        filteredMovies.slice(0, 10).map((movie) => (
                            <div className="siResult" key={movie.movie_id}>
                                <img src={movie.poster_image} alt="movie" />
                                <div className="siMovieInfo">
                                    <h3>{movie.title}</h3>
                                    <div className="udBtns">
                                        <Link href={`/movies/edit/${movie.movie_id}`}>Update</Link>
                                        <Link href={`/movies/delete/${movie.movie_id}`}>Delete</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-100 flex flex-center">
                            No Movie Found
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}
