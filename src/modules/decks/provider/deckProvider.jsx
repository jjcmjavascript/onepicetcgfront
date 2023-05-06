import React, { createContext, useState } from "react";
import usePaginateCard from "../hooks/usePaginatedCards";
import useCreationDeck from "../hooks/useCreationDeck";
import useDecks from "../hooks/useDecks";
import useSelectFilters from "../hooks/useSelects";
import rules from "../../../helpers/deckRules";

const CardContext = createContext();

const CardProvider = ({ children }) => {
  const states = {
    filters: useState({ page: 1 }),
    activeCard: useState(null),
  };

  const hooks = {
    deck: useCreationDeck(rules),
    selects: useSelectFilters(),
    paginate: usePaginateCard({ filters: states.filters[0] }),
    decks: useDecks(),
  };

  return (
    <CardContext.Provider value={{ states, hooks }}>
      {children}
    </CardContext.Provider>
  );
};

export default { CardProvider, CardContext };
