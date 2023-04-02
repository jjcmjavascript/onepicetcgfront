import React, { useContext, useState } from "react";
import Store from "../../../provider/duelProvider";

import DonCard from "./donCard";
import DonCardHalf from "./donCardHalf";
import DonOptions from "./donOptions";
import DonOptionItem from "./donOptionItem";

function DonZone({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne, gameState } = states;
  const [board, setBoard] = boardOne;
  const [activeCard, setActiveCard] = useState(null);
  const [game, setGame] = gameState;
  const block = game.selectionMode.active;

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
    if (block) return;

    hideOptions();
    const id = `id_${card.uuid}`;
    const cardHtmlElement = document.getElementById(id);
    const optionsElement = document.querySelector(".don--options");

    if (!activeCard || activeCard != card) {
      console.log(card);
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
    if (block) return;

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
    if (block) return;

    const id = `id_${activeCard.uuid}`;
    const cardHtmlElement = document.getElementById(id);

    cardHtmlElement.classList.toggle("don--card__used");
    hideOptions();
  };

  const plusToCard = () => {
    setGame((currentGame) => {
      return {
        ...currentGame,
        selectionMode: {
          active: true,
          type: "don",
        },
      };
    });

    const id = `id_${activeCard.uuid}`;
  };

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
          {activeCard && !activeCard.rested ? (
            <DonOptionItem onClick={plusToCard}>+1000</DonOptionItem>
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

export default DonZone;
