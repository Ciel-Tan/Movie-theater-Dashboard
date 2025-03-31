import CheckboxColumn from "./CheckboxColumn";

const CheckBoxInput = (props) => {
    const { data, renderItem, attribute, onChange } = props;

    const colSize = Math.ceil(renderItem.length / 3);
    const firstColumn = renderItem.slice(0, colSize);
    const secondColumn = renderItem.slice(colSize, colSize * 2);
    const thirdColumn = renderItem.slice(colSize * 2);

    const renderColumn = [firstColumn, secondColumn, thirdColumn];
    
    return ( 
        <div style={{ display: "flex", gap: "3rem" }}>
            {renderColumn.map((column, index) => (
                <CheckboxColumn
                    key={index}
                    data={data}
                    column={column}
                    attribute={attribute}
                    onChange={onChange}
                />
            ))}
        </div>
    );
}
 
export default CheckBoxInput;