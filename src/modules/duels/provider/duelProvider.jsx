import React, { createContext , useState } from "react";

const DuelContext = createContext();

function DuelProvider({ children }) {
  const states = {
    activeView : useState("deck"),
  };

  const hooks = {};

  return <DuelContext.Provider value={{states, hooks}}>{children}</DuelContext.Provider>;
}

export default { DuelProvider, DuelContext };
