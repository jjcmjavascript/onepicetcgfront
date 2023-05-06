import React from "react";

function CardOptionItem({ children, onClick }) {
  return (
    <>
      <div className="don--options__item" onClick={onClick}>
        {children}
      </div>
    </>
  );
}

export default CardOptionItem;
