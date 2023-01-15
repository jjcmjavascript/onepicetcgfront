import React from "react";

function LeaderArea({ children }) {
  return (
    <>
      <div className="leader--area">
        <div className="leader--area__title">Duel Zone</div>
        <div className="leader--area__card">
          <div className="op_card"></div>
        </div>
        <div className="leader--area__card"></div>
        <div className="leader--area__card"></div>
      </div>
    </>
  );
}

export default LeaderArea;
