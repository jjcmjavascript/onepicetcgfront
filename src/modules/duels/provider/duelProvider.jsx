import React, { createContext, useState, useEffect } from "react";

import useHandCardBasicEffect from "../hooks/useHandCardBasicEffect";
import deckService from "../services/deckService";
import useSocket from "../../../hooks/useSocket";
import duelTestProvide from "./duelTestProvide";

const testMode = process.env.REACT_APP_TEST_BOARD;

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
    hand: [],
  };
};

function DuelProvider({ children }) {
  const states = {
    activeView: useState("deck"),
    boardOne: useState(getBoardSchema()),
    boardTwo: useState(getBoardSchema()),
    preview: useState(null),
    showTrashModal: useState(false),
    mode: useState("modeSelector"),
    decks: useState([]),
    selectedDeck: useState(""),
    gameState: useState({
      currentTurnPlayerId: 0,
      currentPhase: "",
      turnNumber: 1,
      rockPaperScissorWinner: null,
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

export default testMode ? duelTestProvide : { DuelProvider, DuelContext };
