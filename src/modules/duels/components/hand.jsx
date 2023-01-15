import React, { useContext } from "react";

import Store from "../provider/duelProvider";

import HandCardOptions from "./handCardOptions";

import HandCard from "./handCard";

function Hand({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const [hand] = states.hand;

  const syle = {
    width: "100px",
  };
  return (
    <>
      <div className="hand--area">
        <HandCardOptions />

        {hand.map((card, index) => (
          <HandCard
            key={card.code + card.id * index}
            card={card}
            index={index}
          />
        ))}
      </div>
    </>
  );
}

export default Hand;
