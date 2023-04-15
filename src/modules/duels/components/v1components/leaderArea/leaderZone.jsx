import React, { useContext, useRef, memo } from "react";
import Store from "../../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";
import Deck from "./deck";
import Trash from "./trash";

import DeckOptions from "./deckOptions";
import DeckOptionItem from "./deckOptionItem";

import TrashOptions from "./deckOptions";
import TrashOptionItem from "./deckOptionItem";

import LeaderOptions from "./deckOptions";
import LeaderOptionItem from "./deckOptionItem";

import { shuffle } from "../../../../../helpers";

function LeaderZone({ children }) {
  const trashElementRef = useRef();
  const trashOptionElementRef = useRef();

  const deckElementRef = useRef();
  const deckOptionElementRef = useRef();

  const leaderElementRef = useRef();
  const leaderOptionElementRef = useRef();

  const { states, actions } = useContext(Store.DuelContext);
  const [board] = states.boardOne;
  const [, setPreview] = states.preview;
  const [, setShowTrashModal] = states.showTrashModal;

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const onMouseOut = () => {
    setPreview(null);
  };

  return (
    <>
      <div className="field--card_area">
        <FieldCardFull
          ref={leaderElementRef}
          card={board.leader}
          onClick={() => actions.mergeActiveCard(board.leader, "leader")}
          onMouseOut={() => onMouseOut(board.leader)}
          onMouseOver={() => onMouseOver(board.leader)}
        />

        <div className="field--card_half"></div>

        <Deck
          ref={deckElementRef}
          count={board.deck.length}
          card={board.leader}
          onMouseOut={() => onMouseOut(board.leader)}
          onMouseOver={() => onMouseOver(board.leader)}
        />

        <div className="field--card_half"></div>

        <Trash
          ref={trashElementRef}
          count={board.trash.length}
          onMouseOut={() => onMouseOut(board.leader)}
          onMouseOver={() => onMouseOver(board.leader)}
          // onClick={actions.setActiveCard(card, "don")}
        />
      </div>
    </>
  );
}

export default memo(LeaderZone);
