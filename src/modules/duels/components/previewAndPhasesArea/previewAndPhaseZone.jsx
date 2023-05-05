import React from "react";
import CardPreview from "./cardPreview";
import PhaseZone from "./phaseZone";

function PreviewAndPhaseZone() {
  return (
    <>
      <div className="previewAndPhaseZone">
        <CardPreview />
        <PhaseZone />
      </div>
    </>
  );
}

export default PreviewAndPhaseZone;
