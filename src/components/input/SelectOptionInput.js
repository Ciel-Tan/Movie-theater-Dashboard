const SelectOptionInput = (props) => {
    const { data, selectedData, attribute, onChange } = props;
    return ( 
        <select
            id={attribute.id}
            name={attribute.id}
            value={selectedData || ""}
            onChange={(e) => onChange(e, attribute.id)}
        >
            {data.map((item) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
}
 
export default SelectOptionInput;