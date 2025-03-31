const RadioInput = (props) => {
    const {data, renderItem, attribute, onChange} = props;
    return ( 
        renderItem.map((item) => (
            <div key={item} className="flex gap-05">
                <input
                    id={item}
                    type="radio"
                    name={attribute.id}
                    value={item}
                    checked={data.includes(item)}
                    onChange={(e) => onChange(e, attribute.id)}
                />
                <label htmlFor={item}>{item}</label>
            </div>
        ))
    );
}
 
export default RadioInput;