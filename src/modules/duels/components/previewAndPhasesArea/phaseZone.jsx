import React, { useContext } from "react";
import Store from "../../provider/duelProvider";

function PhaseZone() {
  const { states } = useContext(Store.DuelContext);
  const [gameState] = states.gameState;

  const phases = [
    { short: "refresh", name: "Refresh Phase" },
    { short: "draw", name: "Draw Phase" },
    { short: "don", name: "DON!! Phase" },
    { short: "main", name: "Main Phase" },
    { short: "end", name: "End Phase" },
  ];

  const getClass = (phase, gameState) => {
    return phase.short === gameState.currentPhase ? "active--phase" : "";
  };

  return (
    <>
      <div className="previewAndPhaseZone--phases">
        {phases.map((phase, index) => (
          <button className={getClass(phase, gameState)} key={index}>
            {phase.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default PhaseZone;
