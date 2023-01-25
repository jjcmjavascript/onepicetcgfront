import React, { useContext, useState } from "react";

import Store from "../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";
import CardOptions from "../handArea/cardOptions";
import CardOptionItem from "../handArea/cardOptionItem";

/**
 * 1 - When Options is open, the "card" is active
 */
function HandZone({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const [hand, setHand] = states.hand;
  const [, setPreview] = states.preview;
  const [activeCard, setActiveCard] = useState(null);
  const [boardOneState, setBoardOneState] = states.boardOne;

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const onMouseOut = (card) => {
    setPreview(null);
  };

  const hideOptions = () => {
    const optionsElement = document.querySelector(".hand--options");
    optionsElement.classList.add("hide");
    setActiveCard(null);
  };

  const toggleOptions = (card) => {
    hideOptions();
    const id = `id_${card.uuid}`;
    const cardHtmlElement = document.getElementById(id);
    const optionsElement = document.querySelector(".hand--options");

    if (!activeCard || activeCard != card) {
      setActiveCard(card);
      optionsElement.style.width = `${cardHtmlElement.clientWidth * 1.5}px`;
      optionsElement.style.left = `${cardHtmlElement.offsetLeft / 1.05}px`;
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

    setHand(hand.filter((card) => card.uuid != activeCard.uuid));

    hideOptions();
  }

  const revealCard = () => {
    hideOptions();

    const revealZoneElement = document.querySelector(".revealZone");
    revealZoneElement.classList.remove("hideFull");
    revealZoneElement.firstChild.src = activeCard._image_full.route;

    setPreview(activeCard);

    setTimeout(() => {
      revealZoneElement.classList.add("hideFull");
    }, 1500);
  }

  return (
    <>
      <div className="field--card_area">
        <CardOptions>
          <CardOptionItem onClick={playCard}>Jugar</CardOptionItem>
          <CardOptionItem onClick={revealCard}>Revelar</CardOptionItem>
          <CardOptionItem>Descartar</CardOptionItem>
        </CardOptions>

        {hand.map((card) => {
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
