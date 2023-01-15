import React, { useContext } from "react";

import Store from "../provider/duelProvider";
import FieldCardFull from "./fieldCardFull";

function HandZone({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const [hand] = states.hand;

  return (
    <>
      <div className="field--card_area">
        {hand.map((card) => {
          return <FieldCardFull card={card} key={card.uuid} />;
        })}
      </div>
    </>
  );
}

export default HandZone;
