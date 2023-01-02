import React, { createContext, useState, useContext } from "react";
import usePaginateCard from "../hooks/usePaginatedCards";
import useCreationDeck from "../hooks/useCreationDeck";
import useDecks from "../hooks/useDecks";
import useSelectFilters from "../hooks/useSelects";
import rules from "../../../helpers/deckRules";
import deckService from "../services/deckService";

import { GlobalContext } from "../../../providers/global";

const CardContext = createContext();

const CardProvider = ({ children }) => {
  const { actions: globalActions } = useContext(GlobalContext);

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

  const actions = {

  };

  return (
    <CardContext.Provider value={{ states, hooks, actions }}>
      {children}
    </CardContext.Provider>
  );
};

export default { CardProvider, CardContext };
