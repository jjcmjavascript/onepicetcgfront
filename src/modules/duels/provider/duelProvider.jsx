import React, { createContext, useState, useEffect } from "react";

import useHandCardBasicEffect from "../hooks/useHandCardBasicEffect";
import deckService from "../services/deckService";
import useSocket from "../../../hooks/useSocket";

const DuelContext = createContext();

const getBoardSchema = () => {
  return {
    leader: null,
    don: null,
    stage: null,
    characters: [],
    costs: [],
    trash: [],
    dons: [],
    lives: [],
    deck: [],
  };
};

function DuelProvider({ children }) {
  const states = {
    activeView: useState("deck"),
    boardOne: useState(getBoardSchema()),
    boardTwo: useState(getBoardSchema()),
    hand: useState([]),
    preview: useState(null),
    showTrashModal: useState(false),
    mode: useState("modeSelector"),
    decks : useState([]),
    selectedDeck: useState(null),
  };

  const hooks = {
    cardBasicEffects: useHandCardBasicEffect(),
    socket: useSocket("/duel"),
  };

  useEffect(()=>{
    deckService.getDecks().then((response)=>{
      states.decks[1](response.data);
    });
  });

  return (
    <DuelContext.Provider value={{ states, hooks }}>
      {children}
    </DuelContext.Provider>
  );
}

export default { DuelProvider, DuelContext };
