import React, { useContext } from "react";
import Store from "../provider/duelProvider";
import BasicCard from "./basicCard";

function HandArea({ childClassName = "" }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states.boardOne;
  const hand = [1, 2, 3, 4];

  return (
    <article className={"mano " + childClassName}>
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
