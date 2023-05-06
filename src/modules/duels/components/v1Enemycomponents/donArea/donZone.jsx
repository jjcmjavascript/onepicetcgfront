import React, { useContext } from "react";
import Store from "../../../provider/duelProvider";

import DonCard from "./donCard";
import DonCardHalf from "./donCardHalf";

function DonZone({ children }) {
  const { states } = useContext(Store.DuelContext);
  const [board] = states.boardTwo;

  return (
    <>
      <div className="field--card_area">
        <DonCard card={board.don} quantity={board.dons.length} />

        <div className="field--card_half rotated"></div>

        {board.costs.map((card) => {
          const id = `id_${card.uuid}`;

          return (
            <DonCardHalf card={card} key={id} onClick={() => {}} id={id} />
          );
        })}
      </div>
    </>
  );
}

export default DonZone;
