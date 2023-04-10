import React, { useContext, useState, useRef, memo, useEffect } from "react";

import Store from "../../../provider/duelProvider";
import FieldCardFull from "../fieldCardFull";
import CardOptionsCharacterArea from "./cardOptionsCharacterArea";
import CardOptionCharacterAreaItem from "./cardOptionCharacterAreaItem";

function CharactedZone() {
  const handOptionElementRef = useRef();
  const { states, hooks, actions, conditions } = useContext(Store.DuelContext);
  const { boardOne } = states;

  const [boardOneState, setBoardOneState] = boardOne;
  const [, setPreview] = states.preview;
  const [game] = states.gameState;
  const [activeCard, setActiveCard] = useState(null);
  const [effectPile] = states.effectPile;
  const [closeMenus] = states.closeMenus;

  const menuOptionItems = useRef([]);

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const onMouseOut = () => {
    setPreview(null);
  };

  const hideOptions = () => {
    const optionsElement = handOptionElementRef.current;
    optionsElement.classList.add("hideFull");
    setActiveCard(null);
  };

  const toggleOptions = (card) => {
    prepareMenuOptions(card);

    if (
      boardOneState.locked ||
      (closeMenus && !game.mode.includes("select:character"))
    )
      return;

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

  const prepareMenuOptions = (card) => {
    menuOptionItems.current = [];

    if (conditions.attack(card)) {
      menuOptionItems.current.push(
        <CardOptionCharacterAreaItem>Atacar</CardOptionCharacterAreaItem>
      );
    }

    if (conditions.characterSelect(card)) {
      menuOptionItems.current.push(
        <CardOptionCharacterAreaItem
          onClick={() => actions.plusAttakFromDon(card)}
        >
          Seleccionar
        </CardOptionCharacterAreaItem>
      );
    }
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
          <>
            {menuOptionItems.current.map((item, index) => (
              <span key={index}> {item}</span>
            ))}
            <CardOptionCharacterAreaItem onClick={hideOptions}>
              Cerrar
            </CardOptionCharacterAreaItem>
          </>
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
