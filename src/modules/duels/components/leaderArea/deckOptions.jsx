import React from "react";

function DeckOptions({ children, id }) {
  return (
    <>
      <div className="hand--options hide" id={id}>
        {children}
      </div>
    </>
  );
}

export default DeckOptions;
