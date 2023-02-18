import React, { useContext } from "react";
import Store from "../provider/duelProvider";
import BasicCard from "./basicCard";

function LifeArea({ className = "" }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states.boardOne;
  // const { lives } = boardOne;
  const lives = [1, 2, 3, 4, 5];

  return (
    <article className={className}>
      {lives.map((life, index) => (
        <BasicCard key={index} className={"vida"} />
      ))}
    </article>
  );
}

export default LifeArea;
