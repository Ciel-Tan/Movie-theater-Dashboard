'use client'

import { useRef, useState } from "react"
import { VscThreeBars } from "react-icons/vsc"
import { PiWindowsLogoBold } from "react-icons/pi";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { IoLanguage, IoNotificationsSharp, IoMic } from "react-icons/io5";
import { useGetMovie } from "@/hooks/useGetMovie";
import { useRouter } from "next/navigation";

export default function Header({ onClick }) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const [searchType, setSearchType] = useState('Title')
    const [isRecording, setIsRecording] = useState(false)
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);

    const { moviesData } = useGetMovie()

    const filteredMovies = searchQuery.trim() === ''
        ? moviesData
        : moviesData.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))

    const handleDirect = async () => {
        if (!searchQuery.trim())
            return;
        
        router.push(`/searchResult/${searchQuery}`)
    }

    const handleRecord = async () => {
        if (!isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                streamRef.current = stream;
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                const audioChunks = [];

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    if (!audioChunks.length > 0) {
                        console.error('No audio data available');
                        return;
                    }

                    const audioBlob = new Blob(audioChunks, { type: audioChunks[0].type });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    audio.play().catch((error) => {
                        console.error('Error playing audio:', error);
                    });

                    stream.getTracks().forEach((track) => track.stop());
                    
                };

                mediaRecorder.start();
                setIsRecording(true);
            }
            catch (error) {
                console.error('Error starting recording:', error);
            }
        }
        else {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
            }
            setIsRecording(false);
        }
    };

    return (
        <header className="header">
            <div className="flex flex-sb">
                <div
                    className="headerBar"
                    onClick={onClick}
                >
                    <VscThreeBars />
                </div>

                <div className="searchHeaderInput flex flex-sb gap-15">
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

                    <div className={`${isRecording ? 'recording' : 'microIcon'} ${searchType === 'Title' ? 'hide' : ''}`}>
                        <IoMic
                            size={20}
                            onClick={handleRecord}
                        />
                    </div>

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
