import React from "react";

const btn = ({ children, className, onClick, disabled, title }) => {
  const defaultClass = "btn btn-outline-success";
  const newClassName = `btn btn-outline-${className}`;

  return (
    <button className={newClassName || defaultClass } type="button" onClick={onClick} title={title} disabled={disabled}>
      {children}
    </button>
  );
};

export default btn;
