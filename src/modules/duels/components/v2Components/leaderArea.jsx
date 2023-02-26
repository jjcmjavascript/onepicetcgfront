import React, { useContext } from "react";
import Store from "../../provider/duelProvider";
import BasicCard from "./basicCard";

function CharacterArea({ className = "" }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states.boardOne;
  // const { characters } = boardOne;

  return (
    <article className={className}>
      <BasicCard />
      <BasicCard />
      <BasicCard />
    </article>
  );
}
export default CharacterArea;
