import React, { useState, useEffect } from 'react';
import deckService from '../services/deckService';

export default function useDecks() {
  const [decks, setDecks] = useState([]);
  const [filteredDeck, setFilteredDeck] = useState([]);

  useEffect(() => {
    deckService.getDecks().then((res) => {
      setDecks(res.data);
      setFilteredDeck(res.data);
    });
  }, []);

  const deleteDeck = (deckId) => {
    deckService.deleteDeck(deckId).then((res) => {
      setDecks(decks.filter((deck) => deck._id !== deckId));
    });
  };

  const filterByName = (name) => {
    const filteredDecks = decks.filter((deck) => {
      return deck.name.toLowerCase().includes(name.toLowerCase());
    });
    setFilteredDeck(filteredDecks);
  };

  return {
    decks,
    filteredDeck,
    deleteDeck,
    filterByName,
  };
}
