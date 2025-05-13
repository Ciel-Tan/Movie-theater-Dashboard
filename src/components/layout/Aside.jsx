'use client';

import Link from "next/link"
import { useEffect, useState } from "react"
import { BiCameraMovie, BiSolidCameraMovie } from "react-icons/bi"
import { IoHomeSharp } from "react-icons/io5";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import { GrSchedulePlay } from "react-icons/gr";
import RenderItemAside from "../render/RenderItemAside";
import { useRouter } from "next/navigation";
import { getCookieToken } from "@/utils/cookie";

export default function Aside({ isOpen }) {
    const token = getCookieToken();
    const router = useRouter()
    const [activeLink, setActiveLink] = useState('/')

    const handleLinkClick = (link) => {
        setActiveLink(link)
    }

    useEffect(() => {
        setActiveLink(router.pathname)
    }, [router.pathname])

    const asideOptions = {
        mainPages: [
            {linkEndpoint: '/', icon: <IoHomeSharp />, title: 'Dashboard'},
            {linkEndpoint: '/movies', icon: <BiSolidCameraMovie />, title: 'Movies'},
            {linkEndpoint: '/addMovie', icon: <MdOutlinePlaylistAdd />, title: 'Add'},
            {linkEndpoint: '/schedule', icon: <GrSchedulePlay />, title: 'Schedule'},
            {linkEndpoint: '/account', icon: <RiDraftFill />, title: 'Account'},
        ],
        accountPages: [
            {linkEndpoint: '/profile', icon: <FaUser />, title: 'Profile'},
            {linkEndpoint: '/auth', icon: <PiSignInBold />, title: token ? 'Sign Out' : 'Sign In'},
        ]
    }

    return (
        <div className={`aside ${isOpen ? '' : 'close'}`}>
            <div className="logo flex">
                <BiCameraMovie />
                <Link href="/"><h1>MOVIES</h1></Link>
            </div>

            <RenderItemAside
                data={asideOptions.mainPages}
                activeLink={activeLink}
                onClick={handleLinkClick}
            />

            <h3 className="mt-2">Account Pages</h3>
            
            <RenderItemAside
                data={asideOptions.accountPages}
                activeLink={activeLink}
                onClick={handleLinkClick}
            />
        </div>
    )
}