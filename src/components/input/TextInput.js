const TextInput = (props) => {
    const { data, attribute, onChange } = props;

    const attributeTypeNumber = ['age_rating', 'run_time'];
    const inputTypeNumber = attributeTypeNumber.find((id) => id === attribute.id)

    return (
        attribute.id === 'description' ? (
            <textarea
                id={attribute.id}
                placeholder={attribute.placeholder}
                value={data}
                onChange={(e) => onChange(e, attribute.id)}
                style={{ textAlign: 'justify' }}
            />
        ) : (
            <input
                type={inputTypeNumber ? 'number' : 'text'}
                id={attribute.id}
                placeholder={attribute.placeholder}
                value={data}
                onChange={(e) => onChange(e, attribute.id)}
                {...(inputTypeNumber && { min: 0, step: 1 })}
            />
        )
    );
}

export default TextInput;