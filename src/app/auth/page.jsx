'use client'

import { getCookieToken, removeCookieToken } from "@/utils/cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Auth() {
    const router = useRouter();
    const token = getCookieToken();

    const handleRedirect = () => {
        router.push('/login');
    }

    const handleLogin = () => {
        handleRedirect();
    }

    const handleLogout = () => {
        removeCookieToken();
        handleRedirect();
    }

    return (
        <div className="loginFront flex flex-center">
            <div className="loginBox flex flex-col">
                <Image src="/image/ZeroTwo.jpg" alt="profile" width={250} height={250} />
                <h1>Welcome Admin of CielTanMovies</h1>
                <p className="mt-1">
                    Visit our main website
                    <a href="https://cieltanmovies.com"> CielTanMovies</a>
                </p>
                <button 
                    className="mt-2"
                    onClick={token ? handleLogout : handleLogin}
                >
                    {token ? "Log out here" : "Log in"}
                </button>
            </div>
        </div>
    )
}