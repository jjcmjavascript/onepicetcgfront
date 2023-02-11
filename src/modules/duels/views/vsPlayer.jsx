import React, { useState } from "react";
import DuelZone from "../components/duelZone";
import PreviewAndPhaseZone from "../components/previewAndPhasesArea/previewAndPhaseZone";
import RockScissorPaper from "../components/rockScissorPaper";

const VsPlayer = () => {
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
  duel: <VsPlayer />,
  rockScissorPaper: <RockScissorPaper />,
};

function wrapper() {
  const [view, setView] = useState("rockScissorPaper");

  return <>{views[view]}</>;
}

export default wrapper;
