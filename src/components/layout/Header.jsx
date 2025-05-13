'use client'

import { useRef, useState, useEffect } from "react"
import { VscThreeBars } from "react-icons/vsc"
import { PiWindowsLogoBold } from "react-icons/pi";
import Link from "next/link";
import { IoLanguage, IoNotificationsSharp, IoMic } from "react-icons/io5";
import { useGetMovie } from "@/hooks/useGetMovie";
import { useRouter } from "next/navigation";

export default function Header({ onClick }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchType, setSearchType] = useState('Title')
    const [isRecording, setIsRecording] = useState(false)
    const [voiceSearchLang, setVoiceSearchLang] = useState('vi-VN')
    const recognitionRef = useRef(null);

    const supportedLanguages = [
        { code: 'en-US', name: 'English' },
        { code: 'vi-VN', name: 'Vietnamese' },
    ];

    const { moviesData } = useGetMovie()

    const filteredMovies = searchQuery.trim() === ''
        ? moviesData
        : moviesData.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))

    const router = useRouter()
    const handleDirect = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim())
            return;

        router.push(`/searchResult/${searchQuery}`)
    }

    const handleRecord = () => {
        if (!isRecording) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                console.error('Speech recognition not supported');
                return;
            }
            const recognition = new SpeechRecognition();
            recognitionRef.current = recognition;
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = voiceSearchLang;

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setSearchQuery(transcript);
                setIsRecording(false);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setIsRecording(false);
            };

            recognition.onend = () => {
                setIsRecording(false);
            };

            recognition.start();
            setIsRecording(true);
        }
        else {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            setIsRecording(false);
        }
    };

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

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
                    <form action={`/searchResult/${searchQuery}`} onSubmit={handleDirect}>
                        <input
                            type="text"
                            placeholder="Search movies here"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>

                    <div className={`searchMic ${isRecording ? 'recording' : 'microIcon'} ${searchType === 'Title' ? 'hide' : ''}`}>
                        <IoMic
                            size={20}
                            onClick={handleRecord}
                        />
                    </div>

                    <select
                        value={voiceSearchLang}
                        onChange={(e) => setVoiceSearchLang(e.target.value)}
                        className={`searchSelect ${searchType === 'Title' ? 'hide' : ''}`}
                    >
                        {supportedLanguages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select> 

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