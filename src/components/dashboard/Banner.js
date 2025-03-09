import Link from "next/link";

const Banner = () => {
    return (
        <div className="topHeaderTitle flex flex-sb">
            <div>
              <h1 className="mb-1">Explore all type of movies here</h1>
              <p className="mb-2 w-66">
                You can explore all type of movies here. You can watch movies
                online or download movies.
              </p>
              <Link href="/">
                <button>
                  Exclusive On <span>CielTanMovies</span>
                </button>
              </Link>
            </div>
            <img src="/image/rocket.png" alt="rocket" />
        </div>
    );
}
 
export default Banner;