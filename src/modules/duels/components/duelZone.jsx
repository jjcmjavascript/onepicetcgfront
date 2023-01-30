import React from "react";

import CharacterZone from "./characterArea/characterZone";
import DonZone from "./donArea/donZone";
import HandZone from "./handArea/handZone";
import LeaderZone from "./leaderArea/leaderZone";
import RevealCard from "./revealCard";
import TrashModal from "./trashModal/trashModal";

import "./css/test.css";

function DuelZone({ children, rotate}) {
  return (
    <>
      <div className={`field ${rotate ? 'rotated' : '' }`}>
        <RevealCard/>
        <TrashModal/>
        <CharacterZone />
        <DonZone />
        <LeaderZone />
        <HandZone />
      </div>
    </>
  );
}

export default DuelZone;
