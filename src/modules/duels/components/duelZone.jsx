import React, { useContext, useEffect, useState } from "react";

import Store from "../provider/duelProvider";

import CharacterZone from "./characterZone";
import DonZone from "./donZone";
import HandZone from "./handZone";
import LeaderZone from "./leaderZone";

import "./css/test.css";

function DuelZone({ children }) {
  const { state, hooks } = useContext(Store.DuelContext);

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
