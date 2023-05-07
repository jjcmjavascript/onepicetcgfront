import { useContext } from "react";

import Store from "../../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";

function HandZone() {
  const { states } = useContext(Store.DuelContext);
  const [boardTwoState] = states.boardTwo;

  return (
    <>
      <div className="field--card_area__hand">
        {boardTwoState.hand.map((card) => {
          return (
            <FieldCardFull
              card={card}
              key={card.uuid}
              id={`id_${card.uuid}`}
              className="rotated"
            />
          );
        })}
      </div>
    </>
  );
}

export default HandZone;
