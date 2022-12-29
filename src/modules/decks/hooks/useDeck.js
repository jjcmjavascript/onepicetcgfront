import { useState } from 'react';

const useDeck = (rules) => {
  const [deck, setDeck] = useState([]);

  const setInDeck = (card) => {
    if (rules.isAllowed(card, deck)) {
      setDeck([...deck, card]);
    }
  };

  const removeFromDeck = (index) => {
    setDeck(deck.filter((card, i) => i !== index));
  };

  return { deck, setDeck, setInDeck, removeFromDeck };
};

export default useDeck;
