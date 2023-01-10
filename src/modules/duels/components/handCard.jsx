import React, { useContext } from "react";

import Store from "../provider/duelProvider";

function HandCard({ card }) {
  const id = card.code + card.id * Math.random().toString().substring(2, 3);
  const { state, hooks } = useContext(Store.DuelContext);
  const { cardBasicEffects } = hooks;

  const cardshowOptions = () => {
    cardBasicEffects.setShowingOptions();
  };

  return (
    <>
      <div className="hand--area__card" onClick={cardshowOptions} id={id}>
        <img src={card._image.route} className="card--in__hand" />
      </div>
    </>
  );
}

export default HandCard;
