import { useContext, memo } from "react";
import Store from "../../../provider/duelProvider";

import DonCard from "./donCard";
import DonCardHalf from "./donCardHalf";

function DonZone() {
  const { actions, states } = useContext(Store.DuelContext);
  const [board] = states.boardOne;

  return (
    <>
      <div className="field--card_area">
        <DonCard card={board.don} quantity={board.dons.length} />

        <div className="field--card_half"></div>

        {board.costs.map((card) => {
          return (
            <DonCardHalf
              card={card}
              key={card.uuid}
              onClick={() => actions.mergeActiveCard(card, "don")}
              id={card.uuid}
            />
          );
        })}
      </div>
    </>
  );
}

export default memo(DonZone);
