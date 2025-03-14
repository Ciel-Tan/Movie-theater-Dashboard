'use client'

// import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Auth() {
    const router = useRouter();
    // const {data: session} = useSession();

    return (
        <div className="container">
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
                        onClick={() => router.push('/login')}
                        // onClick={session ? signOut : () => signIn('google')}
                    >
                        {/* {session ? "Log out here" : "Log in with Google"} */}
                        Log in
                    </button>
                </div>
            </div>
        </div>
    )
}