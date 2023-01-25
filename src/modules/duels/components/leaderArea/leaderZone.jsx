import React, { useContext } from "react";
import Store from "../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";
import Deck from "./deck";
import Trash from "./trash";

function LeaderZone({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states;
  const [board, setBoardOneState] = boardOne;
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

        <Deck
          card={board.leader}
          onMouseOut={() => onMouseOut(board.leader)}
          onMouseOver={() => onMouseOver(board.leader)}
        />

        <div className="field--card_half"></div>

        <Trash
          count={board.trash.length}
          onMouseOut={() => onMouseOut(board.leader)}
          onMouseOver={() => onMouseOver(board.leader)}
        />
      </div>
    </>
  );
}

export default LeaderZone;
