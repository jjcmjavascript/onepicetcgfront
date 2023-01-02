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
    persistDeck: () => {
      const deck = hooks.deck.deck;

      if (!rules.isValidDeck(deck)) {
        return globalActions.swalError(
          "Invalid Deck",
          [
            "Debes tener 50 cartas en el deck",
            "Debes tener 1 DON",
            "Debes tener 1 Leader",
            "Debe Ingresar un nombre al deck",
          ].join("<br />")
        );
      }

      const cards = deck.cards.map((item) => item.id);
      const name = deck.name;

      deckService
        .saveDeck({
          cards,
          name,
        })
        .then((res) => {
          globalActions.swalSuccess("Success", "Deck almacenado con exíto");
          hooks.deck.reset();
        })
        .catch((err) => {
          globalActions.swalError("Error", err.message);
        });
    },
  };

  return (
    <CardContext.Provider value={{ states, hooks, actions }}>
      {children}
    </CardContext.Provider>
  );
};

export default { CardProvider, CardContext };
