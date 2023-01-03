import React, { useContext, forwardRef } from "react";
import store from "../provider/deckProvider";

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
  const { useFilters } = useContext(store.CardContext);
  return (
    <div ref={ref} style={getComputedStyle(props.divStyle)} {...props}>
      {props.children}
    </div>
  );
});

export default listContainer;
