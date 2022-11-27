import React from "react";

const container = ({ children, className = "container-fluid" }) => {
  return (
    <div className={className}>
      <div className="row"> {children} </div>
    </div>
  );
};

export default container;
