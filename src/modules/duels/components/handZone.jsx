import React, { useContext, useState } from "react";

import Store from "../provider/duelProvider";
import FieldCardFull from "./fieldCardFull";
import CardOptions from "./cardOptions";

function HandZone({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const [hand] = states.hand;
  const [_, setPreview] = states.preview;
  const [activeCard, setActiveCard] = useState(null);

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

  return (
    <>
      <div className="field--card_area">
        <CardOptions />
        {hand.map((card) => {
          return (
            <FieldCardFull
              card={card}
              key={card.uuid}
              id={`id_${card.uuid}`}
              onClick={(event) => toggleOptions(card)}
              onMouseOver={() => onMouseOver(card)}
              onMouseOut={() => onMouseOut(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default HandZone;
