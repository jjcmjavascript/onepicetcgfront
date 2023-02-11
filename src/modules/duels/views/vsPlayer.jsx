import React, { useState } from "react";
import DuelZone from "../components/duelZone";
import PreviewAndPhaseZone from "../components/previewAndPhasesArea/previewAndPhaseZone";
import RockScissorPaper from "../components/rockScissorPaper";
import WatingArea from "../components/waitingArea";

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
  waitingArea: <WatingArea />,
};

function wrapper() {
  const [view, setView] = useState("waitingArea");

  return <>{views[view]}</>;
}

export default wrapper;
