import React, { createContext, useState } from "react";
import usePaginateCard from "../hooks/usePaginatedCards";
import useDecks from "../hooks/useDeck";
import rules from "../services/deckRules";

const cardContext = createContext();

const cardProvider = ({ children }) => {
  const useFilters = useState({ page: 1 });
  const useDeck = useDecks(rules);
  const usePaginate = usePaginateCard({ filters: useFilters[0] });
  const useActiveCard = useState(null);

  return (
    <cardContext.Provider
      value={{ usePaginate, useFilters, useDeck, useActiveCard }}
    >
      {children}
    </cardContext.Provider>
  );
};

export default { cardProvider, cardContext };
