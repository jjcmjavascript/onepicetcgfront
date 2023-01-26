import React, { useContext, useRef } from "react";
import Store from "../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";
import Deck from "./deck";
import Trash from "./trash";
import DeckOptions from "./deckOptions";
import DeckOptionItem from "./deckOptionItem";

function LeaderZone({ children }) {
  const trashElementRef = useRef();
  const trashOptionElementRef = useRef();
  const deckElementRef = useRef();
  const deckOptionElementRef = useRef();

  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states;
  const [board, setBoardOneState] = boardOne;
  const [, setPreview] = states.preview;

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const onMouseOut = (card) => {
    setPreview(null);
  };

  const hideDeckOptions = () => {
    const optionsElement = deckOptionElementRef.current;
    optionsElement.classList.add("hide");
  };

  const toggleDeckOptions = () => {
    hideDeckOptions();
    const optionsElement = deckOptionElementRef.current;
    const trashElement = deckElementRef.current;

    if (optionsElement.classList.contains("hide")) {
      optionsElement.style.width = `${trashElement.clientWidth * 1.5}px`;
      optionsElement.style.left = `${trashElement.offsetLeft / 1.05}px`;
      optionsElement.classList.remove("hide");
    } else {
      optionsElement.style.width = `0px`;
      optionsElement.style.left = `0px`;
    }
  };

  return (
    <>
      <DeckOptions ref={deckOptionElementRef}>
        <DeckOptionItem onClick={() => console.log("test")}> </DeckOptionItem>
      </DeckOptions>

      <div className="field--card_area">
        <FieldCardFull
          card={board.leader}
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
          onClick={() => toggleDeckOptions}
        />

        <div className="field--card_half"></div>

        <Trash
          ref={trashElementRef}
          count={board.trash.length}
          onMouseOut={() => onMouseOut(board.leader)}
          onMouseOver={() => onMouseOver(board.leader)}
        />
      </div>
    </>
  );
}

export default LeaderZone;
