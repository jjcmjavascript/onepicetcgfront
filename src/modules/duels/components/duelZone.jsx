import React from "react";

import CharacterZone from "./characterArea/characterZone";
import DonZone from "./donArea/donZone";
import HandZone from "./handArea/handZone";
import LeaderZone from "./leaderArea/leaderZone";
import RevealCard from "./revealCard";
import TrashModal from "./trashModal";

import "./css/test.css";

function DuelZone({ children }) {
  return (
    <>
      <div className="field">
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
