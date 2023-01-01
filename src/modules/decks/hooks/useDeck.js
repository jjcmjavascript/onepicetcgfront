import { useState } from 'react';

const useDeck = (rules) => {
  const [deck, setDeck] = useState({
    name: '',
    cards: [],
  });

  const setInDeck = (card) => {
    if (rules.isAllowed(card, deck)) {
      deck.cards.push(card);
      setDeck({...deck });
    }
  };

  const removeFromDeck = (index) => {
    setDeck({
      ...deck,
      cards: deck.cards.filter((card, i) => i !== index),
    });
  };

  const setName = (name) => {
    setDeck({ ...deck, name });
  };

  const reset = () => {
    setDeck({
      name: '',
      cards: [],
    });
  };

  return { deck, setDeck, setName, setInDeck, removeFromDeck, reset };
};

export default useDeck;
