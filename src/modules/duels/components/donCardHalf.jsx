import React from "react";

function DonCardHalf({ cardModel, onClick, id }) {
  return (
    <>
      <div className="field--card_half" onClick={onClick} id={id}>
        <img
          src="https://nakamadecks.com/imgs/cards/little/don.png"
          className="field--card__image"
        />
      </div>
    </>
  );
}

export default DonCardHalf;
