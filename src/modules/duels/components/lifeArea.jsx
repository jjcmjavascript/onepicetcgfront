import React from "react";

function LifeArea({ children }) {
  const lifes = Array(10)
    .fill(0)
    .map((_, index) => index);

  return (
    <>
      <div className="life--area">
        <div className="life--area__card"></div>
      </div>
    </>
  );
}

export default LifeArea;
