import React, { forwardRef } from "react";

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

const listContainer = forwardRef((props, ref) => {
  return (
    <div ref={ref} style={getComputedStyle(props.divStyle)} {...props}>
      {props.children}
    </div>
  );
});

export default listContainer;
