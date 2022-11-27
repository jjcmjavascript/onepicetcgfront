import React from "react";

const input = ({ placeholder, ariaLabel, type = "text" }) => {
  return (
    <input
      className="form-control"
      type={type}
      placeholder={placeholder}
      aria-label={ariaLabel}
    />
  );
};

export default input;
