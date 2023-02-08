import React from "react";
import Store from "../provider/duelProvider";
import DuelZone from "../components/duelZone";
import PreviewAndPhaseZone from "../components/previewAndPhasesArea/previewAndPhaseZone";

const DuelMode = () => {
  return (
    <Store.DuelProvider>
      <div className="field--duelMode">
        <PreviewAndPhaseZone />
        <div>
          <DuelZone />
        </div>
      </div>
    </Store.DuelProvider>
  );
};

export default DuelMode;
