import React from "react";

function FieldCardFull({ card, onMouseOver, onMouseOut, id, onClick , className}) {
  return (
    <>
      <div
        id={id}
        className={"field--card_full " + className}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onClick}
      >
        {card && <img src={card._image.route} className="field--card__image" />}
      </div>
    </>
  );
}

export default FieldCardFull;
