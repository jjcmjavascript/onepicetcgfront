import React, { createContext, useState, useEffect } from "react";

import useHandCardBasicEffect from "../hooks/useHandCardBasicEffect";
import deckService from "../../decks/services/deckService";
import { DON, LEADER } from "../../../helpers/cardTypes";
import { shuffle, formatCardsForDeck } from "../../../helpers";

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
    lives: 0,
  };
};

function DuelProvider({ children }) {
  const states = {
    activeView: useState("deck"),
    boardOne: useState(getBoardSchema()),
    boardTwo: useState(getBoardSchema()),
    hand: useState([]),
    deck: useState([]),
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
    }),
  };

  const hooks = {
    cardBasicEffects: useHandCardBasicEffect(),
  };

  const separeDeck = (deck) => {
    const don = deck.find((card) => card.type_id === DON);
    const leader = deck.find((card) => card.type_id === LEADER);
    const dons = deck.filter((card) => card.type_id === DON);
    const characters = deck.filter(
      (card) => card.type_id !== DON && card.type_id !== LEADER
    );

    return {
      don,
      leader,
      characters,
      dons,
    };
  };

  useEffect(() => {
    deckService.findDeck(2).then((deck) => {
      if (deck) {
        const [, setDeck] = states.deck;
        const [, setHand] = states.hand;
        const [boardOne, setBoardOne] = states.boardOne;

        const deckCards = formatCardsForDeck(deck)._cards;
        const separatedCards = separeDeck(deckCards);
        const suffledDeck = shuffle(separatedCards.characters);
        const newHand = suffledDeck.splice(0, 5);

        setDeck(suffledDeck);
        setHand(newHand);
        setBoardOne({
          ...boardOne,
          don: separatedCards.don,
          leader: separatedCards.leader,
          dons: separatedCards.dons,
        });
      }
    });
  }, []);

  return (
    <DuelContext.Provider value={{ states, hooks }}>
      {children}
    </DuelContext.Provider>
  );
}

export default { DuelProvider, DuelContext };
