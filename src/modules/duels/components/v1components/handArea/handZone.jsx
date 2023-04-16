import React, { useContext, useState, useRef, memo } from "react";

import Store from "../../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";
import CardOptions from "./cardOptions";
import CardOptionItem from "./cardOptionItem";

/**
 * 1 - When Options is open, the "card" is active
 */
function HandZone({ children }) {
  const { states, actions } = useContext(Store.DuelContext);
  const [, setPreview] = states.preview;
  const [board] = states.boardOne;

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const onMouseOut = (card) => {
    setPreview(null);
  };

  return (
    <>
      <div className="field--card_area__hand">
        {board.hand.map((card) => {
          return (
            <FieldCardFull
              card={card}
              key={card.uuid}
              id={`id_${card.uuid}`}
              onClick={(_) => actions.mergeActiveCard(card, "hand")}
              onMouseOver={(_) => onMouseOver(card)}
              onMouseOut={(_) => onMouseOut(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default memo(HandZone);
