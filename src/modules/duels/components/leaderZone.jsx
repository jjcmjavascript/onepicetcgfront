import React, { useContext } from "react";
import Store from "../provider/duelProvider";
import FieldCardFull from "./fieldCardFull";

function LeaderZone({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states;
  const [board, _] = boardOne;

  return (
    <>
      <div className="field--card_area">
        <FieldCardFull card={board.leader} />
        <div className="field--card_half"></div>
      </div>
    </>
  );
}

export default LeaderZone;
