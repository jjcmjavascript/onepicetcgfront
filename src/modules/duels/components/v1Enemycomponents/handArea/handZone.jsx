import React, { useContext, useState, useRef } from "react";

import Store from "../../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";
// import CardOptions from "./cardOptions";
// import CardOptionItem from "./cardOptionItem";

/**
 * 1 - When Options is open, the "card" is active
 */
function HandZone({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const [, setPreview] = states.preview;
  const [boardOneState, setBoardOneState] = states.boardTwo;

  const handOptionElementRef = useRef();
  const [activeCard, setActiveCard] = useState(null);

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const onMouseOut = (card) => {
    setPreview(null);
  };

  const hideOptions = () => {
    const optionsElement = handOptionElementRef.current;
    optionsElement.classList.add("hide");
    setActiveCard(null);
  };

  const toggleOptions = (card) => {
    hideOptions();
    const id = `id_${card.uuid}`;
    const cardHtmlElement = document.getElementById(id);
    const optionsElement = handOptionElementRef.current;

    if (!activeCard || activeCard != card) {
      setActiveCard(card);
      optionsElement.style.width = `${cardHtmlElement.clientWidth * 1.5}px`;
      optionsElement.style.left = `${cardHtmlElement.offsetLeft / 1.05}px`;
      optionsElement.style.top = `-50px`;
      optionsElement.classList.remove("hide");
    } else {
      optionsElement.style.width = `0px`;
      optionsElement.style.left = `0px`;
    }
  };

  const playCard = () => {
    setBoardOneState((prevState) => {
      return {
        ...prevState,
        characters: [...prevState.characters, activeCard],
      };
    });

    // setHand(hand.filter((card) => card.uuid != activeCard.uuid));

    hideOptions();
  };

  const revealCard = () => {
    hideOptions();

    const revealZoneElement = document.querySelector(".revealZone");
    revealZoneElement.classList.remove("hideFull");
    revealZoneElement.firstChild.src = activeCard._image_full.route;

    setPreview(activeCard);

    setTimeout(() => {
      revealZoneElement.classList.add("hideFull");
    }, 1500);
  };

  const discardCard = () => {
    hideOptions();

    setBoardOneState((prevState) => {
      return {
        ...prevState,
        trash: [...prevState.trash, activeCard],
      };
    });

    // setHand(hand.filter((card) => card.uuid != activeCard.uuid));
  };

  const putCardOnTopDeck = () => {
    hideOptions();

    setBoardOneState((prevState) => {
      return {
        ...prevState,
        deck: [activeCard, ...prevState.deck],
      };
    });

    // setHand(hand.filter((card) => card.uuid != activeCard.uuid));
  };

  const putCardOnBottomDeck = () => {
    hideOptions();

    setBoardOneState((prevState) => {
      return {
        ...prevState,
        deck: [...prevState.deck, activeCard],
      };
    });

    // setHand(hand.filter((card) => card.uuid != activeCard.uuid));
  };

  return (
    <>
      <div className="field--card_area__hand">
        {/* <CardOptions ref={handOptionElementRef}>
          <CardOptionItem onClick={playCard}>Jugar</CardOptionItem>
          <CardOptionItem onClick={revealCard}>Revelar</CardOptionItem>
          <CardOptionItem onClick={discardCard}>Descartar</CardOptionItem>
          <CardOptionItem onClick={putCardOnTopDeck}>
            Colocar en Tope
          </CardOptionItem>
          <CardOptionItem onClick={putCardOnBottomDeck}>
            Colocar en Fondo
          </CardOptionItem>
        </CardOptions> */}

        {boardOneState.hand.map((card) => {
          return (
            <FieldCardFull
              card={card}
              key={card.uuid}
              id={`id_${card.uuid}`}
              onClick={(_) => toggleOptions(card)}
              onMouseOver={(_) => onMouseOver(card)}
              onMouseOut={(_) => onMouseOut(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default HandZone;
