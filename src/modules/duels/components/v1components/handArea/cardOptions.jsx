import React, { forwardRef } from "react";

function CardOptions({ children }, ref) {
  return (
    <>
      <div ref={ref} className="don--options hide">{children}</div>
    </>
  );
}

export default forwardRef(CardOptions);
