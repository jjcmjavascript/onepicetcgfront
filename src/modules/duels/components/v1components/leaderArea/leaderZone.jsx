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

  const { states, hooks } = useContext(Store.DuelContext);
  const [board, setBoardOneState] = states.boardOne;
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

    // setHand([...hand, newCard]);
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

  const toggleLeaderOptions = () => {
    const optionsElement = leaderOptionElementRef.current;
    const leaderElement = leaderElementRef.current;

    if (optionsElement.classList.contains("hide")) {
      optionsElement.style.width = `${leaderElement.clientWidth * 1.5}px`;
      optionsElement.style.left = `${leaderElement.offsetLeft / 1.05}px`;
      optionsElement.classList.remove("hide");
    } else {
      optionsElement.style.width = `0px`;
      optionsElement.style.left = `0px`;
      optionsElement.classList.add("hide");
    }
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

        <LeaderOptions ref={leaderOptionElementRef}>
          <LeaderOptionItem>Atacar</LeaderOptionItem>
          <LeaderOptionItem>Activar</LeaderOptionItem>
        </LeaderOptions>

        <FieldCardFull
          ref={leaderElementRef}
          card={board.leader}
          onClick={toggleLeaderOptions}
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

        <div className="field--card_half"></div>

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

export default memo(LeaderZone);
