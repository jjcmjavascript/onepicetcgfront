import React, { useContext } from "react";
import Store from "../provider/duelProvider";

import DonCard from "./donCard";
import DonCardHalf from "./donCardHalf";
import DonOptions from "./donOptions";

function DonZone({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states;
  const [board, setBoard] = boardOne;

  const removeDons = () => {
    setBoard((currentBoard) => {
      if (currentBoard.dons <= 0) return currentBoard;
      return {
        ...currentBoard,
        costs: [...board.costs, { ...board.don }],
        dons: currentBoard.dons - 1,
      };
    });
  };

  return (
    <>
      <div className="field--card_area">
        <DonCard card={board.don} quantity={board.dons} onClick={removeDons} />
        <DonOptions />

        <div className="field--card_half"></div>

        {board.costs.map((card, index) => {
          return <DonCardHalf card={card} key={index} />;
        })}
      </div>
    </>
  );
}

export default DonZone;
