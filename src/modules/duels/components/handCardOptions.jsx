import React, { useContext } from "react";
import Store from "../provider/duelProvider";

function HandCardOptions({ id }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { cardBasicEffects } = hooks;
  const [hand, setHand] = states.hand;
  const [board, setBoard] = states.player1Board;

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

  const playHandler = () => {
    const active = cardBasicEffects.activeCard;
    const activeHtml = cardBasicEffects.activeCardHtml;

    const newHand = hand.filter(
      (card) => card.uuid !== cardBasicEffects.activeCard.uuid
    );

    setHand(newHand);

    let characters = {};

    const length = Object.values(board.characters).length;
    const existEmptyPosition = length < 5;

    characters[length] = {
      card: active,
      htmlCard: activeHtml,
    };

    setBoard({
      ...board,
      characters,
    });
  };

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
