import React, { useContext } from "react";
import Store from "../provider/duelProvider";
import BasicCard from "./basicCard";

function DonArea({ className = "" }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states.boardOne;
  const dons = [1, 2, 3, 4];

  return (
    <article className={className}>
      <BasicCard className="carta carta-derecha" />

      {dons.map((don, index) => (
        <BasicCard key={index} className="mini-carta" />
      ))}

      <BasicCard className="carta carta-izquierda" />
    </article>
  );
}
export default DonArea;
