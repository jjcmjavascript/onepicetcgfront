import React, { useContext, memo } from "react";
import Store from "../../../provider/duelProvider";

import DonCardHalf from "./donCardHalf";

function DonZone() {
  const { actions, states } = useContext(Store.DuelContext);
  const [board] = states.boardOne;

  return (
    <>
      <div className="field--card_area">
        {board.costs.map((card) => {
          const id = `id_${card.uuid}`;

          return (
            <DonCardHalf
              card={card}
              key={id}
              onClick={() => actions.mergeActiveCard(card, "don")}
              id={id}
            />
          );
        })}
      </div>
    </>
  );
}

export default memo(DonZone);
