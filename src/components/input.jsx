const input = ({ placeholder, value,  ariaLabel, onChange, className, type = "text" }) => {
  return (
    <input
      value={value}
      className={ className || "form-control"}
      type={type}
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={onChange}
    />
  );
};

export default input;
