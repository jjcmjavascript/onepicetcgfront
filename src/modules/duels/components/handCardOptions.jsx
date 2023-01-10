import React, { useContext } from "react";
import Store from "../provider/duelProvider";

function HandCardOptions({ id, card }) {
  const { state, hooks } = useContext(Store.DuelContext);
  const { cardBasicEffects } = hooks;

  const revealHandler = (event) => {
    const grantParent = event.target.parentNode.parentNode;

    cardBasicEffects.reveal(grantParent);
  };

  const playHandler = (event) => {};

  return (
    <>
      <div className="hand--area__card__options hide" id={id}>
        <div
          className="hand--area__card__options__option"
          onClick={revealHandler}
        >
          Revelar
        </div>
        <div
          className="hand--area__card__options__option"
          onClick={playHandler}
        >
          Jugar
        </div>
        <div className="hand--area__card__options__option">Descartar</div>
      </div>
    </>
  );
}

export default HandCardOptions;
