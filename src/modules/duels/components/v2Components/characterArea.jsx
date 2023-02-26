import React, { useContext } from "react";
import Store from "../provider/duelProvider";
import BasicCard from "./basicCard";

function CharacterArea({ className = "" }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const [boardOneState] = states.boardOne;

  return (
    <article className={className}>
      {boardOneState.characters.map((card, index) => (
        <BasicCard key={card.uuid} cardObject={card} id={card.uuid} />
      ))}
    </article>
  );
}
export default CharacterArea;
