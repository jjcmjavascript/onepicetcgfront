import React from "react";

const input = ({ placeholder, value,  ariaLabel, onChange, type = "text" }) => {
  return (
    <input
      value={value}
      className="form-control"
      type={type}
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={onChange}
    />
  );
};

export default input;
