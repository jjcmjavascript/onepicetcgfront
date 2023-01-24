import React from "react";

function CardOptions({ children }) {
  return (
    <>
      <div className="hand--options hide">
        {children}
      </div>
    </>
  );
}

export default CardOptions;
