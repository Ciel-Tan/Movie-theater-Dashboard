const CheckboxColumn = (props) => {
    const { data, column, attribute, onChange } = props;

    const isChecked = (item) => data.some(d => d.genre_id === item.genre_id);

    return (
        <section>
            {column.map((item) => (
                <label className="flex gap-05" key={item.genre_id}>
                    <input type="checkbox"
                        value={item.genre_name}
                        checked={isChecked(item)}
                        onChange={(e) => onChange(e, attribute.id, item)}
                        style={{ width: "1rem" }}
                    />
                    {item.genre_name}
                </label>
            ))}
        </section>
    );
}
 
export default CheckboxColumn;