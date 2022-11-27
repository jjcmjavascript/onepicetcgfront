import React from "react";

const getClassName = (className) => {
  const defaultClass = "btn btn-outline-default";

  return `btn btn-outline-${className}` || defaultClass;
};

const btn = ({ children, className, onClick }) => {
  return (
    <button className={getClassName(className)} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default btn;
