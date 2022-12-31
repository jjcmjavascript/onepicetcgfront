import React from "react";

const getClassName = (className) => {
  const defaultClass = "btn btn-success";

  return `btn btn-${className}` || defaultClass;
};

const btn = ({ children, className, onClick, disabled }) => {
  return (
    <button className={getClassName(className)} type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default btn;
