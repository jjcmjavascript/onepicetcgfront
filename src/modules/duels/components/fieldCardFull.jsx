import React from "react";

function FieldCardFull({ card }) {
  return (
    <>
      <div className="field--card_full">
        {card && <img src={card._image.route} className="field--card__image" />}
      </div>
    </>
  );
}

export default FieldCardFull;
