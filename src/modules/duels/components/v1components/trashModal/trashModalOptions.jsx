import { forwardRef } from "react";

function CardOptions(props, ref) {
  const { children } = props;

  return (
    <>
      <div className="trash-modal--options hideFull" ref={ref}>
        {children}
      </div>
    </>
  );
}

export default forwardRef(CardOptions);
