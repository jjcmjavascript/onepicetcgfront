import React, { createContext, useState, useEffect } from "react";

import useHandCardBasicEffect from "../hooks/useHandCardBasicEffect";
import deckService from "../../decks/services/deckService";
import { DON, LEADER } from "../../../helpers/cardTypes";
import { shuffle, formatCardsForDeck } from "../../../helpers";
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
  };

  const hooks = {
    cardBasicEffects: useHandCardBasicEffect(),
    socket: useSocket("/duel"),
  };

  return (
    <DuelContext.Provider value={{ states, hooks }}>
      {children}
    </DuelContext.Provider>
  );
}

export default { DuelProvider, DuelContext };
