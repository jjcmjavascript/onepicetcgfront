import React, { createContext, useState } from "react";
import usePaginateCard from "../hooks/usePaginatedCards";
import useDecks from "../hooks/useDeck";
import rules from "../services/deckRules";

const cardContext = createContext();

const cardProvider = ({ children }) => {
  const filterState = useState({ page: 1 });
  const deckState = useDecks(rules);
  const paginateState = usePaginateCard({ filters: filterState[0] });
  const activeCardState = useState(null);

  return (
    <cardContext.Provider
      value={{ filterState, deckState, paginateState, activeCardState }}
    >
      {children}
    </cardContext.Provider>
  );
};

export default { cardProvider, cardContext };
