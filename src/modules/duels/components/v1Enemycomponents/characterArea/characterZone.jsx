import { useContext, useState, useRef } from "react";

import Store from "../../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";
import CardOptionsCharacterArea from "./cardOptionsCharacterArea";
import CardOptionCharacterAreaItem from "./cardOptionCharacterAreaItem";

function CharactedZone( ) {
  const handOptionElementRef = useRef();
  const { states } = useContext(Store.DuelContext);
  const { boardTwo } = states;

  const [boardOneState, setBoardOneState] = boardTwo;
  const [, setPreview] = states.preview;
  const [activeCard, setActiveCard] = useState(null);

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const onMouseOut = () => {
    setPreview(null);
  };

  const toggleOptions = (card) => {
    const cardHtmlElement = document.querySelector(`#id_${card.uuid}`);
    const optionsElement = handOptionElementRef.current;

    if (!activeCard || activeCard != card) {
      setActiveCard(card);
      optionsElement.style.width = `${cardHtmlElement.clientWidth * 1.5}px`;
      optionsElement.style.left = `${cardHtmlElement.offsetLeft / 1.05}px`;
      optionsElement.style.top = `-50px`;
      optionsElement.classList.remove("hideFull");
    } else {
      hideOptions();
    }
  };

  const hideOptions = () => {
    const optionsElement = handOptionElementRef.current;
    optionsElement.classList.add("hideFull");
    setActiveCard(null);
  };

  const restCard = () => {
    const cardHtmlElement = document.querySelector(`#id_${activeCard.uuid}`);
    cardHtmlElement.classList.toggle("field--card_full_used");
  };

  const discardCard = () => {
    setBoardOneState((board) => {
      return {
        ...board,
        trash: [...board.trash, activeCard],
        characters: board.characters.filter(
          (card) => card.uuid != activeCard.uuid
        ),
      };
    });

    hideOptions();
  };

  const returnCard = () => {
    setBoardOneState((board) => {
      return {
        ...board,
        characters: board.characters.filter(
          (card) => card.uuid != activeCard.uuid
        ),
        hand: [...board.hand, activeCard],
      };
    });

    hideOptions();
  };

  const putCardOnDeck = (position = "top") => {
    const methods = {
      top: "unshift",
      bottom: "push",
    };

    const deck = [...boardOneState.deck];
    deck[methods[position]](activeCard);

    setBoardOneState((board) => {
      return {
        ...board,
        characters: board.characters.filter(
          (character) => character.uuid != activeCard.uuid
        ),
        deck: [...deck],
      };
    });

    hideOptions();
  };

  return (
    <>
      <div
        className="field--card_area rotated"
        style={{ justifyContent: "end" }}
      >
        <CardOptionsCharacterArea ref={handOptionElementRef}>
          <CardOptionCharacterAreaItem>Atacar</CardOptionCharacterAreaItem>
          <CardOptionCharacterAreaItem onClick={restCard}>
            Rest
          </CardOptionCharacterAreaItem>
          <CardOptionCharacterAreaItem onClick={returnCard}>
            Devolver
          </CardOptionCharacterAreaItem>
          <CardOptionCharacterAreaItem onClick={discardCard}>
            Descartar
          </CardOptionCharacterAreaItem>
          <CardOptionCharacterAreaItem onClick={() => putCardOnDeck("top")}>
            Colocar en Tope
          </CardOptionCharacterAreaItem>
          <CardOptionCharacterAreaItem onClick={() => putCardOnDeck("bottom")}>
            Colocar en Fondo
          </CardOptionCharacterAreaItem>
          <CardOptionCharacterAreaItem onClick={hideOptions}>
            Cerrar
          </CardOptionCharacterAreaItem>
        </CardOptionsCharacterArea>

        {boardOneState.characters.map((card) => {
          return (
            <FieldCardFull
              id={`id_${card.uuid}`}
              key={card.uuid}
              card={card}
              onMouseOut={() => onMouseOut(card)}
              onMouseOver={() => onMouseOver(card)}
              onClick={() => toggleOptions(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default CharactedZone;
