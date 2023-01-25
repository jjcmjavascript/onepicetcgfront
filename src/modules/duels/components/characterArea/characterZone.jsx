import React, { useContext } from "react";

import Store from "../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";

function CharactedZone({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states;
  const [boardOneState, setBoardOneState] = boardOne;
  const [, setPreview] = states.preview;

  const onMouseOver = (card) => {
    setPreview(card);
    console.log(card)
  };

  const onMouseOut = (card) => {
    setPreview(null);
  };

  return (
    <>
      <div className="field--card_area">
        {boardOneState.characters.map((card, index) => {
          return (
            <FieldCardFull
              id={`id_${card.uuid}`}
              key={card.uuid}
              card={card}
              onMouseOut={(_) => onMouseOut(card)}
              onMouseOver={(_) => onMouseOver(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default CharactedZone;
