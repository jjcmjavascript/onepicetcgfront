import React from "react";

function FieldCardFull({ card, onMouseOver, onMouseOut, id, onClick }) {
  return (
    <>
      <div
        id={id}
        className="field--card_full"
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onClick}
      >
        {card && <img src={card._image.route} className="field--card__image rotated" />}
      </div>
    </>
  );
}

export default FieldCardFull;
