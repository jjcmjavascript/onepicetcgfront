import React, { useContext } from "react";
import Store from "../provider/duelProvider";
import FieldCardFull from "./fieldCardFull";

function LeaderZone({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states;
  const [board] = boardOne;
  const [, setPreview] = states.preview;

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const onMouseOut = (card) => {
    setPreview(null);
  };

  return (
    <>
      <div className="field--card_area">
        <FieldCardFull
          card={board.leader}
          onMouseOut={() => onMouseOut(board.leader)}
          onMouseOver={() => onMouseOver(board.leader)}
        />

        <div className="field--card_half"></div>

        <FieldCardFull
          card={board.leader}
          onMouseOut={() => onMouseOut(board.leader)}
          onMouseOver={() => onMouseOver(board.leader)}
        />

        <div className="field--card_half"></div>

        <FieldCardFull
          card={board.leader}
          onMouseOut={() => onMouseOut(board.leader)}
          onMouseOver={() => onMouseOver(board.leader)}
        />

      </div>
    </>
  );
}

export default LeaderZone;
