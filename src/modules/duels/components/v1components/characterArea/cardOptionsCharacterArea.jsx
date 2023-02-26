import React, {forwardRef} from "react";

function CardOptionCharacterAreaItem(props, ref) {
  const { children } = props;

  return (
    <>
      <div className="hand--options hideFull" ref={ref}>
        {children}
      </div>
    </>
  );
}

export default forwardRef(CardOptionCharacterAreaItem);
