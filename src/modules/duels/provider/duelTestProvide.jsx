import React, { createContext, useState, useEffect } from "react";

import deckService from "../services/deckService";
import useSocket from "../../../hooks/useSocket";
import BoardGenerator from "../../../services/BoardGenerator";
import GameState from "../../../models/GameState";

const board = new BoardGenerator({}).init();
const enemyBoard = new BoardGenerator({}).init();
const gameState = GameState.getDefault();

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
    gameState: useState(gameState),
  };

  const hooks = {
    sockets: useSocket(),
  };

  const actions = {
    setGameBlock(state) {
      const [, setGameState] = states.gameState;
      setGameState((currentGameState) => {
        return {
          ...currentGameState,
          block: state,
        };
      });
    },
  };

  useEffect(() => {
    deckService.getDecks().then((decks) => {
      states.decks[1](decks);
    });
  }, []);

  return (
    <DuelContext.Provider value={{ states, hooks, actions }}>
      {children}
    </DuelContext.Provider>
  );
}
export default { DuelProvider, DuelContext };
