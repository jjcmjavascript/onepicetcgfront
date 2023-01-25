import React from "react";

function DonOptionItem({ children, onClick }) {
  return (
    <>
      <div className="don--options__item" onClick={onClick}>
        {children}
      </div>
    </>
  );
}

export default DonOptionItem;
