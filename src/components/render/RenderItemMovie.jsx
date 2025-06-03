import { customFormatDate } from "@/utils/format";
import Link from "next/link";
import { FcRating } from "react-icons/fc";
import { HighlightedText } from "../text/HighlightedText";
import { toTime } from "@/utils/toTime";
import { useState } from "react";
import Modal from "../modal/Modal";

const RenderItemMovie = (props) => {
    const { status, data, numberItems, searchQuery } = props
    const [selectedItem, setSelectedItem] = useState({
        video_id: "",
        content: "",
        poster_url: "",
        file_name: "",
        start_time: 0,
        end_time: 0,
        timePlay: 0
    });
    const [isOpenModal, setIsOpenModal] = useState(false);
    const itemsToRender = numberItems ? data.slice(0, numberItems) : data;

    const DisplayContent = ({ clampedText = true, item }) => {
        return (
            <div className="realFlex flex-col gap-05">
                <span>Content found:</span>
                <div className={`${clampedText ? "clamped-text" : ""}`}>
                    <HighlightedText text={item.content} searchQuery={searchQuery} />
                </div>
            </div>
        )
    }

    const DisplayTime = ({ item }) => {
        return (
            <div>
                <span>Time found: </span>
                <span
                    className="searchTime"
                    onClick={() => {
                        setSelectedItem({
                            ...item,
                            timePlay: item.start_time
                        });
                        setIsOpenModal(true);
                    }}
                >
                    {toTime(item.start_time)}{' '}
                </span>
                to
                <span
                    className="searchTime"
                    onClick={() => {
                        setSelectedItem({
                            ...item,
                            timePlay: item.end_time
                        });
                        setIsOpenModal(true);
                    }}
                >
                    {' '}
                    {toTime(item.end_time)}
                </span>
            </div>
        )
    }

    return (<>
        {itemsToRender.map((item, index) => (
            <div className="movieCard" key={index}>
                <img src={item.poster_image || item.poster_url || "/image/noImage.jpg"} alt="movie" />
                
                {status === "Latest" ? (
                    <div className="movieCardInfo">
                        <div>
                            <h3>{item.title}</h3>
                            <p>{item.director.director_name}</p>
                        </div>
                        <Link href="/">{customFormatDate(item.release_date, "dd/MM/yyyy")}</Link>
                        <div>
                            <FcRating /> {item.age_rating}
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/movies/update/${item.movie_id}`}><button>Update movie</button></Link>
                            <Link href={`/movies/delete/${item.movie_id}`}><button>Delete movie</button></Link>
                        </div>
                    </div>
                ) : (
                    <div className="movieCardInfo">
                        <h3>{item.file_name}</h3>
                        <DisplayContent item={item}/>
                        <DisplayTime item={item}/>
                    </div>
                )}

            </div>
        ))}

        <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} title={"Trailer Player"}>
            <div className="w-100">
                <iframe
                    src={`https://www.youtube.com/embed/${selectedItem.video_id}?autoplay=1&start=${selectedItem.timePlay}`}
                    loading="lazy"
                    width="100%"
                    height="250px"
                    allowFullScreen
                    style={{ borderRadius: "10px" }}
                />

                <h3>{selectedItem.file_name}</h3>
            </div>
            <DisplayContent clampedText={false} item={selectedItem} />
            <DisplayTime item={selectedItem} />
        </Modal>
    </>);
}
 
export default RenderItemMovie;