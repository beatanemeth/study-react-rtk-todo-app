const InputField = ({ type, className, value, onChange, placeholder }) => {
    return (
        <input
            type={type}
            className={className}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}

export default InputField;
