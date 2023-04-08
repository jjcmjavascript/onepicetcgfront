import React, { useContext, useEffect, useState, memo } from "react";
import Store from "../../../provider/duelProvider";

import DonCard from "./donCard";
import DonCardHalf from "./donCardHalf";
import DonOptions from "./donOptions";
import DonOptionItem from "./donOptionItem";
import { effectRules } from "../../../../../helpers";
import constants from "../../../services/constants";

function DonZone({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { sockets: hookSocket } = hooks;
  const { boardOne, gameState, effects } = states;
  const [board, setBoard] = boardOne;
  const [activeCard, setActiveCard] = useState(null);
  const { duelSocket, duelRoom } = hookSocket;
  const [effectsObject, setEffectsObject] = effects;

  const putDonFromDeckToDonArea = () => {
    setBoard((currentBoard) => {
      if (currentBoard.dons.length <= 0) return currentBoard;
      const lastDon = currentBoard.dons[currentBoard.dons.length - 1];

      return {
        ...currentBoard,
        costs: [...board.costs, lastDon],
        dons: currentBoard.dons.filter((don) => don.uuid !== lastDon.uuid),
      };
    });
  };

  const hideOptions = () => {
    const optionsElement = document.querySelector(".don--options");
    optionsElement.classList.add("hide");
    setActiveCard(null);
  };

  const toggleOptions = (card) => {
    if (board.locked) return;

    hideOptions();

    const id = `id_${card.uuid}`;
    const cardHtmlElement = document.getElementById(id);
    const optionsElement = document.querySelector(".don--options");

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

  const devolverDon = () => {
    if (board.locked) return;

    setBoard((currentBoard) => {
      return {
        ...currentBoard,
        dons: [...currentBoard.dons, activeCard],
        costs: currentBoard.costs.filter((card) => card != activeCard),
      };
    });

    toggleDonStatus();
    hideOptions();
  };

  const toggleDonStatus = () => {
    if (board.locked) return;

    const id = `id_${activeCard.uuid}`;
    const cardHtmlElement = document.getElementById(id);

    cardHtmlElement.classList.toggle("don--card__used");

    setBoard((currentBoard) => {
      return {
        ...currentBoard,
        costs: currentBoard.costs.map((card) => {
          if (card.uuid === activeCard.uuid) {
            return {
              ...card,
              rested: !card.rested,
            };
          }
          return card;
        }),
      };
    });

    hideOptions();
  };

  const sumDonAttackToCard = () => {
    if (board.locked) return;
    console.log(constants.GAME_DON_PLUS, activeCard);

    duelSocket.emit(constants.GAME_DON_PLUS, {
      room: duelRoom,
      donUuid: activeCard.uuid,
    });

    activateCharacterSelector();
  };

  const activateCharacterSelector = () => {
    setEffectsObject({
      resolving: false,
      who: "donZone",
      pile: [
        {
          who: "donZone",
          effect: "selectOneCard",
        },
      ],
    });
  };

  const selectOneCard = async () => {
    setBoard((currentBoard) => {
      return {
        ...currentBoard,
        characters: currentBoard.characters.map((character) => {
          return {
            ...character,
            toSelect: true,
          };
        }),
      };
    });
  };

  useEffect(() => {
    if (effectsObject.who === "donZone") {
      const pileElement = effectsObject.pile[effectsObject.pile.length - 1];

      if (pileElement.effect == "selectOneCard" && !effectsObject.resolving) {
        setEffectsObject((state) => ({ ...state, resolving: true }));
        selectOneCard();
      }
    }
  }, [effectsObject.who, effectsObject.resolving]);

  return (
    <>
      <div className="field--card_area">
        <DonCard
          card={board.don}
          quantity={board.dons.length}
          onClick={putDonFromDeckToDonArea}
        />

        <DonOptions>
          <DonOptionItem onClick={devolverDon}>Devolver</DonOptionItem>
          <DonOptionItem onClick={toggleDonStatus}>Rest</DonOptionItem>
          {effectRules.canRestDon(activeCard) ? (
            <DonOptionItem onClick={sumDonAttackToCard}>+1000</DonOptionItem>
          ) : null}
        </DonOptions>

        <div className="field--card_half"></div>

        {board.costs.map((card, index) => {
          const id = `id_${card.uuid}`;

          return (
            <DonCardHalf
              card={card}
              key={id}
              onClick={() => toggleOptions(card)}
              id={id}
            />
          );
        })}
      </div>
    </>
  );
}

export default memo(DonZone);
