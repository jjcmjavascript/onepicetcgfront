import React, { useContext } from "react";
import Store from "../../provider/duelProvider";
import BasicCard from "./basicCard";

function DonArea({ className = "" }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const [boardOne] = states.boardOne;

  return (
    <article className={className}>
      <BasicCard className="carta carta-derecha" text/>

      {boardOne.costs.map((don, index) => (
        <BasicCard key={index} className="mini-carta" />
      ))}

      <BasicCard className="carta carta-izquierda" />
    </article>
  );
}
export default DonArea;
