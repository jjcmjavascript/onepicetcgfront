import React, { forwardRef } from "react";

function DeckOptions({ children, id }, ref) {
  return (
    <>
      <div className="hand--options hide" id={id} ref={ref}>
        {children}
      </div>
    </>
  );
}

export default forwardRef(DeckOptions);
