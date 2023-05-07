import { useContext, memo } from "react";
import Store from "../../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";

/**
 * 1 - When Options is open, the "card" is active
 */
function HandZone() {
  const { states, actions } = useContext(Store.DuelContext);
  const [, setPreview] = states.preview;
  const [board] = states.boardOne;
  const [activeCards] = states.activeCards;

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const onMouseOut = () => {
    setPreview(null);
  };

  return (
    <>
      <div className="field--card_area__hand">
        {board.hand.map((card) => {
          return (
            <FieldCardFull
              card={card}
              key={card.uuid}
              id={`id_${card.uuid}`}
              onClick={() => actions.mergeActiveCard(card, "hand")}
              onMouseOver={() => onMouseOver(card)}
              onMouseOut={() => onMouseOut(card)}
              className={`${activeCards.hand === card ? "innerShadow" : ""}`}
            />
          );
        })}
      </div>
    </>
  );
}

export default memo(HandZone);
