import StatisticCard from "./StatisticCard";

const Statistic = (props) => {
    const { data } = props;
    return ( 
        <div className="fourCards flex flex-sb">
            {data.map((item, index) => (
                <StatisticCard key={index} {...item} />
            ))}
        </div>
    );
}
 
export default Statistic;