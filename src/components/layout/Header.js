'use client'

import { useState } from "react"
import { VscThreeBars } from "react-icons/vsc"
import { PiWindowsLogoBold } from "react-icons/pi";
import Link from "next/link";
import { IoLanguage, IoNotificationsSharp } from "react-icons/io5";
import { MdOutlineStickyNote2 } from "react-icons/md";
// import { useSession } from "next-auth/react";

export default function Header() {
    // const {data: session} = useSession();
    const session = true
    const [searchQuery, setSearchQuery] = useState('')
    const [openSearch, setOpenSearch] = useState(false)

    const publishedMovies = [
        {_id: 1, smPoster: "abc", title: "abc"},
        {_id: 2, smPoster: "abc", title: "abc"},
    ]

    const handleOpen = () => {
        setOpenSearch(!openSearch)
    }

    const handleClose = () => {
        setSearchQuery('')
        setOpenSearch(false)
    }

    const filteredMovies = searchQuery.trim() === ''
        ? publishedMovies
        : publishedMovies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))

    if (session) return (
        <header className="header">
            <div className="flex flex-sb">
                <div className="headerBar">
                    <VscThreeBars />
                </div>

                <div className="searchHeaderInput">
                    <input
                        type="text"
                        placeholder="Search movies here"
                        value={searchQuery}
                        onClick={handleOpen}
                        readOnly
                    />
                </div>

                <ul className="flex gap-2">
                    <Link href='/'><li><PiWindowsLogoBold /></li></Link>
                    <Link href='/'><li><IoLanguage /></li></Link>
                    <Link href='/'><li><IoNotificationsSharp /></li></Link>
                    <Link href='/'><li><MdOutlineStickyNote2 /></li></Link>
                    <Link href='/'><li><img src="/img/ZeroTwo.jpg" alt="user" /></li></Link>
                </ul>
            </div>

            {openSearch && (
                <div className="fixedSearch">
                    <input
                        type="text"
                        placeholder="Search movies here"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {searchQuery && (
                        <div className="searchResultOfInput">
                            {filteredMovies.length > 0 ? (
                                filteredMovies.slice(0, 10).map((movie) => (
                                    <div className="siResult" key={movie._id}>
                                        <img src={movie.smPoster} alt="movie" />
                                        <div className="siMovieInfo">
                                            <h3>{movie.title}</h3>
                                            <div className="udBtns">
                                                <Link href={`/movies/edit/${movie._id}`}>Update</Link>
                                                <Link href={`/movies/delete/${movie._id}`}>Delete</Link>
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
                    <button className="closeSearch" onClick={handleClose}>x</button>
                </div>
            )}
        </header>
    )
}
