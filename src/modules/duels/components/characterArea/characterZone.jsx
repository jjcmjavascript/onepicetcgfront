import React, { useContext, useState, useRef } from "react";

import Store from "../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";
import CardOptionsCharacterArea from "./cardOptionsCharacterArea";
import CardOptionCharacterAreaItem from "./cardOptionCharacterAreaItem";

function CharactedZone({ children }) {
  const handOptionElementRef = useRef();
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states;

  const [boardOneState, setBoardOneState] = boardOne;
  const [, setPreview] = states.preview;
  const [activeCard, setActiveCard] = useState(null);

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

  const hideOptions = (card) => {
    const optionsElement = handOptionElementRef.current;
    optionsElement.classList.add("hideFull");
    setActiveCard(null);
  };

  const restCard = () => {
    const cardHtmlElement = document.querySelector(`#id_${activeCard.uuid}`);
    cardHtmlElement.classList.toggle("field--card_full_used");
  };

  const discardCard = () => {
    setBoardOneState((board)=>{
      return {
        ...board,
        trash: [...board.trash, activeCard],
        characters: board.characters.filter((card) => card.uuid != activeCard.uuid),
      }
    });

    hideOptions();
  }

  return (
    <>
      <div className="field--card_area">
        <CardOptionsCharacterArea ref={handOptionElementRef}>
          <CardOptionCharacterAreaItem>Atacar</CardOptionCharacterAreaItem>
          <CardOptionCharacterAreaItem onClick={restCard}>Rest</CardOptionCharacterAreaItem>
          <CardOptionCharacterAreaItem>Devolver</CardOptionCharacterAreaItem>
          <CardOptionCharacterAreaItem onClick={discardCard}>Descartar</CardOptionCharacterAreaItem>
          <CardOptionCharacterAreaItem>
            Colocar en Tope
          </CardOptionCharacterAreaItem>
          <CardOptionCharacterAreaItem>
            Colocar en Fondo
          </CardOptionCharacterAreaItem>
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

export default CharactedZone;
