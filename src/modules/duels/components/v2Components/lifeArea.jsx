import React, { useContext } from "react";
import Store from "../provider/duelProvider";
import BasicCard from "./basicCard";

function LifeArea({ className = "" }) {
  const { states } = useContext(Store.DuelContext);
  const [boardOneState] = states.boardOne;

  return (
    <article className={className}>
      {boardOneState.lives.map((lifeCard) => (
        <BasicCard
          key={lifeCard.uuid}
          className={"vida"}
          cardObject={lifeCard}
          id={lifeCard.uuid}
        />
      ))}
    </article>
  );
}

export default LifeArea;
