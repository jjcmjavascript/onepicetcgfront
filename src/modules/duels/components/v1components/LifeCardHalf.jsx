import React from "react";

function LifeCardHalf({ card, onClick, id }) {
  const image = "https://cf.geekdo-images.com/lBPmfYGjJ-UQ5DZ_wKuBGA__imagepage/img/GNe5INGZDgiakJibSM0zNWLMxSQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1737624.jpg"

  return (
    <>
      <div className="field--card_half_live rotate270" onClick={onClick} id={id}>
        <img src={image} className="field--card__image" />
      </div>
    </>
  );
}

export default LifeCardHalf;
