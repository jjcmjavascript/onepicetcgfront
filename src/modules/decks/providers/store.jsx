import React, { createContext, useState } from "react";
import usePaginateCard from "../hooks/usePaginatedCards";
import useDecks from "../hooks/useDeck";
import useSelectFilters from "../hooks/useSelects";
import rules from "../services/deckRules";
import deckService from "../services/deckService";

const cardContext = createContext();

const cardProvider = ({ children }) => {
  const states = {
    filters: useState({ page: 1 }),
    activeCard: useState(null),
  };

  const hooks = {
    deck: useDecks(rules),
    selects: useSelectFilters(),
    paginate: usePaginateCard({ filters: states.filters[0] }),
  };

  const actions = {
    persistDeck: () => {
      const deck = hooks.deck.deck;

      if (!rules.isValidDeck(deck)) return;

      deckService.saveDeck(hooks.deck.deck);
    },
  };

  return (
    <cardContext.Provider value={{ states, hooks, actions }}>
      {children}
    </cardContext.Provider>
  );
};

export default { cardProvider, cardContext };
