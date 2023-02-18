import React from "react";
import PreviewAndPhaseZone from "../components/previewAndPhasesArea/previewAndPhaseZone";
import Board from "./board";
import RivalBoard from "./rivalBoard";

function VsPlayer() {
  return (
    <div className="full-board bg-dark">
      <PreviewAndPhaseZone />
      <div>
        <RivalBoard/>
        <Board />
      </div>
    </div>
  );
}

export default VsPlayer;
