import React, { useContext } from "react";
import Store from "../provider/duelProvider";
import BasicCard from "./basicCard";

function HandArea({ className = "" }) {
  const { states } = useContext(Store.DuelContext);
  const { boardOne } = states;

  const [boardOneState, _] = boardOne;

  return (
    <article className={className}>
      {boardOneState.hand.map((card, index) => (
        <BasicCard
          className={"carta carta-mano"}
          cardObject={card}
          key={card.uuid}
          flipped={true}
          id={card.uuid}
        />
      ))}
    </article>
  );
}

export default HandArea;
