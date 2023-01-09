import React from "react";

function HandCardOptions({ children }) {
  return (
    <>
      <div className="hand--area__card__options">
        <div className="hand--area__card__options__option">
          Revelar
        </div>
        <div className="hand--area__card__options__option">
          Jugar
        </div>
        <div className="hand--area__card__options__option">
          Descartar
        </div>
      </div>
    </>
  );
}

export default HandCardOptions;
