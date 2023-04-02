import React, { createContext, useState, useEffect } from "react";

import useHandCardBasicEffect from "../hooks/useHandCardBasicEffect";
import deckService from "../services/deckService";
import useSocket from "../../../hooks/useSocket";

import BoardGenerator from "../../../services/BoardGenerator";

const board = (new BoardGenerator({})).init();
const enemyBoard = (new BoardGenerator({})).init();
const DuelContext = createContext();

function DuelProvider({ children }) {
  const states = {
    activeView: useState("deck"),
    boardOne: useState(board),
    boardTwo: useState(enemyBoard),
    preview: useState(null),
    showTrashModal: useState(false),
    mode: useState("modeSelector"),
    decks: useState([]),
    selectedDeck: useState(""),
    gameState: useState({
      currentTurnPlayerId: 0,
      currentPhase: '',
      turnNumber: 1,
      rockPaperScissorWinner: null,
      selectionMode: {
        type: null,
        active: false,
      }
    }),
  };

  const hooks = {
    cardBasicEffects: useHandCardBasicEffect(),
    sockets: useSocket(),
  };

  useEffect(() => {
    deckService.getDecks().then((decks) => {
      states.decks[1](decks);
    });
  }, []);

  return (
    <DuelContext.Provider value={{ states, hooks }}>
      {children}
    </DuelContext.Provider>
  );
}
export default { DuelProvider, DuelContext };
