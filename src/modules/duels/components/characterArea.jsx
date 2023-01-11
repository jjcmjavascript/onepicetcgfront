import React, { useContext } from "react";

import Store from "../provider/duelProvider";

import "./css/characterArea.css";

function CharactedArea({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const [board, setBoard] = states.player1Board;

  const chracterAreas = Object.values(board.characters);
  return (
    <>
      <div className="character--area">
        {chracterAreas.map((card) => {
          return (
            <div className="character--area__card" key={card.card.uuid}>
              <img src={card.card._image.route} className="played_card" />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CharactedArea;
