import React, { createContext, useState, useEffect } from "react";

import deckService from "../services/deckService";
import useSocket from "../../../hooks/useSocket";
import BoardGenerator from "../../../services/BoardGenerator";
import GameState from "../../../models/GameState";
import constants from "../services/constants";

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

  const { duelSocket, initDuelSocket, joinRoom, SOCKET_DUEL_URL } = hooks.sockets;

  useEffect(() => {
    deckService.getDecks().then((decks) => {
      states.decks[1](decks);
    });

    initDuelSocket();
  }, []);

  useEffect(() => {
    if (duelSocket) {
      duelSocket.emit(constants.GAME_FAKE_STATE_CREATE, {
        gameState,
        playerBoard: board,
      });

      duelSocket.on(constants.GAME_FAKE_STATE_CREATED, (payload) => {
        joinRoom(SOCKET_DUEL_URL, payload.room);
      });
    }
  }, [duelSocket]);

  return (
    <DuelContext.Provider value={{ states, hooks }}>
      {children}
    </DuelContext.Provider>
  );
}
export default { DuelProvider, DuelContext };
