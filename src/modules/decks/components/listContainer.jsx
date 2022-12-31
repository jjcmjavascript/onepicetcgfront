import React, { useContext, forwardRef } from "react";
import store from "../providers/store";

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
  const { useFilters } = useContext(store.cardContext);
  return (
    <div ref={ref} style={getComputedStyle(props.divStyle)} {...props}>
      {props.children}
    </div>
  );
});

export default listContainer;
