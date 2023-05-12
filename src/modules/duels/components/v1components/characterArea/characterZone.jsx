import { useContext, memo } from "react";
import Store from "../../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";

function CharactedZone() {
  const { states, actions } = useContext(Store.DuelContext);
  const { boardOne } = states;

  const [boardOneState] = boardOne;
  const [, setPreview] = states.preview;
  const [activeCards] = states.activeCards;

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const onMouseOut = () => {
    setPreview(null);
  };

  return (
    <>
      <div className="field--card_area">
        {boardOneState.characters.map((card) => {
          return (
            <FieldCardFull
              id={`id_${card.uuid}`}
              key={card.uuid}
              card={card}
              onMouseOut={() => onMouseOut(card)}
              onMouseOver={() => onMouseOver(card)}
              onClick={() => actions.mergeActiveCard(card, "character")}
              className={`${
                activeCards.character === card ? "innerShadow" : ""
              }`}
            />
          );
        })}
      </div>
    </>
  );
}

export default memo(CharactedZone);
