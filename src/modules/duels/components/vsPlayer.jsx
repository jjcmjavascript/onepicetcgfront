import React from "react";
import PreviewAndPhaseZone from "../components/previewAndPhasesArea/previewAndPhaseZone";
import DuelMenu from "../components/duelMenu/duelMenu";
import Board from "../components/v1components/board";
import EnemyBoard from "../components/v1Enemycomponents/board";
import PhaseAlert from "../components/phaseAlert";

function VsPlayer() {
  return (
    <>
      <PhaseAlert />
      <div className="full-board bg-dark">
        <PreviewAndPhaseZone />
        <div>
          <EnemyBoard />
          <Board />
        </div>
        <DuelMenu />

      </div>
    </>
  );
}

export default VsPlayer;
