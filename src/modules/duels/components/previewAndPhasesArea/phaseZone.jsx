import React, { useContext } from "react";
import Store from "../../provider/duelProvider";

function PhaseZone() {
  const { states, hooks } = useContext(Store.DuelContext);
  const [preview, setPreview] = states.preview;

  return (
    <>
      <div className="previewAndPhaseZone--phases">
        <button>Refresh Phase</button>
        <button>Draw Phase</button>
        <button>DON!! Phase</button>
        <button>Main Phase</button>
        <button>End Phase</button>
      </div>
    </>
  );
}

export default PhaseZone;
