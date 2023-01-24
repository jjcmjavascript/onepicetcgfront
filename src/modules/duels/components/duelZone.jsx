import React from "react";

import CharacterZone from "./characterZone";
import DonZone from "./donZone";
import HandZone from "./handZone";
import LeaderZone from "./leaderZone";

import "./css/test.css";

function DuelZone({ children }) {
  return (
    <>
      <div className="field">
        <CharacterZone />
        <DonZone />
        <LeaderZone />
        <HandZone />
      </div>
    </>
  );
}

export default DuelZone;
