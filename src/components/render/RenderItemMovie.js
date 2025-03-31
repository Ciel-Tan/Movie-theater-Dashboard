import Link from "next/link";
import { FcRating } from "react-icons/fc";

const RenderItemMovie = (props) => {
    const {data, numberItems} = props

    const itemsToRender = numberItems ? data.slice(0, numberItems) : data;

    return (
        itemsToRender.map((item, index) => (
            <div className="movieCard" key={index}>
                <img src={item.poster_image || "/image/noImage.jpg"} alt="movie" />
                <div className="movieCardInfo">
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.director.director_name}</p>
                    </div>
                    <Link href="/">{item.release_date}</Link>
                    <div>
                        <FcRating /> {item.age_rating}
                    </div>
                    <div className="flex gap-2 mt-2">
                        <Link href={`/movies/update/${item.movie_id}`}><button>Update movie</button></Link>
                        <Link href={`/movies/delete/${item.movie_id}`}><button>Delete movie</button></Link>
                    </div>
                </div>
            </div>
        ))
    );
}
 
export default RenderItemMovie;