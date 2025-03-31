const CheckboxColumn = (props) => {
    const { data, column, attribute, onChange } = props;
    return (
        <section>
            {column.map((item) => (
                <label className="flex gap-05" key={item}>
                    <input type="checkbox"
                        value={item}
                        checked={data.includes(item)}
                        onChange={(e) => onChange(e, attribute.id)}
                        style={{ width: "1rem" }}
                    />
                    {item}
                </label>
            ))}
        </section>
    );
}
 
export default CheckboxColumn;