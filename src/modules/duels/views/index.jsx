import React from "react";
import Store from "../provider/duelProvider";
import DuelZone from "../components/duelZone";

const DuelMode = () => {
  return (
    <Store.DuelProvider>
      <DuelZone />
    </Store.DuelProvider>
  );
};

export default DuelMode;
