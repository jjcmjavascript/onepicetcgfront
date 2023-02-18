import React, { useContext } from "react";
import Store from "../provider/duelProvider";
import BasicCard from "./basicCard";

function CharacterArea({childClassName=""}) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states.boardOne;
  // const { characters } = boardOne;
  const characters = [1, 2, 3, 4, 5];

  return (
    <article className={"tablero-arriba " + childClassName}>
      {characters.map((life, index) => (
        <BasicCard key={index} />
      ))}
    </article>
  );
}
export default CharacterArea;
