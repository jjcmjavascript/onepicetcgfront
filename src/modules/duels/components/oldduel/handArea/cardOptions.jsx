import React, {forwardRef} from "react";

function CardOptions(props, ref) {
  const { children } = props;

  return (
    <>
      <div className="hand--options hide" ref={ref}>
        {children}
      </div>
    </>
  );
}

export default forwardRef(CardOptions);
