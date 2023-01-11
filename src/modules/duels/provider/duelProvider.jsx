import React, { createContext, useState, useEffect } from "react";

import useHandCardBasicEffect from "../hooks/useHandCardBasicEffect";

import deckService from "../../decks/services/deckService";

const DuelContext = createContext();

const getCostStateSchema = () => {
  return {
    active: true,
  };
};

const getBoardSchema = () => {
  return {
    leader: null,
    stage: null,
    characters: [],
    costs: [],
    trash: [],
    dons: 10,
    lives: 0,
  };
};

function DuelProvider({ children }) {
  const states = {
    activeView: useState("deck"),
    player1Board: useState(getBoardSchema()),
    player2Board: useState(getBoardSchema()),
    hand: useState([]),
    deck: useState({
      deck: [],
      id: "",
      name: "",
    }),
  };

  const hooks = {
    cardBasicEffects: useHandCardBasicEffect(),
  };

  useEffect(() => {
    deckService.getDecks().then((res) => {
      const deckCards = res.data[0]._cards;
      const [_, setDeck] = states.deck;
      const [hand, setHand] = states.hand;

      setDeck({
        deck: deckCards,
        id: res.data[0].id,
        name: res.data[0].name,
      });

      let slice = deckCards.slice(0, 5);
      slice = slice.map((card) => {
        card.uuid =
          card.code + card.id * Math.random().toString().substring(2, 5);

        return card;
      });

      setHand(slice);
    });
  }, []);

  return (
    <DuelContext.Provider value={{ states, hooks }}>
      {children}
    </DuelContext.Provider>
  );
}

export default { DuelProvider, DuelContext };
