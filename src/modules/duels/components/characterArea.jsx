import React from "react";

import "./css/characterArea.css";

function CharactedArea({ children }) {
  return (
    <>
      <div className="character--area">
        <div className="character--area__card text-light">
          <div className="op_card"></div>
        </div>
        <div className="character--area__card">

        <div className="op_card"></div>

        </div>
        <div className="character--area__card">
        <div className="op_card"></div>

        </div>
        <div className="character--area__card">
        <div className="op_card"></div>

        </div>
        <div className="character--area__card">
        <div className="op_card"></div>

        </div>
      </div>
    </>
  );
}

export default CharactedArea;
