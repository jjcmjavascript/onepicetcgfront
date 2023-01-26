import React, { useContext } from "react";
import Store from "../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";
import Deck from "./deck";
import Trash from "./trash";
import DeckOptions from "./deckOptions";
import DeckOptionItem from "./deckOptionItem";
import { getUuid } from "../../../../helpers";

function LeaderZone({ children }) {
  const trashId = 'id_' + getUuid();
  const trashOptionsId = `id_${getUuid()}`;

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
    const optionsElement = document.querySelector(`#${trashOptionsId}`);
    optionsElement.classList.add("hide");
  };

  const toggleDeckOptions = (card) => {
    hideDeckOptions();
    const optionsElement = document.querySelector(`#${trashOptionsId}`);
    const trashElement = document.querySelector(`#${trashId}`);

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
      <DeckOptions id={trashOptionsId}>
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
          count={board.deck.length}
          card={board.leader}
          onMouseOut={() => onMouseOut(board.leader)}
          onMouseOver={() => onMouseOver(board.leader)}
        />

        <div className="field--card_half"></div>

        <Trash
          id={trashId}
          count={board.trash.length}
          onMouseOut={() => onMouseOut(board.leader)}
          onMouseOver={() => onMouseOver(board.leader)}
        />
      </div>
    </>
  );
}

export default LeaderZone;
