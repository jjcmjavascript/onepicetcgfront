import React, { useContext } from "react";

import CharacterZone from "./characterArea/characterZone";
import DonZone from "./donArea/donZone";
import HandZone from "./handArea/handZone";
import LeaderZone from "./leaderArea/leaderZone";
import RevealCard from "./revealCard";
import TrashModal from "./trashModal/trashModal";
import LifeCardHalf from "./LifeCardHalf";
import Store from "../provider/duelProvider";

import "./css/test.css";

function DuelZone({ children, rotate }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne } = states;
  const [board] = boardOne;

  console.log(board)
  return (
    <>
      <div className={`field ${rotate ? "rotated" : ""}`}>
        <div>
          <RevealCard />
          <TrashModal />
          <CharacterZone />
          <DonZone />
          <LeaderZone />
          <HandZone />
        </div>

        <div className="lives">
          <span className="rotate270">Vidas</span>
          {board.lives.map((live) => {
            return <LifeCardHalf card={live} />;
          })}
        </div>
      </div>
    </>
  );
}

export default DuelZone;
