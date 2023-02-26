import React from "react";
import PreviewAndPhaseZone from "../components/previewAndPhasesArea/previewAndPhaseZone";
import Board from "../components/v1components/board";
import BoardV2 from "../components/v2Components/board";

function VsPlayer() {
  return (
    <div className="full-board bg-dark">
      <PreviewAndPhaseZone />
      <div>
        <Board />
      </div>
    </div>
  );
}

export default VsPlayer;
