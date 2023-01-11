import React, { useContext } from "react";
import Store from "../provider/duelProvider";

function HandCardOptions({ id }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { cardBasicEffects } = hooks;
  const [hand, setHand] = states.hand;

  const revealHandler = (event) => {
    const grantParent = event.target;

    cardBasicEffects.reveal(grantParent);
  };

  const discard = () => {
    const newHand = hand.filter(
      (card) => card.uuid !== cardBasicEffects.activeCard.uuid
    );
    setHand(newHand);

    cardBasicEffects.hideOptions();
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
        <div className="hand--area__card__options__option" onClick={discard}>
          Descartar
        </div>
      </div>
    </>
  );
}

export default HandCardOptions;
