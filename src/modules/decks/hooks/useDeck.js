import { useState } from "react";

const useDeck = (rules) => {
  const [deck, setDeck] = useState({
    cards: [],
    leader: {},
    don: {},
  });

  const setInDeck = (card) => {
    if (rules.isAllowed(card, deck.cards)) {
      deck.cards.push(card);
      setDeck({ ...deck });
    }
  };

  const removeFromDeck = (index) => {
    deck.cards.splice(index, 1);
    setDeck({ ...deck });
  };

  return { deck, setDeck, setInDeck, removeFromDeck };
};

export default useDeck;
