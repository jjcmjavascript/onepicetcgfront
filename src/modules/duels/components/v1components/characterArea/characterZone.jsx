import React, { useContext, useState, useRef, memo, useEffect } from "react";

import Store from "../../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";

function CharactedZone() {
  const { states, actions } = useContext(Store.DuelContext);
  const { boardOne } = states;

  const [boardOneState] = boardOne;
  const [, setPreview] = states.preview;

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const onMouseOut = () => {
    setPreview(null);
  };

  return (
    <>
      <div className="field--card_area">
        {boardOneState.characters.map((card) => {
          return (
            <FieldCardFull
              id={`id_${card.uuid}`}
              key={card.uuid}
              card={card}
              onMouseOut={(_) => onMouseOut(card)}
              onMouseOver={(_) => onMouseOver(card)}
              onClick={() => actions.mergeActiveCard(card, "character")}
            />
          );
        })}
      </div>
    </>
  );
}

export default memo(CharactedZone);
