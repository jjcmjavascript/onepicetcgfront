import React from "react";
import PreviewAndPhaseZone from "../components/previewAndPhasesArea/previewAndPhaseZone";
import Board from "./board";

function VsPlayer() {
  return (
    <div className="full-board bg-dark">
      <PreviewAndPhaseZone />
      <Board />
      <Board />
    </div>
  );
}

export default VsPlayer;
