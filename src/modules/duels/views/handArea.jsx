import React, { useContext } from "react";
import Store from "../provider/duelProvider";
import BasicCard from "./basicCard";

function HandArea({ className = "" }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states.boardOne;
  const hand = [1, 2, 3, 4];

  return (
    <article className={className}>
      {hand.map((card, index) => (
        <BasicCard
          key={index}
          className={"carta carta-mano"}
        />
      ))}
    </article>
  );
}

export default HandArea;
