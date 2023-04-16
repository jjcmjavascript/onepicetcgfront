import React, { createContext, useState, useEffect } from "react";

import duelTestProvide from "./duelTestProvide";

import * as effectRules from "../../../services/effectRules";
import constants from "../services/constants";
import deckService from "../services/deckService";

import useSocket from "../../../hooks/useSocket";

import GameState from "../../../models/GameState";
import Player from "../../../models/Player";
import ActiveCard from "../../../models/ActiveCard";

const testMode = process.env.REACT_APP_TEST_BOARD;
const State = GameState.getDefault();
const Board = Player.getDefault();
const EnemyBoard = Player.getDefault();
const ActiveCardSchema = ActiveCard.getDefault();

const DuelContext = createContext();

function DuelProvider({ children }) {
  const boardOne = useState(Board);
  const boardTwo = useState(EnemyBoard);
  const gameState = useState(State);
  const activeCard = useState(ActiveCardSchema);

  const [game, setGameState] = gameState;
  const [board, setBoard] = boardOne;
  const [activeCards, setActiveCards] = activeCard;

  const states = {
    boardOne,
    boardTwo,
    gameState,
    activeCards: activeCard,
    preview: useState(null),
    showTrashModal: useState(false),
    decks: useState([]),
    selectedDeck: useState(""),
  };

  const hooks = {
    sockets: useSocket(),
  };

  useEffect(() => {
    deckService.getDecks().then((decks) => {
      states.decks[1](decks);
    });
  }, []);

  return <DuelContext.Provider value={{}}>{children}</DuelContext.Provider>;
}

export default testMode === "true"
  ? duelTestProvide
  : { DuelProvider, DuelContext };
