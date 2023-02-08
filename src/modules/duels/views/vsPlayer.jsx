import React, { useState } from "react";
import DuelZone from "../components/duelZone";
import PreviewAndPhaseZone from "../components/previewAndPhasesArea/previewAndPhaseZone";
import RockScisorPaper from "../components/rockScisorPaper";

const NewDuelZone = () => {
  return (
    <div className="field--duelMode">
      <PreviewAndPhaseZone />
      <div>
        <DuelZone />
      </div>
    </div>
  );
};

const views = {
  "duel": <NewDuelZone />,
  "rockScisorPaper": <RockScisorPaper />,
};

function vsPlayer() {
  const [view, setView] = useState("rockScisorPaper");

  return <>
    {views[view]}
  </>;
}

export default vsPlayer;
