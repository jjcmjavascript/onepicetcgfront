import { useState } from 'react';

const initialDeck = {
  name: '',
  id: '',
  cards: [],
};

const useDeck = (rules) => {
  const [deck, setDeck] = useState(initialDeck);

  const setInDeck = (card) => {
    if (rules.isAllowed(card, deck)) {
      deck.cards.push(card);
      setDeck({ ...deck });
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
    setDeck(initialDeck);
  };

  const setDeckFromBackend = (deck) => {
    const newDeck = { ...initialDeck };
    newDeck.name = deck.name;
    newDeck.id = deck.id;

    deck._cards.forEach((card) => {
      const quantity = card.pivot_decks_cards.quantity;
      for (let i = 0; i < quantity; i++) {
        newDeck.cards.push(card);
      }
    });

    console.log(newDeck)

    setDeck(newDeck);
  };

  return { deck, setDeck, setName, setInDeck, removeFromDeck, reset , setDeckFromBackend};
};

export default useDeck;
