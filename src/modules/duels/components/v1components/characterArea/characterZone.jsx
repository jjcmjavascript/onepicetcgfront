import React, { useContext, useState, useRef, memo, useEffect } from "react";

import Store from "../../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";
import CardOptionsCharacterArea from "./cardOptionsCharacterArea";
import CardOptionCharacterAreaItem from "./cardOptionCharacterAreaItem";

function CharactedZone({ children }) {
  const handOptionElementRef = useRef();
  const { states, hooks, actions } = useContext(Store.DuelContext);
  const { boardOne } = states;

  const [boardOneState, setBoardOneState] = boardOne;
  const [, setPreview] = states.preview;
  const [game] = states.gameState;
  const [activeCard, setActiveCard] = useState(null);
  const [effectPile] = states.effectPile;
  const [closeMenus] = states.closeMenus;

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const onMouseOut = (card) => {
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
    console.log(optionsElement, optionsElement.classList);
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

  useEffect(() => {
    if (closeMenus) {
      hideOptions();
    }
  }, [closeMenus]);

  return (
    <>
      <div className="field--card_area">
        <CardOptionsCharacterArea ref={handOptionElementRef}>
          {effectPile.restriction === "character:all" ? (
            <>
              <CardOptionCharacterAreaItem
                onClick={() => actions.plusAttakFromDon(activeCard)}
              >
                Seleccionar
              </CardOptionCharacterAreaItem>
            </>
          ) : (
            <>
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
              <CardOptionCharacterAreaItem
                onClick={() => putCardOnDeck("bottom")}
              >
                Colocar en Fondo
              </CardOptionCharacterAreaItem>
              <CardOptionCharacterAreaItem onClick={hideOptions}>
                Cerrar
              </CardOptionCharacterAreaItem>
            </>
          )}
        </CardOptionsCharacterArea>

        {boardOneState.characters.map((card) => {
          return (
            <FieldCardFull
              id={`id_${card.uuid}`}
              key={card.uuid}
              card={card}
              onMouseOut={(_) => onMouseOut(card)}
              onMouseOver={(_) => onMouseOver(card)}
              onClick={() => toggleOptions(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default memo(CharactedZone);
