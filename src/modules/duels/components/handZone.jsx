import React, { useContext } from "react";

import Store from "../provider/duelProvider";
import FieldCardFull from "./fieldCardFull";

function HandZone({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const [hand] = states.hand;
  const [preview, setPreview] = states.preview;

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const onMouseOut = (card) => {
    setPreview(null);
  };

  return (
    <>
      <div className="field--card_area">
        {hand.map((card) => {
          return (
            <FieldCardFull
              card={card}
              key={card.uuid}
              onMouseOver={() => onMouseOver(card)}
              onMouseOut={() => onMouseOut(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default HandZone;
