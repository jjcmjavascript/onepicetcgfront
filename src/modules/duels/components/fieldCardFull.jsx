import React from "react";

function FieldCardFull({ card, onMouseOver, onMouseOut }) {
  return (
    <>
      <div
        className="field--card_full"
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {card && <img src={card._image.route} className="field--card__image" />}
      </div>
    </>
  );
}

export default FieldCardFull;
