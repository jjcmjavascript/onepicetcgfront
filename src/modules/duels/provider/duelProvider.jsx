import React, { createContext, useState, useEffect } from "react";

import deckService from "../services/deckService";
import useSocket from "../../../hooks/useSocket";
import duelTestProvide from "./duelTestProvide";
import GameState from "../../../models/GameState";
import Player from "../../../models/Player";

const testMode = process.env.REACT_APP_TEST_BOARD;
const gameState = GameState.getDefault();

const board = new Player({});
const enemyBoard = new Player({});

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

export default testMode ? duelTestProvide : { DuelProvider, DuelContext };
