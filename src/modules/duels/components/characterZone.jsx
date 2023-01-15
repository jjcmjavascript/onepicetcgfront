import React, { useContext } from "react";

import Store from "../provider/duelProvider";

function CharactedZone({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states;

  return (
    <>
      <div className="field--card_area">
        <div className="field--card_half"></div>
        <div className="field--card_full"></div>
      </div>
    </>
  );
}

export default CharactedZone;
