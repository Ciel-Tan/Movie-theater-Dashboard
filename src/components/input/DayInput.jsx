import { formatDay } from "@/utils/format";
import { useEffect, useState } from "react";

const DayInput = (props) => {
    const { data, attribute, onChange } = props;

    const [formattedDate, setFormattedDate] = useState('');
    useEffect(() => {
        if (attribute.id === 'release_date') {
            const formattedDate = formatDay({ date: data });
            setFormattedDate(formattedDate);
        }
    }, [data]);

    return (
        <input
            type="date"
            id={attribute.id}
            value={formattedDate || ""}
            onChange={(e) => onChange(e, attribute.id)}
        />
    );
}
 
export default DayInput;