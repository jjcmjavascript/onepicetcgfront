import React from "react";

const defaultDivStyle = {
  minHeight: "80vh",
  maxHeight: "80vh",
  overflowY: "scroll",
};

const getComputedStyle = (divStyle = {}) => {
  return {
    ...defaultDivStyle,
    ...divStyle,
  };
};

const listContainer = ({ children, className, divStyle }) => {
  return (
    <div className={className} style={getComputedStyle(divStyle)}>
      {children}
    </div>
  );
};

export default listContainer;
