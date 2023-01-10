import React, { createContext, useState } from "react";

import useHandCardBasicEffect  from "../hooks/useHandCardBasicEffect";

const DuelContext = createContext();

const getCostStateSchema = () => {
  return {
    active: true,
  };
};

const getBoardSchema = () => {
  return {
    leader: null,
    stage: null,
    characters: [],
    costs: [],
    trash: [],
    dons: 10,
    lives: 0,
  }
};

function DuelProvider({ children }) {
  const states = {
    activeView: useState("deck"),
    player1Board: useState(getBoardSchema()),
    player2Board: useState(getBoardSchema()),
  };

  const hooks = {
    cardBasicEffects: useHandCardBasicEffect(),
  };

  return (
    <DuelContext.Provider value={{ states, hooks }}>
      {children}
    </DuelContext.Provider>
  );
}

export default { DuelProvider, DuelContext };
