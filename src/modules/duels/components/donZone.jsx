import React, { useContext, useState } from "react";
import Store from "../provider/duelProvider";

import DonCard from "./donCard";
import DonCardHalf from "./donCardHalf";
import DonOptions from "./donOptions";

function DonZone({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states;
  const [board, setBoard] = boardOne;
  const [activeCard, setActiveCard] = useState(null);

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
    const id = `id_${activeCard.uuid}`;
    const cardHtmlElement = document.getElementById(id);

    cardHtmlElement.classList.toggle("don--card__used");
    hideOptions();
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
          <div className="don--options__item" onClick={devolverDon}>
            Devolver
          </div>
          <div className="don--options__item" onClick={toggleDonStatus}>
            Usar
          </div>
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
