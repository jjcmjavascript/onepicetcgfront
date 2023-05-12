import { useContext, useRef } from "react";
import Store from "../../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";
import Deck from "./deck";
import Trash from "./trash";

import DeckOptions from "./deckOptions";
import DeckOptionItem from "./deckOptionItem";

import TrashOptions from "./deckOptions";
import TrashOptionItem from "./deckOptionItem";

import { shuffle } from "../../../../../helpers";

function LeaderZone() {
  const trashElementRef = useRef();
  const trashOptionElementRef = useRef();

  const deckElementRef = useRef();
  const deckOptionElementRef = useRef();

  const { states } = useContext(Store.DuelContext);
  const [board, setBoardOneState] = states.boardTwo;
  const [, setPreview] = states.preview;
  const [, setShowTrashModal] = states.showTrashModal;

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const onMouseOut = () => {
    setPreview(null);
  };

  const toggleDeckOptions = () => {
    const optionsElement = deckOptionElementRef.current;
    const deckElement = deckElementRef.current;

    if (optionsElement.classList.contains("hide")) {
      optionsElement.style.width = `${deckElement.clientWidth * 1.5}px`;
      optionsElement.style.left = `${deckElement.offsetLeft / 1.05}px`;
      optionsElement.classList.remove("hide");
    } else {
      optionsElement.style.width = `0px`;
      optionsElement.style.left = `0px`;
      optionsElement.classList.add("hide");
    }
  };

  const drawFromDeck = () => {
    const newCard = board.deck[0];

    setBoardOneState((current) => {
      return {
        ...current,
        deck: current.deck.filter((card) => card.uuid !== newCard.uuid),
      };
    });
  };

  const shuffleDeck = () => {
    setBoardOneState((current) => {
      return {
        ...current,
        deck: shuffle(current.deck),
      };
    });
  };

  const discardFromDeck = () => {
    const newCard = board.deck[0];

    setBoardOneState((current) => {
      return {
        ...current,
        deck: current.deck.filter((card) => card.uuid !== newCard.uuid),
        trash: [...current.trash, newCard],
      };
    });
  };

  const toggleTrashOptions = () => {
    const optionsElement = trashOptionElementRef.current;
    const trashElement = trashElementRef.current;

    if (optionsElement.classList.contains("hide")) {
      optionsElement.style.width = `${trashElement.clientWidth * 1.5}px`;
      optionsElement.style.left = `${trashElement.offsetLeft / 1.05}px`;
      optionsElement.classList.remove("hide");
    } else {
      optionsElement.style.width = `0px`;
      optionsElement.style.left = `0px`;
      optionsElement.classList.add("hide");
    }
  };

  const showTrash = () => {
    setShowTrashModal(true);
    toggleTrashOptions();
  };

  return (
    <>
      <div className="field--card_area">
        <DeckOptions ref={deckOptionElementRef}>
          <DeckOptionItem onClick={drawFromDeck}>Robar</DeckOptionItem>
          <DeckOptionItem onClick={shuffleDeck}>Barajar</DeckOptionItem>
          <DeckOptionItem onClick={discardFromDeck}>Descartar</DeckOptionItem>
        </DeckOptions>

        <TrashOptions ref={trashOptionElementRef}>
          <TrashOptionItem onClick={showTrash}>Mostrar</TrashOptionItem>
        </TrashOptions>

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
          onClick={toggleDeckOptions}
        />

        <div className="field--card_half rotated"></div>

        <Trash
          ref={trashElementRef}
          count={board.trash.length}
          onMouseOut={() => onMouseOut(board.leader)}
          onMouseOver={() => onMouseOver(board.leader)}
          onClick={toggleTrashOptions}
        />
      </div>
    </>
  );
}

export default LeaderZone;
