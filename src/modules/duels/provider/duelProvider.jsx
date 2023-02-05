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
  };

  const separeDeck = (deck) => {
    const don = deck.find((card) => card.type_id === DON);
    const leader = deck.find((card) => card.type_id === LEADER);
    const dons = deck.filter((card) => card.type_id === DON);
    const cards = deck.filter(
      (card) => card.type_id !== DON && card.type_id !== LEADER
    );

    return {
      don,
      leader,
      cards,
      dons,
    };
  };

  useEffect(() => {
    deckService.findDeck(2).then((deck) => {
      if (deck) {
        const [, setHand] = states.hand;
        const [boardOne, setBoardOne] = states.boardOne;

        const deckCards = formatCardsForDeck(deck)._cards;
        const separatedCards = separeDeck(deckCards);
        const suffledDeck = shuffle(separatedCards.cards);
        const newHand = suffledDeck.splice(0, 5);
        const lives = suffledDeck.splice(0, separatedCards.leader.lives);

        setHand(newHand);
        setBoardOne({
          ...boardOne,
          deck: suffledDeck,
          don: separatedCards.don,
          leader: separatedCards.leader,
          dons: separatedCards.dons,
          lives,
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
