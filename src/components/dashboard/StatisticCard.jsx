import { BsThreeDotsVertical } from "react-icons/bs";

const StatisticCard = (props) => {
    const { title, value, icon, img } = props;
    return ( 
        <div className="fCard">
            <div className="flex flex-sb">
                <div className="fCardSvg">
                    {icon}
                </div>
                <h3>{title}</h3>
                <BsThreeDotsVertical />
            </div>
            <div className="flex flex-sb wh-100">
                <img src={img} alt="chart" />
                <h4>{value}</h4>
            </div>
        </div>
    );
}
 
export default StatisticCard;